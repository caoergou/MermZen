import { state } from './store';
import { actions } from './actions';
import { updateEditorStatus as updateEditorStatusUtil, formatShortcut, updateShortcutDisplays } from './utils';
import { renderExampleDropdown } from './ui/menu';

/**
 * 格式化引导步骤文本，替换快捷键占位符
 */
function formatTourStep(body: string): string {
  const shortcuts: Record<string, string> = {
    '{cmdShiftF}': formatShortcut('Ctrl+Shift+F'),
    '{cmdK}': formatShortcut('Ctrl+K'),
    '{alt14}': formatShortcut('Alt+1~4'),
    '{altFEVH}': [formatShortcut('Alt+F'), formatShortcut('Alt+E'), formatShortcut('Alt+V'), formatShortcut('Alt+H')].join('/'),
  };

  return body.replace(/\{(cmdShiftF|cmdK|alt14|altFEVH)\}/g, (match) => shortcuts[match] || match);
}

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
    ctxDownloadPng: '下载 PNG',
    ctxDownloadSvg: '下载 SVG',
    ctxCopyPng: '复制 PNG',
    ctxNoDiagram: '暂无图表',
    ctxFailed: '失败: ',
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
      { title: '代码编辑器', body: '在这里输入 Mermaid 代码，支持语法高亮、实时错误提示和自动格式化（{cmdShiftF}）。输入后图表会自动渲染。' },
      { title: '示例模板', body: '点击这里快速加载预置的图表模板——流程图、时序图、甘特图、ER 图等，一键填充代码开始编辑。' },
      { title: '实时预览', body: '图表实时渲染在这里。上方可直接切换 5 种主题和 4 种背景（{alt14}），下方可缩放和拖拽平移。' },
      { title: '菜单栏', body: '四大功能区：文件（导出/分享）、编辑（手绘风格/字体/字号）、视图（主题/背景/深色模式）、帮助（快捷键）。按 {altFEVH} 快速打开。' },
      { title: '命令面板', body: '按 {cmdK} 打开命令面板，搜索并快速执行任意操作：导出图片、切换主题、加载示例、格式化代码等。' },
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

    // 菜单翻译
    menuFile: '文件',
    menuEdit: '编辑',
    menuView: '视图',
    menuHelp: '帮助',
    menuDownloadPng: '下载 PNG',
    menuDownloadSvg: '下载 SVG',
    menuCopyPng: '复制 PNG',
    menuShareLink: '分享链接',
    menuEmbedCode: '嵌入代码',
    menuHanddrawn: '手绘风格',
    menuHanddrawnFont: '手绘字体 (英文)',
    menuHanddrawnSize: '手绘字号',
    menuHanddrawnRandom: '手绘随机',
    menuKalam: 'Kalam',
    menuVirgil: 'Virgil',
    menuCaveat: 'Caveat',
    menuHanddrawnFontHint: '中文默认使用小赖字体',
    menuSizeSmall: '小 (15px)',
    menuSizeMedium: '中 (17px)',
    menuSizeLarge: '大 (20px)',
    menuFixedLines: '固定线条',
    menuRandomLines: '随机线条',
    menuReshuffle: '刷新手绘',
    menuFormatCode: '格式化代码',
    menuToggleDarkLight: '深色/浅色模式',
    menuDiagramTheme: '图表主题',
    menuResetZoom: '重置缩放',
    menuPreviewBackground: '预览背景',
    menuMermaidTutorial: 'Mermaid 教程',
    menuShortcuts: '快捷键',
    menuCommandPalette: '命令面板',
    menuGithub: 'GitHub',
    menuRestartTour: '重新引导',
    menuLanguage: '语言',
    menuChinese: '中文',
    menuEnglish: 'English',
    tooltipLanguage: '切换语言',
    tooltipHanddrawn: '切换手绘风格',
    tooltipDarkLight: '切换深色/浅色模式',
    tooltipZoomOut: '缩小',
    tooltipZoomIn: '放大',
    tooltipZoomReset: '重置缩放',
    tooltipMoreOptions: '更多选项',

    // 命令面板翻译
    cmdExport: '导出',
    cmdShare: '分享',
    cmdView: '视图',
    cmdHelp: '帮助',
    cmdExamples: '示例',
    cmdTheme: '主题',
    cmdHanddrawn: '手绘',
    cmdEdit: '编辑',
    cmdBackground: '背景',
    cmdNoCommands: '无匹配命令',
    cmdPlaceholder: '输入命令或搜索...',
    cmdThemePrefix: '主题: ',
    cmdHandFontPrefix: '手绘字体: ',
    cmdBgWhite: '白色背景',
    cmdBgBlack: '黑色背景',
    cmdBgChecker: '透明背景',
    cmdBgGrid: '网格背景',
    cmdNav: '导航',
    cmdExec: '执行',
    cmdClose: '关闭',
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
    ctxDownloadPng: 'Download PNG',
    ctxDownloadSvg: 'Download SVG',
    ctxCopyPng: 'Copy PNG',
    ctxNoDiagram: 'No diagram',
    ctxFailed: 'Failed: ',
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
      { title: 'Code Editor', body: 'Write Mermaid code with syntax highlighting, real-time error hints, and auto-format ({cmdShiftF}). Diagrams render automatically as you type.' },
      { title: 'Examples', body: 'Click here to load preset diagram templates — flowcharts, sequence diagrams, Gantt charts, ER diagrams, and more.' },
      { title: 'Live Preview', body: 'Diagrams render here in real time. Switch between 5 themes and 4 backgrounds ({alt14}) above. Zoom and pan below.' },
      { title: 'Menu Bar', body: 'Four sections: File (export/share), Edit (hand-drawn style/fonts), View (themes/backgrounds/dark mode), Help (shortcuts). Press {altFEVH} to open.' },
      { title: 'Command Palette', body: 'Press {cmdK} to open the command palette. Search and run any action: export, switch themes, load examples, format code, and more.' },
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

    // 菜单翻译
    menuFile: 'File',
    menuEdit: 'Edit',
    menuView: 'View',
    menuHelp: 'Help',
    menuDownloadPng: 'Download PNG',
    menuDownloadSvg: 'Download SVG',
    menuCopyPng: 'Copy PNG',
    menuShareLink: 'Copy share link',
    menuEmbedCode: 'Copy embed code',
    menuHanddrawn: 'Hand-drawn style',
    menuHanddrawnFont: 'Hand-drawn font (English)',
    menuHanddrawnSize: 'Hand-drawn size',
    menuHanddrawnRandom: 'Hand-drawn random',
    menuKalam: 'Kalam',
    menuVirgil: 'Virgil',
    menuCaveat: 'Caveat',
    menuHanddrawnFontHint: 'Chinese uses Xiaolai font by default',
    menuSizeSmall: 'Small (15px)',
    menuSizeMedium: 'Medium (17px)',
    menuSizeLarge: 'Large (20px)',
    menuFixedLines: 'Fixed lines',
    menuRandomLines: 'Random lines',
    menuReshuffle: 'Reshuffle hand-drawn',
    menuFormatCode: 'Format code',
    menuToggleDarkLight: 'Toggle dark/light mode',
    menuDiagramTheme: 'Diagram theme',
    menuResetZoom: 'Reset zoom',
    menuPreviewBackground: 'Preview background',
    menuMermaidTutorial: 'Mermaid tutorial',
    menuShortcuts: 'Shortcuts',
    menuCommandPalette: 'Command palette',
    menuGithub: 'GitHub',
    menuRestartTour: 'Restart tour',
    menuLanguage: 'Language',
    menuChinese: '中文',
    menuEnglish: 'English',
    tooltipLanguage: 'Toggle language',
    tooltipHanddrawn: 'Toggle hand-drawn style',
    tooltipDarkLight: 'Toggle dark/light mode',
    tooltipZoomOut: 'Zoom out',
    tooltipZoomIn: 'Zoom in',
    tooltipZoomReset: 'Reset zoom',
    tooltipMoreOptions: 'More options',

    // 命令面板翻译
    cmdExport: 'Export',
    cmdShare: 'Share',
    cmdView: 'View',
    cmdHelp: 'Help',
    cmdExamples: 'Examples',
    cmdTheme: 'Theme',
    cmdHanddrawn: 'Hand-drawn',
    cmdEdit: 'Edit',
    cmdBackground: 'Background',
    cmdNoCommands: 'No matching commands',
    cmdPlaceholder: 'Type a command or search...',
    cmdThemePrefix: 'Theme: ',
    cmdHandFontPrefix: 'Hand font: ',
    cmdBgWhite: 'White background',
    cmdBgBlack: 'Black background',
    cmdBgChecker: 'Transparent background',
    cmdBgGrid: 'Grid background',
    cmdNav: 'Navigate',
    cmdExec: 'Execute',
    cmdClose: 'Close',
  },
};

