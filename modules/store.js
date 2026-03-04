// ── 手绘字体预设配置（顺序即菜单与命令面板中的显示顺序）──────────────────────────────────────────
export const HAND_FONTS = {
  kalam:   { label: 'Kalam',   family: "'Kalam'",   url: null, cssUrl: 'https://fonts.googleapis.com/css2?family=Kalam:wght@400&display=swap' },
  virgil:  { label: 'Virgil',  family: "'Virgil'",  url: 'https://cdn.jsdelivr.net/gh/excalidraw/virgil/Virgil.woff2', cssUrl: null },
  caveat:  { label: 'Caveat',  family: "'Caveat'",  url: null, cssUrl: 'https://fonts.googleapis.com/css2?family=Caveat:wght@400&display=swap' },
};

/**
 * 加载手绘风格偏好设置
 */
function loadHandDrawnPrefs() {
  try {
    const raw = localStorage.getItem('mermzen-handdrawn');
    if (raw) return JSON.parse(raw);
  } catch (e) { /* 忽略错误 */ }
  return {};
}

const _hdPrefs = loadHandDrawnPrefs();

// ── 全局应用状态 ────────────────────────────────────────
export const state = {
  currentTheme: 'default',
  handDrawn: _hdPrefs.enabled !== false,
  handDrawnSeedMode: _hdPrefs.seedMode || 'fixed',
  handDrawnSeed: 42,
  handDrawnFont: (_hdPrefs.font && _hdPrefs.font !== 'xiaolai' && HAND_FONTS[_hdPrefs.font]) ? _hdPrefs.font : 'kalam',
  handDrawnFontSize: _hdPrefs.fontSize || 'medium',
  renderTimeout: null,
  renderCounter: 0,
  previewBg: 'white',
  editorView: null,
  menubarOpen: false,
  toastTimeout: null,
  currentLang: (() => {
    const saved = localStorage.getItem('mermzen-lang');
    if (saved && (saved === 'zh' || saved === 'en')) return saved;
    const browser = (navigator.language || 'en').toLowerCase();
    return browser.startsWith('zh') ? 'zh' : 'en';
  })(),
  tourActive: false, // 引导教程是否处于激活状态
  tourStep: 0,       // 当前引导步骤索引
};

/**
 * 保存手绘风格偏好设置到本地存储
 */
export function saveHandDrawnPrefs() {
  try {
    localStorage.setItem('mermzen-handdrawn', JSON.stringify({
      enabled: state.handDrawn,
      seedMode: state.handDrawnSeedMode,
      font: state.handDrawnFont,
      fontSize: state.handDrawnFontSize,
    }));
  } catch (e) { /* 忽略错误 */ }
}

/**
 * 获取当前手绘字体的 CSS font-family 字符串
 */
export function getHandDrawnFontFamily() {
  const preset = HAND_FONTS[state.handDrawnFont] || HAND_FONTS.kalam;
  return preset.family + ", 'Xiaolai SC', cursive";
}

/**
 * 获取当前手绘字体的像素大小
 */
export function getHandDrawnFontSizePx() {
  return state.handDrawnFontSize === 'small' ? '15px'
    : state.handDrawnFontSize === 'large' ? '20px' : '17px';
}

/**
 * 解析并获取当前的手绘随机种子
 */
export function resolveHandDrawnSeed() {
  if (state.handDrawnSeedMode === 'random') {
    state.handDrawnSeed = Math.floor(Math.random() * 10000);
  }
  return state.handDrawnSeed;
}

// ── 缩放和平移状态 ────────────────────────────────────────
export const pz = {
  scale: 1, tx: 0, ty: 0,
  dragging: false, startX: 0, startY: 0, startTx: 0, startTy: 0,
};

export const MIN_SCALE = 0.1;
export const MAX_SCALE = 8;
