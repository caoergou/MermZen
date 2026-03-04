import { dom } from '../dom.js';
import { state, saveHandDrawnPrefs } from '../store.js';
import { initMermaid, renderDiagram } from '../render.js';
import { openHelp as openHelpUtil } from '../utils.js';
import { updateHash } from '../export.js';
import { getCode } from '../editor.js';

// ── UI 主题管理 ───────────────────────────────────────────────

/**
 * 应用 UI 主题（深色/浅色模式）
 * @param {boolean} dark - 是否为深色模式
 */
export function applyUiTheme(dark) {
  document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
  if (dom.iconSun) dom.iconSun.style.display = dark ? 'none' : '';
  if (dom.iconMoon) dom.iconMoon.style.display = dark ? '' : 'none';
  if (dom.iconSunQuick) dom.iconSunQuick.style.display = dark ? 'none' : '';
  if (dom.iconMoonQuick) dom.iconMoonQuick.style.display = dark ? '' : 'none';
  if (dom.uiThemeToggle) dom.uiThemeToggle.setAttribute('aria-pressed', dark ? 'true' : 'false');
  if (dom.uiThemeToggleQuick) dom.uiThemeToggleQuick.setAttribute('aria-pressed', dark ? 'true' : 'false');
}

/**
 * 切换深色/浅色 UI 模式
 */
export function toggleUiTheme() {
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  applyUiTheme(!isDark);
}

/**
 * 切换手绘风格开关，并更新 UI、保存偏好、重新渲染
 */
export function toggleHandDrawn() {
  state.handDrawn = !state.handDrawn;
  syncHandDrawnUI();
  saveHandDrawnPrefs();
  initMermaid();
  renderDiagram();
  updateHash(getCode());
}

/**
 * 同步手绘按钮 UI 状态
 */
export function syncHandDrawnUI() {
  if (dom.handDrawnBtn) {
    dom.handDrawnBtn.classList.toggle('active', state.handDrawn);
    dom.handDrawnBtn.setAttribute('aria-pressed', state.handDrawn ? 'true' : 'false');
  }
  if (dom.handDrawnToggleQuick) {
    dom.handDrawnToggleQuick.classList.toggle('active', state.handDrawn);
    dom.handDrawnToggleQuick.setAttribute('aria-pressed', state.handDrawn ? 'true' : 'false');
  }
}

/**
 * 切换 Mermaid 图表主题
 * @param {string} t - 主题名称 (default, forest, dark, neutral)
 */
export function switchTheme(t) {
  state.currentTheme = t;
  document.querySelectorAll('.theme-pill').forEach(p => {
    p.classList.remove('active');
    p.setAttribute('aria-checked', 'false');
  });
  const pill = document.querySelector('.theme-pill[data-theme="' + t + '"]');
  if (pill) { pill.classList.add('active'); pill.setAttribute('aria-checked', 'true'); }
  if (dom.themeSelect) dom.themeSelect.value = t;
  dom.menubar.querySelectorAll('[data-theme-pick]').forEach(b => {
    b.classList.toggle('active', b.getAttribute('data-theme-pick') === t);
  });
}

/**
 * 切换预览区域背景
 * @param {string} value - 背景类型 (white, black, checker, grid)
 */
export function switchPreviewBg(value) {
  state.previewBg = value;
  dom.previewViewport.classList.remove('bg-white', 'bg-black', 'bg-checker', 'bg-grid');
  dom.previewViewport.classList.add('bg-' + value);
  document.querySelectorAll('.bg-pill').forEach(b => {
    const v = b.getAttribute('data-bg');
    b.classList.toggle('active', v === value);
    b.setAttribute('aria-checked', v === value ? 'true' : 'false');
  });
  dom.menubar.querySelectorAll('[data-bg-menu]').forEach(b => {
    b.classList.toggle('active', b.getAttribute('data-bg-menu') === value);
  });
}

/**
 * 获取导出时的背景颜色
 */
export function getExportBgColor() {
  switch (state.previewBg) {
    case 'black': return '#1a1a1a';
    case 'checker': return 'transparent';
    case 'grid': return '#ffffff';
    default: return '#ffffff';
  }
}

/**
 * 打开帮助模态框
 */
export function openHelp() {
  openHelpUtil();
}

/**
 * 绑定预览区上方的 Mermaid 主题丸与背景色丸、以及工具栏快捷切换按钮
 */
export function initPreviewPills() {
  switchPreviewBg(state.previewBg);

  document.querySelectorAll('.theme-pill').forEach(p => {
    p.addEventListener('click', () => {
      const t = p.getAttribute('data-theme');
      if (t) {
        switchTheme(t);
        initMermaid();
        renderDiagram();
        updateHash(getCode());
      }
    });
  });

  document.querySelectorAll('.bg-pill').forEach(b => {
    b.addEventListener('click', () => {
      const v = b.getAttribute('data-bg');
      if (v) {
        switchPreviewBg(v);
        updateHash(getCode());
      }
    });
  });

  if (dom.handDrawnToggleQuick) {
    dom.handDrawnToggleQuick.addEventListener('click', toggleHandDrawn);
  }
  if (dom.uiThemeToggleQuick) {
    dom.uiThemeToggleQuick.addEventListener('click', toggleUiTheme);
  }
}