export function applyI18n() {
  const s = STRINGS[state.currentLang];
  document.querySelectorAll('[data-i18n="editor"]').forEach(el => { el.textContent = s.editorPanel; });
  document.querySelectorAll('[data-i18n="preview"]').forEach(el => { el.textContent = s.previewPanel; });
  document.querySelectorAll('[data-i18n="previewPanel"]').forEach(el => { el.textContent = s.previewPanel; });

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

  // 菜单内容翻译
  const menuKeys = [
    'menuFile', 'menuEdit', 'menuView', 'menuHelp', 'menuDownloadPng', 'menuDownloadSvg',
    'menuCopyPng', 'menuShareLink', 'menuEmbedCode', 'menuHanddrawn', 'menuHanddrawnFont',
    'menuHanddrawnSize', 'menuHanddrawnRandom', 'menuKalam', 'menuVirgil', 'menuCaveat',
    'menuHanddrawnFontHint', 'menuSizeSmall', 'menuSizeMedium', 'menuSizeLarge',
    'menuFixedLines', 'menuRandomLines', 'menuReshuffle', 'menuFormatCode',
    'menuToggleDarkLight', 'menuDiagramTheme', 'menuResetZoom', 'menuPreviewBackground',
    'menuMermaidTutorial', 'menuShortcuts', 'menuCommandPalette', 'menuGithub', 'menuRestartTour',
    'menuLanguage', 'menuChinese', 'menuEnglish'
  ];

  menuKeys.forEach(key => {
    document.querySelectorAll(`[data-i18n="${key}"]`).forEach(el => {
      el.textContent = s[key];
    });
  });

  // 命令面板占位符翻译
  const cmdInput = document.getElementById('cmd-palette-input') as HTMLInputElement | null;
  if (cmdInput) {
    cmdInput.placeholder = s.cmdPlaceholder;
  }

  // 移动端菜单翻译
  const mobileMenuKeys = ['menuShareLink', 'menuDownloadPng', 'menuDownloadSvg', 'menuShortcuts'];
  mobileMenuKeys.forEach(key => {
    const element = document.querySelector(`#mobile-overflow-menu [data-i18n="${key}"]`);
    if (element) {
      element.textContent = s[key];
    }
  });

  // 命令面板按钮翻译
  const cmdPaletteQuick = document.querySelector('.btn-cmdk__text');
  if (cmdPaletteQuick) {
    cmdPaletteQuick.textContent = s.menuCommandPalette;
  }

  // 示例下拉菜单翻译
  const exampleDropdown = document.querySelector('#example-dropdown-trigger span');
  if (exampleDropdown) {
    exampleDropdown.textContent = s.cmdExamples;
  }

  // 命令面板底部提示翻译
  document.querySelectorAll('[data-i18n="cmdNav"]').forEach(el => { el.textContent = s.cmdNav; });
  document.querySelectorAll('[data-i18n="cmdExec"]').forEach(el => { el.textContent = s.cmdExec; });
  document.querySelectorAll('[data-i18n="cmdClose"]').forEach(el => { el.textContent = s.cmdClose; });

  // 工具栏按钮 tooltip 翻译
  const tooltipMap: Record<string, string> = {
    'hand-drawn-toggle-quick': s.tooltipHanddrawn,
    'ui-theme-toggle-quick': s.tooltipDarkLight,
    'lang-toggle-quick': s.tooltipLanguage,
    'btn-zoom-out': s.tooltipZoomOut,
    'btn-zoom-in': s.tooltipZoomIn,
    'btn-zoom-reset': s.tooltipZoomReset,
    'btn-mobile-more': s.tooltipMoreOptions,
  };
  for (const [id, title] of Object.entries(tooltipMap)) {
    const el = document.getElementById(id);
    if (el) el.title = title;
  }

  // 命令面板按钮 title（含快捷键）
  const btnCmdPaletteQuick = document.getElementById('btn-cmd-palette-quick');
  if (btnCmdPaletteQuick) {
    btnCmdPaletteQuick.title = `${s.menuCommandPalette} (${formatShortcut('Ctrl+K')})`;
  }

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
  updateShortcutDisplays();
}

/**
 * 切换语言
 * 副作用（localStorage 保存、UI 同步、i18n 应用）由 effects.ts 自动处理
 */
export function switchLanguage(lang: 'zh' | 'en') {
  actions.setLang(lang);
}

/**
 * 同步语言按钮 UI 状态
 */
export function syncLanguageUI() {
  // 更新 Help 菜单中的语言选项
  const menuLangZh = document.getElementById('menu-lang-zh');
  const menuLangEn = document.getElementById('menu-lang-en');
  if (menuLangZh) {
    menuLangZh.classList.toggle('active', state.currentLang === 'zh');
  }
  if (menuLangEn) {
    menuLangEn.classList.toggle('active', state.currentLang === 'en');
  }
}
