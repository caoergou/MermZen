import { state, HAND_FONTS } from './store';
import { getExportBgColor } from './ui/theme';

// ── SVG 字体内联逻辑 ───────────────────────────────────────────────
const fontDataCache = {};

// ── 小赖字体 (Xiaolai SC) 子集嵌入 ────────────────────────────
const XIAOLAI_CSS_URLS = [
  'https://cdn.jsdelivr.net/npm/@chinese-fonts/xiaolai@3.0.0/dist/Xiaolai/result.css',
  'https://unpkg.com/@chinese-fonts/xiaolai@3.0.0/dist/Xiaolai/result.css',
];
let _xiaolaiRules = null;

/**
 * 获取小赖字体的 CSS 规则（支持多 CDN 回退）
 */
async function fetchXiaolaiRules() {
  if (_xiaolaiRules !== null) return _xiaolaiRules;

  for (const cssUrl of XIAOLAI_CSS_URLS) {
    try {
      const resp = await fetch(cssUrl, { cache: 'force-cache' });
      if (!resp.ok) continue;
      const css = await resp.text();
      const rules = [];
      const re = /@font-face\s*\{([^}]+)\}/g;
      let m;
      while ((m = re.exec(css)) !== null) {
        const block = m[1];
        const srcM = block.match(/src:[^;]*url\(['"]?([^'")\s]+)['"]?\)/i);
        const ucrM = block.match(/unicode-range:\s*([^;]+)/i);
        if (srcM && ucrM) {
          // 使用成功的 CDN URL 作为基准解析相对路径
          const absUrl = new URL(srcM[1], cssUrl).href;
          rules.push({ url: absUrl, unicodeRange: ucrM[1].trim() });
        }
      }
      _xiaolaiRules = rules;
      return rules;
    } catch (e) {
      continue;
    }
  }

  // 所有 CDN 都失败，不缓存失败结果，允许下次重试
  return [];
}

/**
 * 检查字符是否在 Unicode 范围内
 */
function codePointInUnicodeRange(cp, rangeStr) {
  for (const part of rangeStr.split(',')) {
    const r = part.trim();
    if (!/^[Uu]\+/.test(r)) continue;
    const hex = r.slice(2);
    if (hex.includes('-')) {
      const [lo, hi] = hex.split('-').map(h => parseInt(h, 16));
      if (cp >= lo && cp <= hi) return true;
    } else if (hex.includes('?')) {
      const lo = parseInt(hex.replace(/\?/g, '0'), 16);
      const hi = parseInt(hex.replace(/\?/g, 'F'), 16);
      if (cp >= lo && cp <= hi) return true;
    } else {
      if (cp === parseInt(hex, 16)) return true;
    }
  }
  return false;
}

/**
 * 为 SVG 构建所需的小赖字体 CSS
 */
async function buildXiaolaiCssForSvg(svgEl) {
  // 提取 SVG 中的所有文本以查找所需的字符
  const textContent = Array.from(svgEl.querySelectorAll('text, tspan, foreignObject'))
    .map(el => (el as SVGElement | HTMLElement).textContent ?? '').join('');

  // 收集需要中文字体的非 ASCII 码点
  const neededCps = new Set();
  for (const ch of textContent) {
    const cp = ch.codePointAt(0);
    if (cp > 127) neededCps.add(cp);
  }
  if (!neededCps.size) return '';

  const rules = await fetchXiaolaiRules();
  if (!rules.length) return '';

  // 查找覆盖所需字符的字体块
  const neededRules = [];
  for (const rule of rules) {
    for (const cp of neededCps) {
      if (codePointInUnicodeRange(cp, rule.unicodeRange)) {
        neededRules.push(rule);
        break;
      }
    }
  }
  if (!neededRules.length) return '';

  // 获取并嵌入所需的字体块（带有 unicode-range，以便浏览器正确使用它们）
  let css = '';
  for (const { url, unicodeRange } of neededRules) {
    const dataUri = await fetchFontAsBase64(url);
    if (dataUri) {
      css += "@font-face { font-family: 'Xiaolai SC'; src: url('" + dataUri + "') format('woff2'); unicode-range: " + unicodeRange + "; font-display: swap; }\n";
    }
  }
  return css;
}

/**
 * 获取字体文件并转换为 Base64（支持 CDN 回退）
 */
async function fetchFontAsBase64(url) {
  if (fontDataCache[url]) return fontDataCache[url];

  // 尝试原始 URL
  const result = await tryFetchFont(url);
  if (result) {
    fontDataCache[url] = result;
    return result;
  }

  // 如果是 jsdelivr URL，尝试 unpkg 回退
  if (url.includes('cdn.jsdelivr.net')) {
    const altUrl = url.replace('https://cdn.jsdelivr.net/npm/', 'https://unpkg.com/');
    const altResult = await tryFetchFont(altUrl);
    if (altResult) {
      fontDataCache[url] = altResult;
      return altResult;
    }
  }

  console.warn('Font fetch failed for all sources:', url);
  return null;
}

