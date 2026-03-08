import mermaid from 'mermaid';
import { state, HAND_FONTS, getHandDrawnFontFamily, getHandDrawnFontSizePx, resolveHandDrawnSeed } from './store';
import { dom } from './dom';
import { escapeHtml, setRenderStatus } from './utils';
import { STRINGS } from './i18n';
import { getCode, clearDiagnostics, pushDiagnosticFromError, scrollToLine } from './editor';

// ── Mermaid 初始化 ──────────────────────────────────────────
const NORMAL_FONT = "system-ui, -apple-system, sans-serif";

// kalam/caveat/virgil 均通过 ensureHandDrawnFont() 按需注入
const _injectedFonts = new Set<string>();
let _xiaolaiLoaded = false;

const XIAOLAI_CSS_CANDIDATES = [
  'https://registry.npmmirror.com/@chinese-fonts/xiaolai/3.0.0/files/dist/Xiaolai/result.css',
  'https://cdn.jsdelivr.net/npm/@chinese-fonts/xiaolai@3.0.0/dist/Xiaolai/result.css',
  'https://unpkg.com/@chinese-fonts/xiaolai@3.0.0/dist/Xiaolai/result.css',
];

function ensureXiaolaiFont() {
  if (_xiaolaiLoaded) return;
  _xiaolaiLoaded = true;

  const injectLink = (url: string) => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = url;
    document.head.appendChild(link);
  };

  // 并发 HEAD 请求，用 Promise.any 选出第一个成功的 CDN
  // 若全部失败或 3s 超时，回退到列表第一项
  const tryHead = (url: string) => fetch(url, { method: 'HEAD', cache: 'force-cache' })
    .then(r => { if (!r.ok) throw new Error(); return url; });

  const timeout = new Promise<never>((_, reject) => setTimeout(reject, 3000));
  const race = Promise.any
    ? Promise.any(XIAOLAI_CSS_CANDIDATES.map(tryHead))
    : Promise.race(XIAOLAI_CSS_CANDIDATES.map(tryHead));

  Promise.race([race, timeout])
    .then((url: string) => injectLink(url))
    .catch(() => injectLink(XIAOLAI_CSS_CANDIDATES[0]));
}

// 跟踪上一次的 Mermaid 配置，避免不必要的重新初始化
let _lastMermaidConfig = null;

/**
 * 按需懒加载手绘字体（Kalam / Caveat / Virgil）。
 * 首次渲染手绘图时注入 @font-face，后续调用直接跳过。
 */
function ensureHandDrawnFont(fontKey: string) {
  if (_injectedFonts.has(fontKey)) return;
  const preset = HAND_FONTS[fontKey];
  if (!preset || !preset.url) return;

  // 注入 @font-face
  const style = document.createElement('style');
  style.textContent = `@font-face{font-family:'${preset.label}';src:url('${preset.url}')format('woff2');font-display:swap;}`;
  document.head.appendChild(style);
  _injectedFonts.add(fontKey);
}

/**
 * 初始化 Mermaid 配置
 */
export function initMermaid() {
  const hdFont = getHandDrawnFontFamily();
  const hdSize = getHandDrawnFontSizePx();
  mermaid.initialize({
    startOnLoad: false,
    theme: state.currentTheme as any,
    look: state.handDrawn ? 'handDrawn' : 'classic',
    securityLevel: 'loose',
    handDrawnSeed: resolveHandDrawnSeed(),
    themeVariables: {
      fontFamily: state.handDrawn ? hdFont : NORMAL_FONT,
      fontSize: state.handDrawn ? hdSize : '14px',
    },
  });
  dom.preview.style.fontFamily = state.handDrawn ? hdFont : '';
  if (state.handDrawn) {
    document.documentElement.style.setProperty('--mermaid-font', hdFont);
  } else {
    document.documentElement.style.removeProperty('--mermaid-font');
  }
}

/**
 * 渲染图表
 */
