import mermaid from 'mermaid';
import { inflate, inflateRaw } from 'pako';
import { preprocessQuadrant } from './quadrant-preprocess';

/**
 * 嵌入页支持的渲染选项
 */
interface RenderOptions {
  theme?: string;
  look?: string;
  font?: string;
  fontSize?: number;
  bg?: string;
}

/**
 * 解码压缩后的 payload（pako deflate + base64url）。
 * 解码失败时返回 null，让调用方回退到纯文本处理。
 */
function tryDecodeCompressed(encoded: string): { code: string; options: RenderOptions } | null {
  let s = encoded.replace(/-/g, '+').replace(/_/g, '/');
  while (s.length % 4 !== 0) s += '=';
  let bytes: Uint8Array;
  try {
    const binary = atob(s);
    bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  } catch {
    return null;
  }

  let decoded: string | null = null;
  try {
    decoded = new TextDecoder().decode(inflate(bytes));
  } catch {
    try {
      decoded = new TextDecoder().decode(inflateRaw(bytes));
    } catch {
      return null;
    }
  }

  return parseDecoded(decoded);
}

/**
 * 将解码后的字符串解析为 code + options。
 * 支持 v2 JSON payload，也兼容直接是 mermaid 源码的旧格式。
 */
function parseDecoded(decoded: string): { code: string; options: RenderOptions } {
  const options: RenderOptions = {};
  try {
    const obj = JSON.parse(decoded);
    if (obj && obj.v === 2 && typeof obj.c === 'string') {
      if (obj.t) options.theme = obj.t;
      if (obj.hd === false) options.look = 'classic';
      if (obj.hdf) options.font = obj.hdf;
      if (obj.hds) options.fontSize = sizeFromName(obj.hds);
      if (obj.bg) options.bg = obj.bg;
      return { code: obj.c, options };
    }
  } catch {
    // 不是 JSON，按纯 mermaid 源码处理
  }
  return { code: decoded, options };
}

function sizeFromName(name: string): number {
  const sizes: Record<string, number> = { small: 14, medium: 16, large: 18 };
  return sizes[name] || 16;
}

function fontFamilyFromName(name?: string): string {
  const fonts: Record<string, string> = { kalam: 'Kalam', caveat: 'Caveat', virgil: 'Virgil' };
  return fonts[(name || '').toLowerCase()] || 'Kalam';
}

function showError(message: string): void {
  const errEl = document.getElementById('error');
  if (errEl) {
    errEl.style.display = '';
    errEl.textContent = message;
  }
}

function applyBackground(bg: string): void {
  const body = document.body;
  // 重置
  body.style.background = 'transparent';
  body.style.backgroundImage = '';
  body.style.backgroundSize = '';
  if (bg === 'grid') {
    body.style.background = '#ffffff';
    body.style.backgroundImage =
      'linear-gradient(rgba(0,0,0,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.06) 1px, transparent 1px)';
    body.style.backgroundSize = '20px 20px';
  } else if (bg && bg !== 'transparent') {
    body.style.background = bg;
  }
}

let renderSeq = 0;
let currentCode = '';
let currentOptions: RenderOptions = {};
// 当前视图变换状态（缩放/平移），供拖拽、滚轮与自动适配共享
const view = { scale: 1, posX: 0, posY: 0 };

/**
 * 渲染一个 mermaid 图，并装配缩放/拖拽交互。
 * 渲染完成后通过 postMessage 把尺寸汇报给父页面，便于自适应高度。
 */
async function renderDiagram(code: string, options: RenderOptions = {}): Promise<void> {
  const seq = ++renderSeq;
  currentCode = code;
  currentOptions = options;
  const errEl = document.getElementById('error');
  if (errEl) errEl.style.display = 'none';

  applyBackground(options.bg || 'transparent');

  const fontFamily = fontFamilyFromName(options.font);
  const fontSize = options.fontSize || 16;

  mermaid.initialize({
    startOnLoad: false,
    theme: (options.theme || 'default') as any,
    look: (options.look || 'handDrawn') as any,
    handDrawnSeed: 42,
    securityLevel: 'loose',
    themeVariables: {
      fontFamily: `${fontFamily}, "Xiaolai SC", cursive`,
      fontSize: `${fontSize}px`,
    },
  });

  const el = document.getElementById('diagram');
  if (!el) return;

  try {
    // quadrantChart CJK 预处理：把中文 label 替换为 ASCII placeholder，
    // 渲染后再将 SVG 里的 placeholder 还原为原始中文，绕过 mermaid 词法器的 ASCII 限制
    const { processed: processedCode, restore: restoreCjk } = preprocessQuadrant(code);

    // 每次渲染使用唯一 id，避免 mermaid 复用旧节点
    const result = await mermaid.render('mermaid-svg-' + seq, processedCode);
    if (seq !== renderSeq) return; // 已有更新的渲染请求，丢弃旧结果
    el.innerHTML = restoreCjk(result.svg);
    normalizeSvgSize(el);
    setupInteractions(el);
    fitToContainer(el); // 自动缩放居中，避免中文等较宽内容溢出被裁切
    updateBrandLink();
    reportSize();
  } catch (err: any) {
    if (seq !== renderSeq) return;
    showError('Render error: ' + (err?.message || String(err)));
    notifyParent({ type: 'mermzen:error', error: err?.message || String(err) });
  }
}

