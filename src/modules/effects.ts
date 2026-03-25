/**
 * MermZen Effects 模块
 *
 * 响应式副作用系统：当状态变化时自动触发相应的副作用
 * 包括：UI 同步、localStorage 持久化、图表渲染、URL 更新
 */

import {
  $handDrawnEnabled,
  $handDrawnFont,
  $handDrawnFontSize,
  $handDrawnSeedMode,
  $currentTheme,
  $previewBg,
  $currentLang,
  $handDrawnSeed,
  $handDrawnFontFamily,
  $handDrawnFontSizePx,
  saveHandDrawnPrefsToStorage,
  saveLangToStorage,
} from './state';

import { dom } from './dom';
import { STRINGS, applyI18n, syncLanguageUI } from './i18n';
import { renderExampleDropdown } from './ui/menu';
import { getCode } from './editor';

// 副作用订阅存储
const unsubscribers: (() => void)[] = [];

// 防抖定时器
let renderTimer: ReturnType<typeof setTimeout> | null = null;
let hashTimer: ReturnType<typeof setTimeout> | null = null;

// 防抖延迟常量
const RENDER_DEBOUNCE_MS = 150;
const HASH_DEBOUNCE_MS = 500;

// ═══════════════════════════════════════════════════════════════════════
// UI 同步副作用
// ═══════════════════════════════════════════════════════════════════════

/**
 * 同步手绘按钮 UI 状态
 */
function syncHandDrawnUI() {
  const enabled = $handDrawnEnabled.get();
  if (dom.handDrawnBtn) {
    dom.handDrawnBtn.classList.toggle('active', enabled);
    dom.handDrawnBtn.setAttribute('aria-pressed', enabled ? 'true' : 'false');
  }
  if (dom.handDrawnToggleQuick) {
    dom.handDrawnToggleQuick.classList.toggle('active', enabled);
    dom.handDrawnToggleQuick.setAttribute('aria-pressed', enabled ? 'true' : 'false');
  }
}

/**
 * 同步主题 UI 状态
 */
function syncThemeUI() {
  const theme = $currentTheme.get();
  const label = document.getElementById('theme-dropdown-label');
  if (label) {
    const s = STRINGS[$currentLang.get()];
    label.textContent = s['theme' + theme.charAt(0).toUpperCase() + theme.slice(1)];
  }
  document.querySelectorAll('.theme-dropdown__panel button').forEach(b => {
    b.classList.toggle('active', b.getAttribute('data-theme') === theme);
  });
  if (dom.themeSelect) {
    (dom.themeSelect as HTMLSelectElement | HTMLInputElement).value = theme;
  }
  dom.menubar.querySelectorAll('[data-theme-pick]').forEach(b => {
    b.classList.toggle('active', b.getAttribute('data-theme-pick') === theme);
  });
}

/**
 * 同步预览背景 UI 状态
 */
function syncPreviewBgUI() {
  const bg = $previewBg.get();
  dom.previewViewport.classList.remove('bg-white', 'bg-black', 'bg-checker', 'bg-grid');
  dom.previewViewport.classList.add('bg-' + bg);
  const swatch = document.getElementById('bg-dropdown-swatch');
  if (swatch) {
    swatch.className = 'bg-pill__swatch bg-pill__swatch--' + bg;
  }
  document.querySelectorAll('.bg-dropdown__panel button').forEach(b => {
    b.classList.toggle('active', b.getAttribute('data-bg') === bg);
  });
  dom.menubar.querySelectorAll('[data-bg-menu]').forEach(b => {
    b.classList.toggle('active', b.getAttribute('data-bg-menu') === bg);
  });
}

// ═══════════════════════════════════════════════════════════════════════
// 渲染和 URL 更新副作用
// ═══════════════════════════════════════════════════════════════════════

// 动态导入以避免循环依赖
let _initMermaid: (() => void) | null = null;
let _renderDiagram: (() => Promise<void>) | null = null;
let _updateHash: ((code: string) => void) | null = null;

async function getRenderFunctions() {
  if (!_initMermaid || !_renderDiagram) {
    const render = await import('./render');
    _initMermaid = render.initMermaid;
    _renderDiagram = render.renderDiagram;
  }
  if (!_updateHash) {
    const exp = await import('./export');
    _updateHash = exp.updateHash;
  }
}

/**
 * 安排图表重新渲染（防抖）
 */
async function scheduleRender() {
  await getRenderFunctions();
  if (renderTimer) clearTimeout(renderTimer);
  renderTimer = setTimeout(async () => {
    if (_initMermaid) _initMermaid();
    if (_renderDiagram) await _renderDiagram();
    renderTimer = null;
  }, RENDER_DEBOUNCE_MS);
}

async function scheduleHashUpdate() {
  await getRenderFunctions();
  if (hashTimer) clearTimeout(hashTimer);
  hashTimer = setTimeout(() => {
    if (_updateHash) _updateHash(getCode());
    hashTimer = null;
  }, HASH_DEBOUNCE_MS);
}

// ═══════════════════════════════════════════════════════════════════════
// 初始化副作用系统
// ═══════════════════════════════════════════════════════════════════════

export function initEffects() {
  // 手绘风格开关变化
  unsubscribers.push(
    $handDrawnEnabled.subscribe(() => {
      syncHandDrawnUI();
      saveHandDrawnPrefsToStorage();
      scheduleRender();
      scheduleHashUpdate();
    })
  );

  // 手绘字体变化
  unsubscribers.push(
    $handDrawnFont.subscribe(() => {
      saveHandDrawnPrefsToStorage();
      scheduleRender();
      scheduleHashUpdate();
    })
  );

  // 手绘字号变化
  unsubscribers.push(
    $handDrawnFontSize.subscribe(() => {
      saveHandDrawnPrefsToStorage();
      scheduleRender();
      scheduleHashUpdate();
    })
  );

  // 手绘随机种子模式变化
  unsubscribers.push(
    $handDrawnSeedMode.subscribe(() => {
      saveHandDrawnPrefsToStorage();
      scheduleHashUpdate();
    })
  );

  // 手绘随机种子变化
  unsubscribers.push(
    $handDrawnSeed.subscribe(() => {
      scheduleRender();
      scheduleHashUpdate();
    })
  );

  // 主题变化
  unsubscribers.push(
    $currentTheme.subscribe(() => {
      syncThemeUI();
      scheduleRender();
      scheduleHashUpdate();
    })
  );

  // 预览背景变化
  unsubscribers.push(
    $previewBg.subscribe(() => {
      syncPreviewBgUI();
      scheduleHashUpdate();
    })
  );

  // 语言变化
  unsubscribers.push(
    $currentLang.subscribe(() => {
      saveLangToStorage();
      syncLanguageUI();
      applyI18n();
      renderExampleDropdown();
    })
  );
}

/**
 * 清理副作用系统
 * 用于测试或卸载时调用
 */
export function cleanupEffects() {
  unsubscribers.forEach(fn => fn());
  unsubscribers.length = 0;
  if (renderTimer) clearTimeout(renderTimer);
  if (hashTimer) clearTimeout(hashTimer);
}

/**
 * 手动触发所有 UI 同步
 * 用于初始化时同步 UI 状态
 */
export function syncAllUI() {
  syncHandDrawnUI();
  syncThemeUI();
  syncPreviewBgUI();
  syncLanguageUI();
}
