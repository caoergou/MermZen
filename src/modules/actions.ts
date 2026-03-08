/**
 * MermZen Actions 模块
 *
 * 提供统一的状态变更入口
 * 所有状态修改都应该通过 actions 进行，而不是直接修改状态
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
  HAND_FONTS,
} from './state';

import type { FontKey, SeedMode, FontSize, PreviewBg, Lang, Theme } from './state';

/**
 * 统一的状态变更入口
 *
 * 使用示例：
 * ```typescript
 * import { actions } from './actions';
 *
 * // 切换手绘风格
 * actions.toggleHandDrawn();
 *
 * // 设置主题
 * actions.setTheme('dark');
 * ```
 */
export const actions = {
  // ═══════════════════════════════════════════════════════════════════════
  // 手绘风格相关
  // ═══════════════════════════════════════════════════════════════════════

  /**
   * 切换手绘风格开关
   */
  toggleHandDrawn() {
    $handDrawnEnabled.set(!$handDrawnEnabled.get());
  },

  /**
   * 设置手绘风格开关
   */
  setHandDrawnEnabled(enabled: boolean) {
    $handDrawnEnabled.set(enabled);
  },

  /**
   * 设置手绘字体
   */
  setHandDrawnFont(font: FontKey) {
    if (font in HAND_FONTS) {
      $handDrawnFont.set(font);
    }
  },

  /**
   * 设置手绘字号
   */
  setHandDrawnFontSize(size: FontSize) {
    $handDrawnFontSize.set(size);
  },

  /**
   * 设置手绘随机种子模式
   */
  setHandDrawnSeedMode(mode: SeedMode) {
    $handDrawnSeedMode.set(mode);
  },

  /**
   * 重新随机手绘种子（重新洗牌手绘效果）
   */
  reshuffleHandDrawn() {
    $handDrawnSeed.set(Math.floor(Math.random() * 10000));
  },

  // ═══════════════════════════════════════════════════════════════════════
  // 主题相关
  // ═══════════════════════════════════════════════════════════════════════

  /**
   * 设置 Mermaid 图表主题
   */
  setTheme(theme: Theme) {
    $currentTheme.set(theme);
  },

  // ═══════════════════════════════════════════════════════════════════════
  // 预览背景相关
  // ═══════════════════════════════════════════════════════════════════════

  /**
   * 设置预览区背景
   */
  setPreviewBg(bg: PreviewBg) {
    $previewBg.set(bg);
  },

  // ═══════════════════════════════════════════════════════════════════════
  // 语言相关
  // ═══════════════════════════════════════════════════════════════════════

  /**
   * 设置界面语言
   */
  setLang(lang: Lang) {
    $currentLang.set(lang);
  },
};
