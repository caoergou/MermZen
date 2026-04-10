/**
 * MermZen 状态管理模块
 *
 * 使用 nanostores 作为响应式状态管理库
 * 所有状态变更都会自动触发相应的副作用（通过 effects.ts）
 */

import { atom, computed } from 'nanostores';

// ── 导入本地字体文件 ────────────────────────────────────────────────────────
import kalamWoff2 from '@fontsource/kalam/files/kalam-latin-400-normal.woff2?url';
import caveatWoff2 from '@fontsource/caveat/files/caveat-latin-400-normal.woff2?url';
import caveatCyrillicWoff2 from '@fontsource/caveat/files/caveat-cyrillic-400-normal.woff2?url';

// ── 手绘字体预设配置（顺序即菜单与命令面板中的显示顺序）──────────────────────────────────────────
export const HAND_FONTS = {
  kalam:   { label: 'Kalam',   family: "'Kalam'",   url: kalamWoff2 as string, cyrillicUrl: null as null },
  virgil:  { label: 'Virgil',  family: "'Virgil'",  url: '/fonts/Virgil.woff2', cyrillicUrl: null as null },
  caveat:  { label: 'Caveat',  family: "'Caveat'",  url: caveatWoff2 as string, cyrillicUrl: caveatCyrillicWoff2 as string },
} as const;

// ── 类型定义 ──────────────────────────────────────────────────────────────
export type FontKey = keyof typeof HAND_FONTS;
export type SeedMode = 'fixed' | 'random';
export type FontSize = 'small' | 'medium' | 'large';
export type PreviewBg = 'white' | 'black' | 'checker' | 'grid';
export type Lang = 'zh' | 'en';
export type Theme = 'default' | 'dark' | 'forest' | 'neutral' | 'base';

// ── 持久化状态（需要 localStorage）──────────────────────────────────────

/**
 * 手绘风格开关
 */
export const $handDrawnEnabled = atom<boolean>(true);

/**
 * 手绘字体
 */
export const $handDrawnFont = atom<FontKey>('kalam');

/**
 * 手绘字号
 */
export const $handDrawnFontSize = atom<FontSize>('medium');

/**
 * 手绘随机种子模式
 */
export const $handDrawnSeedMode = atom<SeedMode>('fixed');

/**
 * 当前语言
 */
export const $currentLang = atom<Lang>('zh');

// ── 运行时状态（URL hash 同步）──────────────────────────────────────────

/**
 * Mermaid 图表主题
 */
export const $currentTheme = atom<Theme>('default');

/**
 * 预览区背景
 */
export const $previewBg = atom<PreviewBg>('white');

/**
 * 手绘随机种子
 */
export const $handDrawnSeed = atom<number>(42);

// ── UI 状态（无需持久化）────────────────────────────────────────────────

/**
 * 菜单栏打开状态
 */
export const $menubarOpen = atom<boolean>(false);

/**
 * 引导教程激活状态
 */
export const $tourActive = atom<boolean>(false);

/**
 * 引导步骤索引
 */
export const $tourStep = atom<number>(0);

// ── 派生状态 ──────────────────────────────────────────────────────────────

/**
 * 当前手绘字体的 CSS font-family 字符串
 */
export const $handDrawnFontFamily = computed($handDrawnFont, (font) => {
  const preset = HAND_FONTS[font] || HAND_FONTS.kalam;
  return preset.family + ", 'Xiaolai SC', cursive";
});

/**
 * 当前手绘字体的像素大小
 */
export const $handDrawnFontSizePx = computed($handDrawnFontSize, (size) => {
  return size === 'small' ? '15px' : size === 'large' ? '20px' : '17px';
});

// ── 初始化函数 ────────────────────────────────────────────────────────────

/**
 * 从 localStorage 加载持久化状态
 * 在应用启动时调用
 */
export function initStateFromStorage() {
  // 加载手绘风格偏好
  try {
    const raw = localStorage.getItem('mermzen-handdrawn');
    if (raw) {
      const prefs = JSON.parse(raw);
      if (prefs.enabled !== undefined) $handDrawnEnabled.set(prefs.enabled);
      if (prefs.seedMode) $handDrawnSeedMode.set(prefs.seedMode);
      if (prefs.font && prefs.font !== 'xiaolai' && HAND_FONTS[prefs.font as FontKey]) {
        $handDrawnFont.set(prefs.font as FontKey);
      }
      if (prefs.fontSize) $handDrawnFontSize.set(prefs.fontSize);
    }
  } catch (e) { /* 忽略错误 */ }

  // 加载语言偏好
  try {
    const saved = localStorage.getItem('mermzen-lang');
    if (saved && (saved === 'zh' || saved === 'en')) {
      $currentLang.set(saved);
    } else {
      // 根据浏览器语言推断
      const browser = (navigator.language || 'en').toLowerCase();
      $currentLang.set(browser.startsWith('zh') ? 'zh' : 'en');
    }
  } catch (e) { /* 忽略错误 */ }
}

/**
 * 保存手绘风格偏好到 localStorage
 */
export function saveHandDrawnPrefsToStorage() {
  try {
    localStorage.setItem('mermzen-handdrawn', JSON.stringify({
      enabled: $handDrawnEnabled.get(),
      seedMode: $handDrawnSeedMode.get(),
      font: $handDrawnFont.get(),
      fontSize: $handDrawnFontSize.get(),
    }));
  } catch (e) { /* 忽略错误 */ }
}

/**
 * 保存语言偏好到 localStorage
 */
export function saveLangToStorage() {
  try {
    localStorage.setItem('mermzen-lang', $currentLang.get());
  } catch (e) { /* 忽略错误 */ }
}
