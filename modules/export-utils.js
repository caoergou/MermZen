import { state, HAND_FONTS } from './store.js';
import { getExportBgColor } from './ui/theme.js';

// ── SVG 字体内联逻辑 ───────────────────────────────────────────────
const fontDataCache = {};

// ── 小赖字体 (Xiaolai SC) 子集嵌入 ────────────────────────────
const XIAOLAI_CSS_URL = 'https://cdn.jsdelivr.net/npm/@chinese-fonts/xiaolai@3.0.0/dist/Xiaolai/result.css';
let _xiaolaiRules = null;

/**
 * 获取小赖字体的 CSS 规则
 */
async function fetchXiaolaiRules() {
  if (_xiaolaiRules !== null) return _xiaolaiRules;
  try {
    const resp = await fetch(XIAOLAI_CSS_URL, { cache: 'force-cache' });
    if (!resp.ok) { _xiaolaiRules = []; return []; }
    const css = await resp.text();
    const rules = [];
    const re = /@font-face\s*\{([^}]+)\}/g;
    let m;
    while ((m = re.exec(css)) !== null) {
      const block = m[1];
      const srcM = block.match(/src:[^;]*url\(['"]?([^'")\s]+)['"]?\)/i);
      const ucrM = block.match(/unicode-range:\s*([^;]+)/i);
      if (srcM && ucrM) {
        const absUrl = new URL(srcM[1], XIAOLAI_CSS_URL).href;
        rules.push({ url: absUrl, unicodeRange: ucrM[1].trim() });
      }
    }
    _xiaolaiRules = rules;
    return rules;
  } catch (e) {
    _xiaolaiRules = [];
    return [];
  }
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
    .map(el => el.textContent).join('');

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
 * 获取字体文件并转换为 Base64
 */
async function fetchFontAsBase64(url) {
  if (fontDataCache[url]) return fontDataCache[url];
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
    fontDataCache[url] = dataUri;
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
 * 构建内联字体 CSS
 */
async function buildInlineFontCss() {
  if (!state.handDrawn) return '';
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
 */
export async function inlineFontsIntoSvg(svgEl) {
  const clone = svgEl.cloneNode(true);
  const images = clone.querySelectorAll('image');
  for (let i = images.length - 1; i >= 0; i--) images[i].parentNode.removeChild(images[i]);

  const styleEls = clone.querySelectorAll('style');
  for (const s of styleEls) {
    s.textContent = s.textContent.replace(/url\(['"]?(https?:\/\/[^'")]+)['"]?\)/g, '');
  }

  if (state.handDrawn) {
    // 并行嵌入手绘预设字体和小赖字体（中文）
    const [fontCss, xiaolaiCss] = await Promise.all([
      buildInlineFontCss(),
      buildXiaolaiCssForSvg(svgEl),
    ]);
    const combinedCss = [fontCss, xiaolaiCss].filter(Boolean).join('\n');
    if (combinedCss) {
      const styleEl = document.createElementNS('http://www.w3.org/2000/svg', 'style');
      styleEl.textContent = combinedCss;
      clone.insertBefore(styleEl, clone.firstChild);
    }
  }
  return clone;
}

// ── SVG 转 PNG 转换逻辑 ───────────────────────────────────────────

/**
 * 将 SVG 元素转换为 PNG Blob
 * @param {SVGElement} svgEl - SVG 元素
 * @param {number} scale - 缩放比例
 */
export function svgToPngBlob(svgEl, scale) {
  scale = scale || 4;
  return new Promise((resolve, reject) => {
    inlineFontsIntoSvg(svgEl).then(cloned => {
      const images = cloned.querySelectorAll('image');
      for (let i = images.length - 1; i >= 0; i--) images[i].parentNode.removeChild(images[i]);

      const styleEls = cloned.querySelectorAll('style');
      styleEls.forEach(el => {
        el.textContent = el.textContent.replace(/url\(['"]?(https?:\/\/[^'")]+)['"]?\)/g, '');
      });

      const svgData = new XMLSerializer().serializeToString(cloned);
      // 使用自然 SVG 尺寸（不受父级缩放/平移变换影响）
      let width, height;
      try {
        const vb = svgEl.viewBox.baseVal;
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
      const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
      const url = URL.createObjectURL(svgBlob);
      const img = new Image();
      img.crossOrigin = 'anonymous';

      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = width * scale;
        canvas.height = height * scale;
        const ctx = canvas.getContext('2d');
        const bg = getExportBgColor();
        if (bg !== 'transparent') {
          ctx.fillStyle = bg;
          ctx.fillRect(0, 0, canvas.width, canvas.height);
        }
        ctx.scale(scale, scale);
        ctx.drawImage(img, 0, 0, width, height);
        URL.revokeObjectURL(url);
        try {
          canvas.toBlob(blob => {
            blob ? resolve(blob) : reject(new Error('Canvas toBlob failed'));
          }, 'image/png');
        } catch (e) {
          console.warn('Canvas toBlob failed (tainted), using fallback');
          try {
            const dataURL = canvas.toDataURL('image/png');
            const byteString = atob(dataURL.split(',')[1]);
            const mimeString = dataURL.split(',')[0].split(':')[1].split(';')[0];
            const ab = new ArrayBuffer(byteString.length);
            const ia = new Uint8Array(ab);
            for (let j = 0; j < byteString.length; j++) ia[j] = byteString.charCodeAt(j);
            resolve(new Blob([ab], { type: mimeString }));
          } catch (fallbackErr) { reject(fallbackErr); }
        }
      };
      img.onerror = e => { URL.revokeObjectURL(url); console.error('Image load error', e); reject(new Error('Failed to load SVG')); };
      img.src = url;
    }).catch(reject);
  });
}
