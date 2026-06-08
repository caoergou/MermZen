import { deflate, inflate, inflateRaw } from 'pako';
import { state } from './store';
import { dom } from './dom';
import { showToast, btnSuccess, downloadFile } from './utils';
import { STRINGS } from './i18n';
import { getCode } from './editor';
import { inlineFontsIntoSvg, svgToPngBlob } from './export-utils';

// ── 图表类型 → 中/英显示名（用于导出文件名）────────────────────────
const DIAGRAM_TYPE_NAMES = {
  flowchart: { zh: '流程图', en: 'Flowchart' },
  graph: { zh: '流程图', en: 'Flowchart' },
  sequenceDiagram: { zh: '时序图', en: 'Sequence Diagram' },
  classDiagram: { zh: '类图', en: 'Class Diagram' },
  stateDiagram: { zh: '状态图', en: 'State Diagram' },
  'stateDiagram-v2': { zh: '状态图', en: 'State Diagram' },
  erDiagram: { zh: 'ER图', en: 'ER Diagram' },
  gantt: { zh: '甘特图', en: 'Gantt' },
  pie: { zh: '饼图', en: 'Pie Chart' },
  journey: { zh: '用户旅程图', en: 'User Journey' },
  gitGraph: { zh: 'Git图', en: 'Git Graph' },
  mindmap: { zh: '思维导图', en: 'Mindmap' },
  timeline: { zh: '时间线', en: 'Timeline' },
  blockBeta: { zh: '块图', en: 'Block Diagram' },
  'block-beta': { zh: '块图', en: 'Block Diagram' },
  architectureBeta: { zh: '架构图', en: 'Architecture' },
  'architecture-beta': { zh: '架构图', en: 'Architecture' },
  quadrantChart: { zh: '象限图', en: 'Quadrant Chart' },
  'quadrant-chart': { zh: '象限图', en: 'Quadrant Chart' },
  requirementDiagram: { zh: '需求图', en: 'Requirement Diagram' },
  'requirement-diagram': { zh: '需求图', en: 'Requirement Diagram' },
  diagram: { zh: '图表', en: 'Diagram' },
};

/** 从代码首行取第一个词（跳过空行与 %% 注释） */
function getFirstWordFromCode(code: string): string {
  if (!code || typeof code !== 'string') return '';
  const line = code.split('\n').find(l => {
    const t = l.trim();
    return t && !t.startsWith('%%');
  });
  return line ? line.trim().split(/\s+/)[0] || '' : '';
}

/**
 * 从 Mermaid 代码首行解析图表类型 key；未识别时返回 'diagram'
 */
function getDiagramTypeKey(code: string): string {
  const first = getFirstWordFromCode(code);
  if (!first) return 'diagram';
  const key = first.toLowerCase();
  if (DIAGRAM_TYPE_NAMES[key]) return key;
  const keyAlt = key.replace(/-/g, '');
  for (const k of Object.keys(DIAGRAM_TYPE_NAMES)) {
    if (k.replace(/-/g, '') === keyAlt) return k;
  }
  return 'diagram';
}

/**
 * 生成导出文件名：类型名-日期时间.扩展名（紧凑无多余空格）
 */
function getExportFilename(ext: string): string {
  const code = getCode();
  const key = getDiagramTypeKey(code);
  const names = DIAGRAM_TYPE_NAMES[key];
  const lang = state.currentLang === 'zh' ? 'zh' : 'en';
  let typeName = names ? (names[lang] || names.en) : '';
  if (!typeName) typeName = getFirstWordFromCode(code) || (lang === 'zh' ? '图表' : 'Diagram');
  const now = new Date();
  const pad = (n: number): string => String(n).padStart(2, '0');
  const dateStr = `${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(now.getDate())}-${pad(now.getHours())}${pad(now.getMinutes())}${pad(now.getSeconds())}`;
  const safe = (typeName.replace(/[/\\:*?"<>|\s]+/g, '-').replace(/-+/g, '-') || 'diagram').replace(/^-|-$/g, '');
  return `${safe}-${dateStr}.${ext.replace(/^\./, '')}`;
}

// ── 复制 / 下载 ─────────────────────────────────────────────────

/**
 * 复制 PNG 图片到剪贴板
 */
export async function copyPng() {
  const svgEl = dom.preview.querySelector('svg');
  if (!svgEl) { showToast(STRINGS[state.currentLang].toastNoDiagram); return; }
  const blob = await svgToPngBlob(svgEl as SVGElement);
  await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob as Blob })]);
  showToast(STRINGS[state.currentLang].toastCopiedPng);
  btnSuccess(dom.btnCopyPng);
}

/**
 * 下载 SVG 文件
 */
export async function downloadSvg() {
  const svgEl = dom.preview.querySelector('svg');
  if (!svgEl) { showToast(STRINGS[state.currentLang].toastNoDiagram); return; }
  const cloned = await inlineFontsIntoSvg(svgEl, true); // 确保应用背景
  const rawSvg = new XMLSerializer().serializeToString(cloned);
  const { optimizeSvg } = await import('./svgo-optimize');
  const optimized = optimizeSvg(rawSvg);
  const blob = new Blob([optimized], { type: 'image/svg+xml' });
  downloadFile(blob, getExportFilename('svg'));
  showToast(STRINGS[state.currentLang].toastDownloadSvg);
}

/**
 * 下载 PNG 文件
 */
export async function downloadPng() {
  const svgEl = dom.preview.querySelector('svg');
  if (!svgEl) { showToast(STRINGS[state.currentLang].toastNoDiagram); return; }
  downloadFile(await svgToPngBlob(svgEl as SVGElement), getExportFilename('png'));
  showToast(STRINGS[state.currentLang].toastDownloadPng);
}

