import { state, HAND_FONTS } from './store';
import { dom } from './dom';
import { showToast, openHelp, formatShortcut } from './utils';
import { STRINGS } from './i18n';
import { EXAMPLES_ZH, EXAMPLES_EN } from './examples';
import { downloadPng, downloadSvg, copyPng, copyShareLink, copyEmbedCode } from './export';
import { formatCode } from './editor';
import { closeAllMenus } from './ui/menu';
import { resetView } from './ui/zoom';
import { applyUiTheme, switchTheme, switchPreviewBg } from './ui/theme';
import { actions } from './actions';

const cmdOverlay = document.getElementById('cmd-palette-overlay');
const cmdInput   = document.getElementById('cmd-palette-input') as HTMLInputElement;
const cmdList    = document.getElementById('cmd-palette-list');

let cmdActiveIdx = 0;
let cmdFiltered = [];

const CMD_ICONS = {
  download: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>',
  copy: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>',
  share: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>',
  theme: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>',
  pencil: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 17c3-3 6-5 9-5s6 2 9 5"/><path d="M3 7c3 3 6 5 9 5s6-2 9-5"/></svg>',
  example: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>',
  help: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>',
  zoom: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>',
  github: '<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844a9.59 9.59 0 012.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>',
};

function getCmdCommands() {
  const s = STRINGS[state.currentLang];
  const cmds = [
    { group: s.cmdExport, label: s.menuDownloadPng, icon: 'download', action() { downloadPng().catch(e => { showToast(s.toastFailed + ': ' + e.message); }); } },
    { group: s.cmdExport, label: s.menuDownloadSvg, icon: 'download', action() { downloadSvg().catch(e => { showToast(s.toastFailed + ': ' + e.message); }); } },
    { group: s.cmdExport, label: s.menuCopyPng, icon: 'copy', kbd: formatShortcut('Ctrl+Shift+C'), action() { copyPng().catch(e => { showToast(s.toastFailed + ': ' + e.message); }); } },
    { group: s.cmdShare, label: s.menuShareLink, icon: 'share', action() { copyShareLink().catch(e => { showToast(s.toastFailed + ': ' + e.message); }); } },
    { group: s.cmdView, label: s.menuToggleDarkLight, icon: 'theme', action() { const isDark = document.documentElement.getAttribute('data-theme') === 'dark'; applyUiTheme(!isDark); } },
    { group: s.cmdView, label: s.menuHanddrawn, icon: 'pencil', action() { actions.toggleHandDrawn(); } },
    { group: s.cmdView, label: s.menuResetZoom, icon: 'zoom', action: resetView },
    { group: s.cmdShare, label: s.menuEmbedCode, icon: 'share', action() { copyEmbedCode().catch(e => { showToast(s.toastFailed + ': ' + e.message); }); } },
    { group: s.cmdHelp, label: s.menuShortcuts, icon: 'help', action: openHelp },
    { group: s.cmdHelp, label: s.menuGithub, icon: 'github', action() { window.open('https://github.com/caoergou/MermZen', '_blank'); } },
  ];

  const examples = state.currentLang === 'zh' ? EXAMPLES_ZH : EXAMPLES_EN;
  examples.forEach(ex => {
    cmds.push({
      group: s.cmdExamples,
      label: ex.label,
      icon: 'example',
      action() { if (state.editorView) state.editorView.dispatch({ changes: { from: 0, to: state.editorView.state.doc.length, insert: ex.code } }); },
    });
  });

  ['default', 'dark', 'forest', 'neutral', 'base'].forEach(t => {
    cmds.push({
      group: s.cmdTheme,
      label: s.cmdThemePrefix + t.charAt(0).toUpperCase() + t.slice(1),
      icon: 'theme',
      action() { switchTheme(t); },
    });
  });

  Object.keys(HAND_FONTS).forEach(key => {
    cmds.push({
      group: s.cmdHanddrawn,
      label: s.cmdHandFontPrefix + HAND_FONTS[key].label,
      icon: 'pencil',
      action() { actions.setHandDrawnFont(key as 'kalam' | 'virgil' | 'caveat'); },
    });
  });

  cmds.push({
    group: s.cmdHanddrawn,
    label: s.menuReshuffle,
    icon: 'pencil',
    action() { actions.reshuffleHandDrawn(); },
  });

  cmds.push({
    group: s.cmdEdit,
    label: s.menuFormatCode,
    icon: 'example',
    kbd: formatShortcut('Ctrl+Shift+F'),
    action() { formatCode(); },
  });

  const bgLabels = {
    white: s.cmdBgWhite,
    black: s.cmdBgBlack,
    checker: s.cmdBgChecker,
    grid: s.cmdBgGrid,
  };
  const bgKeys = { white: 'Alt+1', black: 'Alt+2', checker: 'Alt+3', grid: 'Alt+4' };
  Object.keys(bgLabels).forEach(key => {
    cmds.push({
      group: s.cmdBackground,
      label: bgLabels[key],
      icon: 'example',
      kbd: bgKeys[key],
      action() { switchPreviewBg(key); },
    });
  });

  return cmds;
}

