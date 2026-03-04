import { state } from './modules/store.js';
import { updateEditorStatus, setRenderStatus, closeHelp, showToast } from './modules/utils.js';
import { applyUiTheme, initPreviewPills, switchPreviewBg, switchTheme, syncHandDrawnUI } from './modules/ui/theme.js';
import { applyI18n } from './modules/i18n.js';
import { DEFAULT_CODE } from './modules/examples.js';
import { createEditor, scheduleLint, formatCode } from './modules/editor.js';
import { initMermaid, renderDiagram } from './modules/render.js';
import { getQueryCode, getHashCode, getHashState, getQueryState, updateHash, downloadPng, downloadSvg, copyPng } from './modules/export.js';
import { startTour } from './modules/tour.js';
import { initMenu } from './modules/ui/menu.js';
import { initContextMenu } from './modules/ui/context-menu.js';
import { initLayout } from './modules/ui/layout.js';
import { initZoom } from './modules/ui/zoom.js';
import { initMobileUI, switchMobileTab } from './modules/ui/mobile.js';
import { STRINGS } from './modules/i18n.js';

// ── 初始化 UI 主题 ───────────────────────────────────────────────────
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
applyUiTheme(prefersDark.matches);

// ── 初始化各个 UI 模块 ──────────────────────────────────────────────
initMenu();
initContextMenu();
initLayout();
initZoom();
initPreviewPills();
initMobileUI();
syncHandDrawnUI();

// 帮助弹窗：关闭按钮、确定按钮、重新引导、点击遮罩关闭
const helpModal = document.getElementById('help-modal');
if (helpModal) helpModal.addEventListener('click', e => { if (e.target === helpModal) closeHelp(); });
if (document.getElementById('modal-close')) document.getElementById('modal-close').addEventListener('click', closeHelp);
if (document.getElementById('modal-ok')) document.getElementById('modal-ok').addEventListener('click', closeHelp);
const btnRestartTour = document.getElementById('btn-restart-tour');
if (btnRestartTour) btnRestartTour.addEventListener('click', () => { startTour(); closeHelp(); });

// ── 保存对话框 (Ctrl+S) ─────────────────────────────────────────────
const saveDialog = document.getElementById('save-dialog');
function openSaveDialog() {
  if (saveDialog) saveDialog.classList.add('open');
}
function closeSaveDialog() {
  if (saveDialog) saveDialog.classList.remove('open');
}
if (saveDialog) {
  saveDialog.addEventListener('click', e => { if (e.target === saveDialog) closeSaveDialog(); });
  const saveDialogClose = document.getElementById('save-dialog-close');
  if (saveDialogClose) saveDialogClose.addEventListener('click', closeSaveDialog);
  const saveDialogPng = document.getElementById('save-dialog-png');
  if (saveDialogPng) saveDialogPng.addEventListener('click', () => {
    downloadPng().catch(e => { showToast((STRINGS[state.currentLang]?.toastFailed || 'Failed') + ': ' + e.message); });
    closeSaveDialog();
  });
  const saveDialogSvg = document.getElementById('save-dialog-svg');
  if (saveDialogSvg) saveDialogSvg.addEventListener('click', () => {
    downloadSvg();
    closeSaveDialog();
  });
}

// ── 全局快捷键 ─────────────────────────────────────────────────────
document.addEventListener('keydown', e => {
  const isInput = /^(INPUT|TEXTAREA|SELECT)$/.test(e.target?.tagName) || e.target?.isContentEditable;
  const mod = e.ctrlKey || e.metaKey;
  if (mod && e.key === 's') {
    e.preventDefault();
    openSaveDialog();
    return;
  }
  if (mod && e.shiftKey && e.key === 'C') {
    e.preventDefault();
    if (!isInput) copyPng().catch(err => showToast((STRINGS[state.currentLang]?.toastFailed || 'Failed') + ': ' + err.message));
    return;
  }
  if (mod && e.shiftKey && e.key === 'F') {
    e.preventDefault();
    if (!isInput) formatCode();
    return;
  }
  if (e.altKey && ['1','2','3','4'].includes(e.key)) {
    const bgMap = { '1': 'white', '2': 'black', '3': 'checker', '4': 'grid' };
    switchPreviewBg(bgMap[e.key]);
  }
});

// ── 引导程序 ───────────────────────────────────────────────────────
function bootstrap() {
  if (typeof mermaid === 'undefined') {
    setTimeout(bootstrap, 50);
    return;
  }

  const urlState = getHashState() || getQueryState();
  if (urlState && urlState.settings) {
    const s = urlState.settings;
    if (s.t) state.currentTheme = s.t;
    if (s.hd === false) state.handDrawn = false;
    if (s.hdf) state.handDrawnFont = s.hdf;
    if (s.hds) state.handDrawnFontSize = s.hds;
    if (s.hdm) state.handDrawnSeedMode = s.hdm;
    if (s.bg) state.previewBg = s.bg;
  }

  initMermaid();
  applyI18n();

  // 同步 UI 状态（如果从 URL 恢复了设置）
  if (urlState && urlState.settings) {
    const s = urlState.settings;
    if (s.t) switchTheme(s.t);
    if (s.bg) switchPreviewBg(s.bg);
  }

  const savedCode = (() => { try { return localStorage.getItem('mermzen-code'); } catch (e) { return null; } })();
  const initialCode = urlState?.code || savedCode || DEFAULT_CODE;

  createEditor(initialCode, doc => {
    updateEditorStatus();
    updateHash(doc);
    scheduleLint();
    setRenderStatus('rendering', '...');
    clearTimeout(state.renderTimeout);
    state.renderTimeout = setTimeout(renderDiagram, 300);
  });

  updateEditorStatus();
  renderDiagram();

  if (window.innerWidth <= 768) switchMobileTab('editor');
  if (!localStorage.getItem('mermzen-tour-seen')) {
    setTimeout(startTour, 500);
  }
}

bootstrap();