/**
 * 把 mermaid 输出的 svg 固定为其自然像素尺寸，去掉 max-width 限制，
 * 这样后续的缩放变换才有可预测的基准。
 */
function normalizeSvgSize(el: HTMLElement): void {
  const svg = el.querySelector('svg') as SVGSVGElement | null;
  if (!svg) return;
  const vb = svg.viewBox && svg.viewBox.baseVal;
  let w = vb && vb.width ? vb.width : svg.getBoundingClientRect().width;
  let h = vb && vb.height ? vb.height : svg.getBoundingClientRect().height;
  if (!w || !h) return;
  svg.style.maxWidth = 'none';
  svg.style.width = w + 'px';
  svg.style.height = h + 'px';
}

const MIN_SCALE = 0.1;
const MAX_SCALE = 10;
const MAX_FIT_SCALE = 4; // 自动放大的上限，避免单节点小图被撑得过大

/**
 * 计算并应用变换，让图按容器尺寸缩放居中（contain 填充）：
 * 大图缩小、小图放大，始终完整可见且居中，避免中文等较宽内容溢出裁切。
 */
function fitToContainer(el: HTMLElement): void {
  const container = document.getElementById('container');
  const svg = el.querySelector('svg') as SVGSVGElement | null;
  if (!container || !svg) return;

  const cw = container.clientWidth;
  const ch = container.clientHeight;
  const w = parseFloat(svg.style.width) || svg.getBoundingClientRect().width;
  const h = parseFloat(svg.style.height) || svg.getBoundingClientRect().height;
  if (!w || !h || !cw || !ch) return;

  const pad = 16; // 留出边距，避免贴边
  let scale = Math.min((cw - pad * 2) / w, (ch - pad * 2) / h);
  scale = Math.max(MIN_SCALE, Math.min(scale, MAX_FIT_SCALE));
  view.scale = scale;
  view.posX = (cw - w * scale) / 2;
  view.posY = (ch - h * scale) / 2;
  applyView(el);
}

/**
 * 以容器中某点为锚点缩放，保持该点在缩放前后位置不变。
 */
function zoomAt(el: HTMLElement, cx: number, cy: number, factor: number): void {
  const newScale = Math.max(MIN_SCALE, Math.min(view.scale * factor, MAX_SCALE));
  view.posX = cx - (cx - view.posX) * (newScale / view.scale);
  view.posY = cy - (cy - view.posY) * (newScale / view.scale);
  view.scale = newScale;
  applyView(el);
}

function applyView(el: HTMLElement): void {
  el.style.transform =
    'translate(' + view.posX + 'px, ' + view.posY + 'px) scale(' + view.scale + ')';
}

/**
 * 让品牌角标链接回编辑器并带上当前图，方便从嵌入页一键打开编辑。
 */
function updateBrandLink(): void {
  const brand = document.getElementById('brand') as HTMLAnchorElement | null;
  if (!brand || !currentCode) return;
  const base = location.origin + location.pathname.replace(/embed\.html$/, '');
  const params = new URLSearchParams();
  params.set('text', currentCode);
  if (currentOptions.theme) params.set('theme', currentOptions.theme);
  if (currentOptions.look) params.set('look', currentOptions.look);
  if (currentOptions.bg) params.set('bg', currentOptions.bg);
  brand.href = base + '?' + params.toString();
}

/**
 * 装配滚轮缩放与拖拽平移（共享全局 view 状态，避免与自动适配冲突）
 */
function setupInteractions(el: HTMLElement): void {
  const container = document.getElementById('container');
  if (!container || container.dataset.wired) return;
  container.dataset.wired = '1';

  let isDragging = false,
    startX = 0,
    startY = 0;

  container.addEventListener('wheel', function (e) {
    e.preventDefault();
    const rect = container.getBoundingClientRect();
    zoomAt(el, e.clientX - rect.left, e.clientY - rect.top, e.deltaY > 0 ? 0.9 : 1.1);
  });
  el.addEventListener('mousedown', function (e) {
    isDragging = true;
    startX = e.clientX - view.posX;
    startY = e.clientY - view.posY;
  });
  document.addEventListener('mousemove', function (e) {
    if (!isDragging) return;
    view.posX = e.clientX - startX;
    view.posY = e.clientY - startY;
    applyView(el);
  });
  document.addEventListener('mouseup', function () {
    isDragging = false;
  });

  // 容器尺寸变化时重新适配（响应式 iframe）
  window.addEventListener('resize', function () {
    fitToContainer(el);
  });

  setupToolbar(el);
}

/**
 * 装配缩放工具栏：放大 / 缩小 / 适配（复位居中）
 */