function renderCmdList() {
  cmdList.innerHTML = '';
  if (cmdFiltered.length === 0) {
    cmdList.innerHTML = '<div class="cmd-palette__empty">' + STRINGS[state.currentLang].cmdNoCommands + '</div>';
    return;
  }
  let lastGroup = '';
  cmdFiltered.forEach((cmd, i) => {
    if (cmd.group !== lastGroup) {
      lastGroup = cmd.group;
      const groupEl = document.createElement('div');
      groupEl.className = 'cmd-palette__group-label';
      groupEl.textContent = cmd.group;
      cmdList.appendChild(groupEl);
    }
    const item = document.createElement('button');
    item.className = 'cmd-palette__item' + (i === cmdActiveIdx ? ' active' : '');
    item.innerHTML = (CMD_ICONS[cmd.icon] || '') +
      '<span class="cmd-palette__item-label">' + cmd.label + '</span>' +
      (cmd.kbd ? '<span class="cmd-palette__item-kbd">' + cmd.kbd.split('+').map(k => '<kbd>' + k + '</kbd>').join('') + '</span>' : '');
    item.addEventListener('click', () => { closeCmdPalette(); cmd.action(); });
    item.addEventListener('mouseenter', () => { cmdActiveIdx = i; highlightCmdItem(); });
    cmdList.appendChild(item);
  });
}

function highlightCmdItem() {
  const items = cmdList.querySelectorAll('.cmd-palette__item');
  items.forEach((el, i) => { el.classList.toggle('active', i === cmdActiveIdx); });
  if (items[cmdActiveIdx]) items[cmdActiveIdx].scrollIntoView({ block: 'nearest' });
}

function filterCmdCommands(q) {
  const allCmds = getCmdCommands();
  if (!q) { cmdFiltered = allCmds; } else {
    const lower = q.toLowerCase();
    cmdFiltered = allCmds.filter(c =>
      c.label.toLowerCase().indexOf(lower) !== -1 ||
      c.group.toLowerCase().indexOf(lower) !== -1 ||
      (c.kbd && c.kbd.toLowerCase().indexOf(lower) !== -1)
    );
  }
  cmdActiveIdx = 0;
  renderCmdList();
}

export function openCmdPalette() {
  cmdOverlay.classList.add('open');
  cmdInput.value = '';
  filterCmdCommands('');
  setTimeout(() => { cmdInput.focus(); }, 50);
}

export function closeCmdPalette() {
  cmdOverlay.classList.remove('open');
  if (state.editorView) state.editorView.focus();
}

// ── Command palette event bindings ──────────────────────────────────
document.addEventListener('keydown', e => {
  if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
    e.preventDefault();
    if (cmdOverlay.classList.contains('open')) closeCmdPalette();
    else openCmdPalette();
  }
});
cmdOverlay.addEventListener('click', e => { if (e.target === cmdOverlay) closeCmdPalette(); });
cmdInput.addEventListener('input', () => { filterCmdCommands(cmdInput.value.trim()); });
cmdInput.addEventListener('keydown', e => {
  if (e.key === 'ArrowDown') { e.preventDefault(); cmdActiveIdx = Math.min(cmdActiveIdx + 1, cmdFiltered.length - 1); highlightCmdItem(); }
  else if (e.key === 'ArrowUp') { e.preventDefault(); cmdActiveIdx = Math.max(cmdActiveIdx - 1, 0); highlightCmdItem(); }
  else if (e.key === 'Enter') { e.preventDefault(); if (cmdFiltered[cmdActiveIdx]) { closeCmdPalette(); cmdFiltered[cmdActiveIdx].action(); } }
  else if (e.key === 'Escape') { closeCmdPalette(); }
});
