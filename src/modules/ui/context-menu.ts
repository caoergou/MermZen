import { dom as domEls } from '../dom';
import { copyPng, downloadSvg, downloadPng } from '../export';
import { showToast } from '../utils';
import { state } from '../store';
import { STRINGS } from '../i18n';

let ctxMenu = null;

/**
 * 隐藏上下文菜单
 */
export function hideCtxMenu() {
  if (ctxMenu) { ctxMenu.remove(); ctxMenu = null; }
}

/**
 * 显示上下文菜单
 * @param {number} x - 鼠标 X 坐标
 * @param {number} y - 鼠标 Y 坐标
 */
function showCtxMenu(x, y) {
  hideCtxMenu();
  const s = STRINGS[state.currentLang];
  const svgEl = domEls.preview.querySelector('svg');
  ctxMenu = document.createElement('div');
  ctxMenu.className = 'context-menu';

  function item(icon, label, action) {
    const btn = document.createElement('button');
    btn.className = 'context-menu__item';
    btn.innerHTML = icon + '<span>' + label + '</span>';
    btn.addEventListener('click', () => { hideCtxMenu(); action(); });
    return btn;
  }
  function sep() { const d = document.createElement('div'); d.className = 'context-menu__sep'; return d; }

  const iconDl = '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>';
  const iconCopy = '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>';

  if (svgEl) {
    ctxMenu.appendChild(item(iconDl, s.ctxDownloadPng, () => { downloadPng().catch(e => { showToast(s.ctxFailed + e.message); }); }));
    ctxMenu.appendChild(item(iconDl, s.ctxDownloadSvg, () => { downloadSvg().catch(e => { showToast(s.ctxFailed + e.message); }); }));
    ctxMenu.appendChild(sep());
    ctxMenu.appendChild(item(iconCopy, s.ctxCopyPng, () => { copyPng().catch(e => { showToast(s.ctxFailed + e.message); }); }));
  } else {
    const empty = document.createElement('div');
    empty.className = 'context-menu__label';
    empty.textContent = s.ctxNoDiagram;
    ctxMenu.appendChild(empty);
  }

  document.body.appendChild(ctxMenu);
  const mw = ctxMenu.offsetWidth, mh = ctxMenu.offsetHeight;
  const vw = window.innerWidth, vh = window.innerHeight;
  ctxMenu.style.left = Math.min(x, vw - mw - 8) + 'px';
  ctxMenu.style.top  = Math.min(y, vh - mh - 8) + 'px';
}

/**
 * 初始化上下文菜单逻辑
 */
export function initContextMenu() {
  domEls.previewViewport.addEventListener('contextmenu', e => {
    e.preventDefault();
    showCtxMenu(e.clientX, e.clientY);
  });
  document.addEventListener('click', () => { hideCtxMenu(); });
}
