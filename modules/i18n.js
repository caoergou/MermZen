import { state } from './store.js';
import { updateEditorStatus as updateEditorStatusUtil } from './utils.js';

export const STRINGS = {
  zh: {
    editorPanel: '编辑器',
    previewPanel: '预览',
    themeLabel: '主题',
    handdrawnLabel: '手绘',
    copysvg: '复制 SVG',
    copypng: '复制 PNG',
    share: '分享',
    toastEmbedCopied: '嵌入代码已复制',
    exportbg: '背景',
    bgWhite: '白色',
    bgBlack: '黑色',
    bgChecker: '透明',
    bgGrid: '网格',
    themeDefault: '默认',
    themeDark: '暗黑',
    themeForest: '森林',
    themeNeutral: '中性',
    themeBase: '基础',
    renderingStatus: '渲染中...',
    renderOk: '✓ 完成',
    renderError: '✗ 错误',
    toastCopied: 'SVG 已复制',
    toastCopiedPng: 'PNG 已复制',
    toastDownloadSvg: 'SVG 已下载',
    toastDownloadPng: 'PNG 已下载',
    toastLinkCopied: '链接已复制',
    toastNoDiagram: '没有可操作的图表',
    toastFailed: '操作失败',
    editorStatusTpl(lines, chars) { return lines + ' 行 · ' + chars + ' 字符'; },
    modalTitle: '快捷键',
    modalSectionFile: '文件操作',
    modalSectionEdit: '编辑',
    modalSectionMenu: '菜单',
    modalSectionBg: '预览背景',
    modalRestartTour: '重新引导',
    modalClose: '关闭',
    tourSkip: '跳过',
    tourNext: '下一步 →',
    tourDone: '完成 ✓',
    tourLangTitle: '选择语言',
    tourLangBody: '请选择您偏好的界面语言。\nPlease choose your preferred language.',
    tourSteps: [
      { title: '代码编辑器', body: '在这里输入 Mermaid 代码，支持语法高亮、实时错误提示和自动格式化（Ctrl+Shift+F）。输入后图表会自动渲染。' },
      { title: '示例模板', body: '点击这里快速加载预置的图表模板——流程图、时序图、甘特图、ER 图等，一键填充代码开始编辑。' },
      { title: '实时预览', body: '图表实时渲染在这里。上方可直接切换 5 种主题和 4 种背景（Alt+1~4），下方可缩放和拖拽平移。' },
      { title: '菜单栏', body: '四大功能区：文件（导出/分享）、编辑（手绘风格/字体/字号）、视图（主题/背景/深色模式）、帮助（快捷键）。按 Alt+F/E/V/H 快速打开。' },
      { title: '命令面板', body: '按 Ctrl+K 打开命令面板，搜索并快速执行任意操作：导出图片、切换主题、加载示例、格式化代码等。' },
    ],
    shortcutSave: '保存图表 (选择格式)',
    shortcutCopyPng: '复制 PNG',
    shortcutCmdPalette: '命令面板',
    shortcutFormat: '格式化代码',
    errorSyntax: '语法错误',
    errorLine: '第 {n} 行',
    errorTip: '修复代码后将自动重新渲染',
    errorDismiss: '关闭',
    placeholderMain: '在左侧输入 Mermaid 代码，图表将实时显示在这里',
  },
  en: {
    editorPanel: 'Editor',
    previewPanel: 'Preview',
    themeLabel: 'Theme',
    handdrawnLabel: 'Hand-drawn',
    copysvg: 'Copy SVG',
    copypng: 'Copy PNG',
    share: 'Share',
    toastEmbedCopied: 'Embed code copied',
    exportbg: 'BG',
    bgWhite: 'White',
    bgBlack: 'Black',
    bgChecker: 'Transparent',
    bgGrid: 'Grid',
    themeDefault: 'Default',
    themeDark: 'Dark',
    themeForest: 'Forest',
    themeNeutral: 'Neutral',
    themeBase: 'Base',
    renderingStatus: 'Rendering...',
    renderOk: '✓ OK',
    renderError: '✗ Error',
    toastCopied: 'SVG copied',
    toastCopiedPng: 'PNG copied',
    toastDownloadSvg: 'SVG downloaded',
    toastDownloadPng: 'PNG downloaded',
    toastLinkCopied: 'Link copied',
    toastNoDiagram: 'No diagram to act on',
    toastFailed: 'Operation failed',
    editorStatusTpl(lines, chars) { return lines + ' lines · ' + chars + ' chars'; },
    modalTitle: 'Shortcuts',
    modalSectionFile: 'File',
    modalSectionEdit: 'Edit',
    modalSectionMenu: 'Menu',
    modalSectionBg: 'Background',
    modalRestartTour: 'Restart Tour',
    modalClose: 'Close',
    tourSkip: 'Skip',
    tourNext: 'Next →',
    tourDone: 'Done ✓',
    tourLangTitle: 'Choose Language',
    tourLangBody: 'Please choose your preferred language.',
    tourSteps: [
      { title: 'Code Editor', body: 'Write Mermaid code with syntax highlighting, real-time error hints, and auto-format (Ctrl+Shift+F). Diagrams render automatically as you type.' },
      { title: 'Examples', body: 'Click here to load preset diagram templates — flowcharts, sequence diagrams, Gantt charts, ER diagrams, and more.' },
      { title: 'Live Preview', body: 'Diagrams render here in real time. Switch between 5 themes and 4 backgrounds (Alt+1~4) above. Zoom and pan below.' },
      { title: 'Menu Bar', body: 'Four sections: File (export/share), Edit (hand-drawn style/fonts), View (themes/backgrounds/dark mode), Help (shortcuts). Press Alt+F/E/V/H to open.' },
      { title: 'Command Palette', body: 'Press Ctrl+K to open the command palette. Search and run any action: export, switch themes, load examples, format code, and more.' },
    ],
    shortcutSave: 'Save Diagram (choose format)',
    shortcutCopyPng: 'Copy PNG',
    shortcutCmdPalette: 'Command Palette',
    shortcutFormat: 'Format Code',
    errorSyntax: 'Syntax Error',
    errorLine: 'Line {n}',
    errorTip: 'Fix the code above and it will re-render automatically',
    errorDismiss: 'Dismiss',
    placeholderMain: 'Type Mermaid code on the left, the diagram renders here in real time',
  },
};