/**
 * 尝试从单个 URL 获取字体并转换为 Base64
 */
async function tryFetchFont(url) {
  try {
    const resp = await fetch(url, { mode: 'cors', cache: 'force-cache' });
    if (!resp.ok) { console.warn('Font fetch failed:', url, resp.status); return null; }
    const buf = await resp.arrayBuffer();
    const bytes = new Uint8Array(buf);
    let binary = '';
    for (let i = 0; i < bytes.length; i++) binary += String.fromCharCode(bytes[i]);
    const b64 = btoa(binary).replace(/\s/g, '');
    const mime = url.endsWith('.woff2') ? 'font/woff2'
      : url.endsWith('.woff') ? 'font/woff'
      : url.endsWith('.ttf') ? 'font/ttf' : 'font/truetype';
    const dataUri = 'data:' + mime + ';base64,' + b64;
    return dataUri;
  } catch (e) {
    console.warn('Font fetch error:', url, e.message);
    return null;
  }
}

/**
 * 从 CSS URL 中获取 WOFF2 URL
 */
async function fetchWoff2UrlFromCss(cssUrl) {
  try {
    const resp = await fetch(cssUrl);
    if (!resp.ok) return null;
    const css = await resp.text();
    // 优先使用 latin 子集；回退到找到的第一个 woff2
    const latinBlock = css.match(/\/\* latin \*\/[\s\S]*?src:[^;]*url\(['"]?(https?:\/\/[^'"')]+\.woff2)['"]?\)/);
    if (latinBlock) return latinBlock[1];
    const anyBlock = css.match(/src:[^;]*url\(['"]?(https?:\/\/[^'"')]+\.woff2)['"]?\)/);
    return anyBlock ? anyBlock[1] : null;
  } catch (e) { return null; }
}

/**
 * 构建内联字体 CSS（英文手绘字体）
 */
async function buildInlineFontCss() {
  const preset = HAND_FONTS[state.handDrawnFont] || HAND_FONTS.kalam;
  let fontUrl = preset.url;
  if (!fontUrl && preset.cssUrl) {
    fontUrl = await fetchWoff2UrlFromCss(preset.cssUrl);
  }
  if (!fontUrl) return '';
  try {
    const dataUri = await fetchFontAsBase64(fontUrl);
    if (!dataUri) return '';
    return "@font-face { font-family: '" + preset.label + "'; src: url('" + dataUri + "') format('woff2'); font-display: swap; }";
  } catch (e) { return ''; }
}

/**
 * 将字体内联到 SVG 中
 * - 手绘预设字体（Kalam 等）：仅在 handDrawn 模式下嵌入
 * - 小赖字体（CJK）：只要 SVG 含有中文字符，始终按 unicode-range 分片嵌入，
 *   并将 "Xiaolai SC" 注入 font-family，确保字符能被正确渲染
 */
export async function inlineFontsIntoSvg(svgEl, applyBg = true) {
  const clone = svgEl.cloneNode(true) as SVGElement;

  // 1. 移除所有外部图像元素
  const images = clone.querySelectorAll('image');
  for (let i = images.length - 1; i >= 0; i--) {
    const img = images[i];
    if (img.parentNode) img.parentNode.removeChild(img);
  }

  // 2. ✓ 保留原有 style，只清理外部引用（@import 和 http URL）
  const styleEls = Array.from(clone.querySelectorAll('style'));
  for (const s of styleEls) {
    let css = s.textContent;
    // 删除 @import 语句
    css = css.replace(/@import\s+[^;]+;/g, '');
    // 删除外部 URL (http:// 和 https://)，但保留 data: URI
    css = css.replace(/url\(['"]?https?:\/\/[^'")\s]+['"]?\)/g, '');
    s.textContent = css;
  }

  // 3. 构建内联字体
  const [fontCss, xiaolaiCss] = await Promise.all([
    buildInlineFontCss(),
    buildXiaolaiCssForSvg(clone),
  ]);

  let combinedCss = [fontCss, xiaolaiCss].filter(Boolean).join('\n');

  // 应用背景颜色到 SVG
  if (applyBg) {
    const bgColor = getExportBgColor();
    if (bgColor !== 'transparent') {
      combinedCss += `\nsvg { background-color: ${bgColor}; }`;
    }
  }

  // 4. ✓ 在开头插入 @font-face 声明
  if (combinedCss) {
    const styleEl = document.createElementNS('http://www.w3.org/2000/svg', 'style');
    styleEl.textContent = combinedCss;
    clone.insertBefore(styleEl, clone.firstChild);
  }

  // ✓ 保留所有 class 属性和其他属性，不做额外清理
  // 这样 SVG 元素可以继续应用原有的样式规则

  return clone;
}

