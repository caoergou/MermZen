import { dom } from '../dom';
import { state } from '../store';
import { actions } from '../actions';
import { openHelp as openHelpUtil } from '../utils';

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
 * 切换手绘风格开关
 * 副作用（UI 同步、保存偏好、重新渲染、URL 更新）由 effects.ts 自动处理
 */
export function toggleHandDrawn() {
  actions.toggleHandDrawn();
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
 * 副作用（UI 同步、重新渲染、URL 更新）由 effects.ts 自动处理
 * @param {string} t - 主题名称 (default, forest, dark, neutral)
 */
export function switchTheme(t) {
  actions.setTheme(t);
}

/**
 * 切换预览区域背景
 * 副作用（UI 同步、URL 更新）由 effects.ts 自动处理
 * @param {string} value - 背景类型 (white, black, checker, grid)
 */
export function switchPreviewBg(value) {
  actions.setPreviewBg(value);
}

/**
 * 获取导出时的背景颜色
 */
export function getExportBgColor() {
  switch (state.previewBg) {
    case 'black': return '#1a1a1a';
    case 'checker': return 'transparent';
    case 'grid': return 'grid';
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
 * 动态定位下拉框，确保不超出视口
 */
function positionDropdown(trigger: HTMLElement, panel: HTMLElement) {
  const rect = trigger.getBoundingClientRect();
  // 计算下拉框的位置，确保不超出视口
  const top = rect.bottom + 4;
  let left = rect.left;

  // 检查右侧是否超出视口
  if (left + panel.offsetWidth > window.innerWidth - 8) {
    left = Math.max(8, window.innerWidth - panel.offsetWidth - 8);
  }

  // 检查左侧是否超出视口
  if (left < 8) {
    left = 8;
  }

  panel.style.top = top + 'px';
  panel.style.left = left + 'px';
}

/**
 * 绑定预览区上方的 Mermaid 主题与背景色下拉框、以及工具栏快捷切换按钮
 * 副作用由 effects.ts 自动处理
 */
export function initPreviewPills() {
  // 背景下拉框
  const bgDropdown = document.getElementById('bg-dropdown');
  const bgTrigger = document.getElementById('bg-dropdown-trigger');
  const bgPanel = document.getElementById('bg-dropdown-panel');
  if (bgTrigger && bgPanel) {
    bgTrigger.addEventListener('click', (e) => {
      e.stopPropagation();
      const wasOpen = bgDropdown.classList.contains('open');
      bgDropdown.classList.toggle('open');
      if (!wasOpen) {
        positionDropdown(bgTrigger, bgPanel);
      }
    });
    bgPanel.querySelectorAll('button').forEach(btn => {
      btn.addEventListener('click', () => {
        const v = btn.getAttribute('data-bg');
        if (v) {
          switchPreviewBg(v);
          bgDropdown.classList.remove('open');
        }
      });
    });
  }

  // 主题下拉框
  const themeDropdown = document.getElementById('theme-dropdown');
  const themeTrigger = document.getElementById('theme-dropdown-trigger');
  const themePanel = document.getElementById('theme-dropdown-panel');
  if (themeTrigger && themePanel) {
    themeTrigger.addEventListener('click', (e) => {
      e.stopPropagation();
      const wasOpen = themeDropdown.classList.contains('open');
      themeDropdown.classList.toggle('open');
      if (!wasOpen) {
        positionDropdown(themeTrigger, themePanel);
      }
    });
    themePanel.querySelectorAll('button').forEach(btn => {
      btn.addEventListener('click', () => {
        const t = btn.getAttribute('data-theme');
        if (t) {
          switchTheme(t);
          themeDropdown.classList.remove('open');
        }
      });
    });
  }

  // 点击外部关闭下拉框
  document.addEventListener('click', e => {
    if (themeDropdown && !themeDropdown.contains(e.target as Node)) themeDropdown.classList.remove('open');
    if (bgDropdown && !bgDropdown.contains(e.target as Node)) bgDropdown.classList.remove('open');
  });

  if (dom.handDrawnToggleQuick) {
    dom.handDrawnToggleQuick.addEventListener('click', toggleHandDrawn);
  }
  if (dom.uiThemeToggleQuick) {
    dom.uiThemeToggleQuick.addEventListener('click', toggleUiTheme);
  }
}
