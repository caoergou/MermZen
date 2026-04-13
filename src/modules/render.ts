import mermaid from 'mermaid';
import { state, HAND_FONTS, getHandDrawnFontFamily, getHandDrawnFontSizePx, resolveHandDrawnSeed } from './store';
import { dom } from './dom';
import { escapeHtml, setRenderStatus, extractErrorLine, getFriendlyHint } from './utils';
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

  // 使用 link preload 策略，比 fetch HEAD 更高效
  const link = document.createElement('link');
  link.rel = 'preload';
  link.as = 'font';
  link.type = 'font/woff2';
  link.crossOrigin = 'anonymous';
  link.href = XIAOLAI_CSS_CANDIDATES[0];
  link.onload = () => {
    // preload 完成后，注入实际的 @font-face CSS
    const styleLink = document.createElement('link');
    styleLink.rel = 'stylesheet';
    styleLink.href = XIAOLAI_CSS_CANDIDATES[0];
    document.head.appendChild(styleLink);
  };
  link.onerror = () => {
    // 如果第一个 CDN 失败，尝试其他候选
    const tryNext = (index: number) => {
      if (index >= XIAOLAI_CSS_CANDIDATES.length) return;
      const styleLink = document.createElement('link');
      styleLink.rel = 'stylesheet';
      styleLink.href = XIAOLAI_CSS_CANDIDATES[index];
      styleLink.onerror = () => tryNext(index + 1);
      document.head.appendChild(styleLink);
    };
    tryNext(1);
  };
  document.head.appendChild(link);
}

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

// 跟踪上一次的 Mermaid 配置，避免不必要的重新初始化
let _lastMermaidConfig = null;
let _initTimeout = null;

/**
 * 初始化 Mermaid 配置（带 debounce）
 */
export function initMermaid() {
  clearTimeout(_initTimeout);
  _initTimeout = setTimeout(() => {
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
  }, 50);
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
    const s = STRINGS[state.currentLang];
    if (state.handDrawn && noHandDrawn) {
      dom.handDrawnBtn.title = s.handDrawnNotSupported;
      dom.handDrawnBtn.style.opacity = '0.5';
    } else {
      dom.handDrawnBtn.title = s.handDrawnTitle;
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
  const needsReinit = !_lastMermaidConfig || 
    _lastMermaidConfig.theme !== currentConfig.theme ||
    _lastMermaidConfig.look !== currentConfig.look ||
    _lastMermaidConfig.fontFamily !== currentConfig.fontFamily ||
    _lastMermaidConfig.fontSize !== currentConfig.fontSize;

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

function handleRenderError(err, code) {
  const msg = err.message || String(err);
  const errLine = extractErrorLine(err);
  const s = STRINGS[state.currentLang];

  console.warn('[MermZen] Render error:', {
    message: msg,
    line: errLine,
    code: code.slice(0, 200) + (code.length > 200 ? '...' : ''),
    error: err
  });

  const lineHint = errLine
    ? '<button class="error-banner__line error-banner__goto" data-line="' + errLine + '">' + s.errorLine.replace('{n}', String(errLine)) + '</button>'
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