// ── SVG 转 PNG 转换逻辑 ───────────────────────────────────────────

/**
 * 将 SVG 元素转换为 PNG Blob
 * @param {SVGElement} svgEl - SVG 元素
 * @param {number} scale - 缩放比例
 */
export function svgToPngBlob(svgEl: SVGElement, scale?: number): Promise<Blob> {
  if (!scale) {
    // 动态计算缩放比例：目标最小边 1200-2400px，最大边不超过 4800px
    const bbox = svgEl.getBoundingClientRect();
    const w = bbox.width || 800, h = bbox.height || 600;
    const minSide = Math.min(w, h), maxSide = Math.max(w, h);
    const scaleForMin = Math.max(1200 / minSide, 1);
    const scaleForMax = Math.min(4800 / maxSide, 10);
    scale = Math.min(scaleForMin, scaleForMax);
  }
  return new Promise<Blob>((resolve, reject) => {
    inlineFontsIntoSvg(svgEl).then(cloned => {
      // 使用自然 SVG 尺寸（不受父级缩放/平移变换影响）
      let width, height;
      try {
        const vb = (svgEl as any).viewBox.baseVal;
        if (vb && vb.width > 0 && vb.height > 0) { width = vb.width; height = vb.height; }
      } catch (e) {}
      if (!width || !height) {
        width = parseFloat(svgEl.getAttribute('width')) || 0;
        height = parseFloat(svgEl.getAttribute('height')) || 0;
      }
      if (!width || !height) {
        const bbox = svgEl.getBoundingClientRect();
        width = bbox.width || 800;
        height = bbox.height || 600;
      }

      // 手写模式下增加 5% 的宽度余量，避免字体宽度差异导致的文本截断
      if (state.handDrawn) {
        // 同时修改SVG的width和viewBox，确保不会拉伸变形
        width = width * 1.05;
        // 更新克隆的SVG的宽度属性
        cloned.setAttribute('width', width.toString());
        cloned.setAttribute('height', height.toString());
        // 如果有viewBox，也更新viewBox的宽度
        try {
          const vb = cloned.viewBox.baseVal;
          if (vb && vb.width > 0) {
            cloned.setAttribute('viewBox', `${vb.x} ${vb.y} ${width} ${vb.height}`);
          }
        } catch (e) {}
      }

      const svgData = new XMLSerializer().serializeToString(cloned);
      const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
      const url = URL.createObjectURL(svgBlob);
      const img = new Image();
      // 不设置 crossOrigin，因为 blob: URL 是同源的
      // img.crossOrigin 留为默认值

      img.onload = () => {
        const bgColor = getExportBgColor();
        const canvas = document.createElement('canvas');
        canvas.width = width * scale;
        canvas.height = height * scale;
        const ctx = canvas.getContext('2d', { willReadFrequently: false, alpha: bgColor === 'transparent' });
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';

        // 根据背景类型绘制背景
        if (bgColor === 'transparent') {
          // 透明背景：不绘制任何背景，保持透明
          // 棋盘格背景在预览时用于视觉效果，但导出时应该保持透明
        } else if (bgColor === 'grid') {
          // 网格背景：先绘制白色背景，再绘制网格线
          ctx.fillStyle = '#ffffff';
          ctx.fillRect(0, 0, canvas.width, canvas.height);

          const gridSize = 20 * scale;
          const gridColor = document.documentElement.getAttribute('data-theme') === 'dark' ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.15)';

          ctx.strokeStyle = gridColor;
          ctx.lineWidth = 1;

          for (let x = 0; x <= canvas.width; x += gridSize) {
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, canvas.height);
            ctx.stroke();
          }

          for (let y = 0; y <= canvas.height; y += gridSize) {
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(canvas.width, y);
            ctx.stroke();
          }
        } else {
          // 纯色背景（黑色或白色）
          ctx.fillStyle = bgColor;
          ctx.fillRect(0, 0, canvas.width, canvas.height);
        }

        ctx.scale(scale, scale);
        ctx.drawImage(img, 0, 0, width, height);
        URL.revokeObjectURL(url);
        canvas.toBlob(blob => {
          blob ? resolve(blob) : reject(new Error('Canvas toBlob failed'));
        }, 'image/png');
      };
      img.onerror = e => { URL.revokeObjectURL(url); console.error('Image load error', e); reject(new Error('Failed to load SVG')); };
      img.src = url;
    }).catch(reject);
  });
}

// 暴露到 window 上
window.svgToPngBlob = svgToPngBlob;
