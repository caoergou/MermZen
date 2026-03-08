import './styles/fonts.css';
import { state } from './modules/store';
import { initStateFromStorage } from './modules/state';
import { initEffects, syncAllUI } from './modules/effects';
import { updateEditorStatus, setRenderStatus, closeHelp, showToast } from './modules/utils';
import { applyUiTheme, initPreviewPills, switchPreviewBg, switchTheme, syncHandDrawnUI } from './modules/ui/theme';
import { applyI18n, syncLanguageUI } from './modules/i18n';
import { DEFAULT_CODE } from './modules/examples';
import { createEditor, scheduleLint, formatCode } from './modules/editor';
import { initMermaid, renderDiagram } from './modules/render';
import { getQueryCode, getHashCode, getHashState, getQueryState, updateHash, downloadPng, downloadSvg, copyPng } from './modules/export';
import { startTour } from './modules/tour';
import { initMenu } from './modules/ui/menu';
import { initContextMenu } from './modules/ui/context-menu';
import { initLayout } from './modules/ui/layout';
import { initZoom } from './modules/ui/zoom';
import { initMobileUI, switchMobileTab } from './modules/ui/mobile';
import { STRINGS } from './modules/i18n';
import { dom } from './modules/dom';

// ── 初始化 UI 主题 ───────────────────────────────────────────────────
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
applyUiTheme(prefersDark.matches);

// ── 初始化状态管理和副作用系统 ────────────────────────────────────────
initStateFromStorage();
initEffects();
syncAllUI();

// ── 初始化各个 UI 模块 ──────────────────────────────────────────────
initMenu();
initContextMenu();
initLayout();
initZoom();
initPreviewPills();
initMobileUI();

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
  const target = e.target as HTMLElement | null;
  const isInput = /^(INPUT|TEXTAREA|SELECT)$/.test(target?.tagName ?? '') || target?.isContentEditable;
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
async function bootstrap() {
  // 解析 URL 查询参数
  const urlParams = new URLSearchParams(location.search);
  const skipTourParam = urlParams.get('skipTour');
  const langParam = urlParams.get('lang');

  // 处理语言参数
  if (langParam && (langParam === 'zh' || langParam === 'en')) {
    state.currentLang = langParam;
    localStorage.setItem('mermzen-lang', langParam);
    syncLanguageUI(); // 同步语言按钮 UI 状态
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
  }, () => {
    // 编辑器创建完成后，更新状态并渲染图表
    updateEditorStatus();
    renderDiagram();
  });

  if (window.innerWidth <= 768) switchMobileTab('editor');

  // 检查是否跳过引导（通过 URL 参数或 localStorage）
  const shouldSkipTour = skipTourParam === '1' || skipTourParam === 'true' || localStorage.getItem('mermzen-tour-seen');
  if (!shouldSkipTour) {
    if (window.innerWidth <= 768) {
      // 移动端只显示语言选择
      setTimeout(() => {
        state.tourActive = true;
        dom.tourOverlay.style.display = 'block';
        dom.tourCurtainTop.style.cssText = 'top:0;left:0;right:0;bottom:0';
        dom.tourHighlight.style.cssText = 'display:none';
        dom.tourTitleEl.textContent = STRINGS[state.currentLang].tourLangTitle;
        dom.tourBodyEl.innerHTML = '<div class="tour-lang-picker"><button data-tour-lang="zh">中文</button><button data-tour-lang="en">English</button></div>';
        dom.tourSkip.style.display = 'none';
        dom.tourNext.style.display = 'none';
        document.querySelectorAll('[data-tour-lang]').forEach(btn => {
          btn.addEventListener('click', () => {
            const lang = btn.getAttribute('data-tour-lang') as 'zh' | 'en' | null;
            if (lang) state.currentLang = lang;
            localStorage.setItem('mermzen-lang', state.currentLang);
            applyI18n();
            state.tourActive = false;
            dom.tourOverlay.style.display = 'none';
            localStorage.setItem('mermzen-tour-seen', '1');
          });
        });
      }, 500);
    } else {
      setTimeout(startTour, 500);
    }
  }
}

bootstrap();