export async function renderDiagram() {
  const code = getCode().trim();
  if (!code) {
    dom.preview.innerHTML = '<p class="placeholder">' + STRINGS[state.currentLang].placeholderMain + '</p>';
    setRenderStatus('', '');
    clearDiagnostics();
    return;
  }
  setRenderStatus('rendering', STRINGS[state.currentLang].renderingStatus);

  const noHandDrawn = /^\s*(classDiagram|stateDiagram|erDiagram|gantt|pie|mindmap|timeline|architecture|block-beta|gitGraph)/i.test(code);
  if (dom.handDrawnBtn) {
    if (state.handDrawn && noHandDrawn) {
      dom.handDrawnBtn.title = '此图类型不支持手绘风格 / Not supported for this diagram type';
      dom.handDrawnBtn.style.opacity = '0.5';
    } else {
      dom.handDrawnBtn.title = '手绘风格 (Hand-drawn style)';
      dom.handDrawnBtn.style.opacity = '';
    }
  }

  const hdFont = getHandDrawnFontFamily();
  const hdSize = getHandDrawnFontSizePx();
  const currentLook = (state.handDrawn && !noHandDrawn) ? 'handDrawn' : 'classic';

  // 构建当前配置
  const currentConfig = {
    theme: state.currentTheme,
    look: currentLook,
    fontFamily: state.handDrawn ? hdFont : NORMAL_FONT,
    fontSize: state.handDrawn ? hdSize : '14px',
  };

  // 仅在配置发生变化时重新初始化 Mermaid
  let needsReinit = !_lastMermaidConfig;
  if (_lastMermaidConfig) {
    if (
      _lastMermaidConfig.theme !== currentConfig.theme ||
      _lastMermaidConfig.look !== currentConfig.look ||
      _lastMermaidConfig.fontFamily !== currentConfig.fontFamily ||
      _lastMermaidConfig.fontSize !== currentConfig.fontSize
    ) {
      needsReinit = true;
    }
  }

  if (needsReinit) {
    mermaid.initialize({
      startOnLoad: false,
      theme: state.currentTheme as any,
      look: currentLook,
      securityLevel: 'loose',
      handDrawnSeed: resolveHandDrawnSeed(),
      themeVariables: {
        fontFamily: state.handDrawn ? hdFont : NORMAL_FONT,
        fontSize: state.handDrawn ? hdSize : '14px',
      },
    });
    _lastMermaidConfig = currentConfig;
  }

  dom.preview.style.fontFamily = state.handDrawn ? hdFont : '';
  if (state.handDrawn) {
    document.documentElement.style.setProperty('--mermaid-font', hdFont);
  } else {
    document.documentElement.style.removeProperty('--mermaid-font');
  }

  // 确保手绘字体已加载
  // 所有字体已通过 src/styles/fonts.css 全局预加载
  if (state.handDrawn && !noHandDrawn) {
    const preset = HAND_FONTS[state.handDrawnFont] || HAND_FONTS.kalam;
    ensureHandDrawnFont(state.handDrawnFont);
    ensureXiaolaiFont();
    try { await document.fonts.load('16px ' + (preset.label === 'Virgil' ? 'Virgil' : preset.label)); } catch (e) {}
    try { await document.fonts.load('16px "Xiaolai SC"'); } catch (e) {}
  }

  try {
    await mermaid.parse(code);
  } catch (parseErr) {
    handleRenderError(parseErr, code);
    return;
  }

  try {
    state.renderCounter++;
    const id = 'mermaid-diagram-' + state.renderCounter;
    const result = await mermaid.render(id, code);
    dom.preview.innerHTML = result.svg;
    clearDiagnostics();
    setRenderStatus('', '');
  } catch (err) {
    handleRenderError(err, code);
  }
}

// ── 错误处理 ───────────────────────────────────────────────────

function extractErrorLine(err) {
  const msg = err.message || String(err);
  const lineMatch = msg.match(/line\s+(\d+)/i);
  if (lineMatch) return parseInt(lineMatch[1], 10);
  if (err.hash && err.hash.line != null) return err.hash.line + 1;
  return null;
}

function getFriendlyHint(msg, lang) {
  const lower = msg.toLowerCase();
  if (lang === 'zh') {
    if (/expecting/i.test(msg) && /got.*eof/i.test(msg)) return '代码可能不完整，请检查是否有未闭合的括号或缺少 end 关键字';
    if (/unknown diagram type/i.test(msg)) return '未知的图表类型，支持的类型包括：graph, sequenceDiagram, classDiagram, gantt, pie, mindmap 等';
    if (/expecting.*['"](-->|---|===)/i.test(msg) || /invalid arrow/i.test(lower)) return '箭头语法错误，常见格式：-->, ---, ===>, -.->，请检查连接线格式';
    if (/unterminated/i.test(msg) || /unclosed/i.test(lower)) return '存在未闭合的引号、括号或代码块';
    if (/participant/i.test(msg)) return '时序图参与者声明有误，格式：participant 名称';
    if (/subgraph/i.test(msg)) return 'subgraph 块语法有误，确保每个 subgraph 都有对应的 end';
    return '请检查语法是否正确，可参考示例下拉菜单中的模板';
  }
  if (/expecting/i.test(msg) && /got.*eof/i.test(msg)) return 'Code appears incomplete. Check for unclosed brackets or missing "end" keywords.';
  if (/unknown diagram type/i.test(msg)) return 'Unknown diagram type. Supported types: graph, sequenceDiagram, classDiagram, gantt, pie, mindmap, etc.';
  if (/expecting.*['"](-->|---|===)/i.test(msg) || /invalid arrow/i.test(lower)) return 'Arrow syntax error. Common formats: -->, ---, ===>, -.->';
  if (/unterminated/i.test(msg) || /unclosed/i.test(lower)) return 'Unterminated string, bracket, or code block detected.';
  if (/participant/i.test(msg)) return 'Participant declaration error. Format: participant Name';
  if (/subgraph/i.test(msg)) return 'Subgraph syntax error. Each subgraph needs a matching "end".';
  return 'Check your syntax. See Help for example templates.';
}

function handleRenderError(err, code) {
  const msg = err.message || String(err);
  const errLine = extractErrorLine(err);
  const s = STRINGS[state.currentLang];
  const lineHint = errLine
    ? '<button class="error-banner__line error-banner__goto" data-line="' + errLine + '">' + s.errorLine.replace('{n}', errLine) + '</button>'
    : '';
  const friendlyHint = getFriendlyHint(msg, state.currentLang);
  dom.preview.innerHTML =
    '<div class="error-banner">' +
      '<div class="error-banner__header">' +
        '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>' +
        '<span>' + s.errorSyntax + '</span>' +
        lineHint +
        '<button class="error-banner__close" title="' + s.errorDismiss + '" onclick="this.closest(\'.error-banner\').remove()">' +
          '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>' +
        '</button>' +
      '</div>' +
      '<pre class="error-banner__msg">' + escapeHtml(msg) + '</pre>' +
      '<div class="error-banner__hint">' + escapeHtml(friendlyHint) + '</div>' +
      '<div class="error-banner__tip">' + s.errorTip + '</div>' +
    '</div>';

  const gotoBtn = dom.preview.querySelector('.error-banner__goto');
  if (gotoBtn) {
    gotoBtn.addEventListener('click', () => {
      scrollToLine(parseInt(gotoBtn.getAttribute('data-line'), 10));
    });
  }

  setRenderStatus('error', s.renderError);
  pushDiagnosticFromError(msg, err);
}