export function applyI18n() {
  const s = STRINGS[state.currentLang];
  document.querySelectorAll('[data-i18n="editor"]').forEach(el => { el.textContent = s.editorPanel; });
  document.querySelectorAll('[data-i18n="preview"]').forEach(el => { el.textContent = s.previewPanel; });

  // 主题下拉框
  document.querySelectorAll('[data-i18n-theme]').forEach(el => {
    const theme = el.getAttribute('data-i18n-theme');
    el.textContent = s['theme' + theme.charAt(0).toUpperCase() + theme.slice(1)];
  });
  const themeLabel = document.getElementById('theme-dropdown-label');
  if (themeLabel) themeLabel.textContent = s['theme' + state.currentTheme.charAt(0).toUpperCase() + state.currentTheme.slice(1)];

  // 背景下拉框
  document.querySelectorAll('[data-i18n-bg]').forEach(el => {
    const bg = el.getAttribute('data-i18n-bg');
    el.textContent = s['bg' + bg.charAt(0).toUpperCase() + bg.slice(1)];
  });

  document.getElementById('modal-title').textContent = s.modalTitle;
  const sectionH3s = document.querySelectorAll('.help-section h3');
  const sectionKeys = ['modalSectionFile', 'modalSectionEdit', 'modalSectionMenu', 'modalSectionBg'];
  sectionH3s.forEach((h3, i) => { if (sectionKeys[i]) h3.textContent = s[sectionKeys[i]]; });
  document.getElementById('btn-restart-tour').textContent = s.modalRestartTour;
  document.getElementById('modal-ok').textContent = s.modalClose;
  const tds = document.querySelectorAll('.help-table td:first-child');
  const keys = ['shortcutSave', 'shortcutCopyPng', 'shortcutFormat', 'shortcutCmdPalette'];
  tds.forEach((td, i) => { if (keys[i]) td.textContent = s[keys[i]]; });
  updateEditorStatusUtil();
  if (typeof window.renderExampleDropdown === 'function') {
    window.renderExampleDropdown();
  }
}