// ── URL 编码 (pako 压缩 + base64) ────────────────────────

/**
 * 构建状态 Payload 对象 (v2)
 * 仅包含非默认值以减小体积
 */
export function buildPayload(code: string) {
  const p: any = { v: 2, c: code };
  if (state.currentTheme !== 'default') p.t = state.currentTheme;
  if (state.handDrawn === false) p.hd = false;
  if (state.handDrawnFont !== 'kalam') p.hdf = state.handDrawnFont;
  if (state.handDrawnFontSize !== 'medium') p.hds = state.handDrawnFontSize;
  if (state.handDrawnSeedMode !== 'fixed') p.hdm = state.handDrawnSeedMode;
  if (state.previewBg !== 'white') p.bg = state.previewBg;
  return p;
}

/**
 * 编码 Payload 对象
 */
export function encodePayload(payload: any): string {
  const json = JSON.stringify(payload);
  const bytes = new TextEncoder().encode(json);
  const compressed = deflate(bytes);
  let binary = '';
  for (let i = 0; i < compressed.length; i++) binary += String.fromCharCode(compressed[i]);
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

/**
 * 编码代码字符串 (兼容旧逻辑，但内部改用 encodePayload)
 */
export function encodeCode(code: string): string {
  return encodePayload(buildPayload(code));
}

/**
 * 解码 Payload
 * 返回 { code, settings }，兼容旧格式
 */
export function decodePayload(encoded: string): { code: string; settings: any } | null {
  if (!encoded) return null;
  encoded = encoded.replace(/-/g, '+').replace(/_/g, '/');
  while (encoded.length % 4 !== 0) encoded += '=';
  const binary = atob(encoded);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  
  let decoded;
  try {
    decoded = new TextDecoder().decode(inflate(bytes));
  } catch (e1) {
    try {
      decoded = new TextDecoder().decode(inflateRaw(bytes));
    } catch (e2) {
      decoded = new TextDecoder().decode(bytes);
    }
  }

  try {
    const obj = JSON.parse(decoded);
    if (obj && obj.v === 2) {
      return {
        code: obj.c,
        settings: {
          t: obj.t,
          hd: obj.hd,
          hdf: obj.hdf,
          hds: obj.hds,
          hdm: obj.hdm,
          bg: obj.bg
        }
      };
    }
  } catch (e) {
    // 解析 JSON 失败，说明是旧格式（纯代码）
  }
  
  return { code: decoded, settings: {} };
}

/**
 * 解码代码字符串 (保持签名不变，仅返回 code)
 */
export function decodeCode(encoded: string): string | null {
  const res = decodePayload(encoded);
  return res ? res.code : null;
}

/**
 * 获取 URL 查询参数中的纯文本代码（?text= / ?mermaid= / ?diagram=）
 * 这是对 AI 与手写最友好的方式：直接 URL 编码 mermaid 源码即可，无需压缩。
 */
export function getPlainTextState(): { code: string; settings: any } | null {
  try {
    const params = new URLSearchParams(location.search);
    const code = params.get('text') || params.get('mermaid') || params.get('diagram');
    if (!code) return null;
    const settings: any = {};
    if (params.get('theme')) settings.t = params.get('theme');
    if (params.get('look') === 'classic') settings.hd = false;
    if (params.get('font')) settings.hdf = params.get('font');
    if (params.get('bg')) settings.bg = params.get('bg');
    return { code, settings };
  } catch (e) {
    return null;
  }
}

/**
 * 获取 URL 查询参数中的状态
 */
export function getQueryState(): { code: string; settings: any } | null {
  try {
    const param = new URLSearchParams(location.search).get('code');
    return decodePayload(param || '');
  } catch (e) { return null; }
}

/**
 * 获取 URL 查询参数中的代码
 */
export function getQueryCode(): string | null {
  const res = getQueryState();
  return res ? res.code : null;
}

/**
 * 获取 URL Hash 中的状态
 */
export function getHashState(): { code: string; settings: any } | null {
  try {
    const hash = location.hash.slice(1);
    return decodePayload(hash);
  } catch (e) { return null; }
}

/**
 * 获取 URL Hash 中的代码
 */
export function getHashCode(): string | null {
  const res = getHashState();
  return res ? res.code : null;
}

/**
 * 更新 URL Hash
 */
export function updateHash(code: string): void {
  const encoded = encodeCode(code);
  window.history.replaceState(null, '', '#' + encoded);
  try { localStorage.setItem('mermzen-code', code); } catch (e) {}
}

/**
 * 复制分享链接
 */
export async function copyShareLink() {
  updateHash(getCode());
  await navigator.clipboard.writeText(location.href);
  showToast(STRINGS[state.currentLang].toastLinkCopied);
  btnSuccess(dom.btnShare);
}

/**
 * 复制嵌入代码
 */
export async function copyEmbedCode() {
  const encoded = encodeCode(getCode());
  const embedUrl = location.origin + location.pathname.replace(/[^/]*$/, '') + 'embed.html#' + encoded;
  const embedCode = '<iframe src="' + embedUrl + '" width="100%" height="600" frameborder="0" style="border: none;" title="Mermaid Diagram"></iframe>';
  await navigator.clipboard.writeText(embedCode);
  showToast(STRINGS[state.currentLang].toastEmbedCopied);
  btnSuccess(dom.btnShare);
}

// 暴露函数到 window 上
window.downloadPng = downloadPng;