function setupToolbar(el: HTMLElement): void {
  const container = document.getElementById('container');
  if (!container) return;
  const center = () => {
    const r = container.getBoundingClientRect();
    return { x: r.width / 2, y: r.height / 2 };
  };
  const byId = (id: string) => document.getElementById(id);
  byId('zoom-in')?.addEventListener('click', () => {
    const c = center();
    zoomAt(el, c.x, c.y, 1.2);
  });
  byId('zoom-out')?.addEventListener('click', () => {
    const c = center();
    zoomAt(el, c.x, c.y, 1 / 1.2);
  });
  byId('zoom-fit')?.addEventListener('click', () => fitToContainer(el));
}

/**
 * 给父页面发消息（仅当处于 iframe 中时）
 */
function notifyParent(msg: Record<string, unknown>): void {
  if (window.parent && window.parent !== window) {
    window.parent.postMessage(msg, '*');
  }
}

/**
 * 把渲染后的 SVG 实际尺寸汇报给父页面，便于自适应高度
 */
function reportSize(): void {
  const svg = document.querySelector('#diagram svg') as SVGSVGElement | null;
  if (!svg) return;
  const rect = svg.getBoundingClientRect();
  notifyParent({
    type: 'mermzen:rendered',
    width: Math.ceil(rect.width),
    height: Math.ceil(rect.height),
  });
}

/**
 * 从当前 URL 解析出初始 code 与选项。
 * 优先级：
 *   1. ?text= / ?mermaid= / ?diagram=  —— 纯文本（URL 编码即可，对 AI 最友好）
 *   2. hash 或 ?code=                    —— 压缩 payload；解压失败则当作纯文本
 * 查询参数 theme / look / bg / font / fontSize 可覆盖选项。
 */
function parseUrl(): { code: string | null; options: RenderOptions } {
  const params = new URLSearchParams(location.search);
  const options: RenderOptions = {};

  // 查询参数级别的样式覆盖
  if (params.get('theme')) options.theme = params.get('theme')!;
  if (params.get('look')) options.look = params.get('look')!;
  if (params.get('bg')) options.bg = params.get('bg')!;
  if (params.get('font')) options.font = params.get('font')!;
  if (params.get('fontSize')) {
    const n = parseInt(params.get('fontSize')!, 10);
    if (!Number.isNaN(n)) options.fontSize = n;
  }

  // 1. 纯文本参数（最简单、最易被 AI 构造）
  const plain = params.get('text') || params.get('mermaid') || params.get('diagram');
  if (plain) {
    return { code: plain, options };
  }

  // 2. 压缩 payload（hash 或 ?code=）
  const rawHash = location.hash.slice(1);
  const encoded = rawHash || params.get('code');
  if (encoded) {
    const decoded = tryDecodeCompressed(encoded);
    if (decoded) {
      return { code: decoded.code, options: { ...decoded.options, ...options } };
    }
    // 解压失败：把 hash/参数当作纯文本（URL 解码）
    return { code: decodeURIComponent(encoded), options };
  }

  return { code: null, options };
}

/**
 * 监听父页面通过 postMessage 推送的渲染指令，支持动态更新图表。
 *   parent.postMessage({ type: 'mermzen:render', code: '...', options: {...} }, '*')
 */
window.addEventListener('message', (e: MessageEvent) => {
  const d = e.data;
  if (d && typeof d === 'object' && d.type === 'mermzen:render' && typeof d.code === 'string') {
    renderDiagram(d.code, (d.options as RenderOptions) || {});
  }
});

/**
 * 等待字体就绪，最多等待 timeout 毫秒后超时继续。
 * 不等字体直接渲染会导致 Mermaid 用降级字体测量文字宽度，
 * 造成节点尺寸算错、CJK 文字显示不完整的 bug（刷新后正常因字体已缓存）。
 */
async function waitForFonts(timeout = 3000): Promise<void> {
  await Promise.race([
    document.fonts.ready,
    new Promise<void>(resolve => setTimeout(resolve, timeout)),
  ]);
  // 再额外等待已知字体的实际文件加载完成
  const remaining = timeout - 500;
  if (remaining > 0) {
    await Promise.race([
      Promise.all([
        document.fonts.load('400 16px Kalam').catch(() => {}),
        document.fonts.load('400 16px "Xiaolai SC"').catch(() => {}),
      ]),
      new Promise<void>(resolve => setTimeout(resolve, remaining)),
    ]);
  }
}

// 初始化：解析 URL 并渲染
const initial = parseUrl();
if (!initial.code) {
  // 没有 URL 内容时不报错，而是等待 postMessage（便于纯动态嵌入），
  // 但若也没有父页面，则提示用户。
  notifyParent({ type: 'mermzen:ready' });
  if (!window.parent || window.parent === window) {
    showError('No diagram code found. Pass ?text=<mermaid> in the URL or postMessage a { type: "mermzen:render", code } to this frame.');
  }
} else {
  // 等字体就绪后再渲染，避免 Mermaid layout 阶段用降级字体量出错误的文字宽度
  waitForFonts().then(() => {
    renderDiagram(initial.code!, initial.options);
    notifyParent({ type: 'mermzen:ready' });
  });
}
