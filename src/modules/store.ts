/**
 * MermZen Store 兼容层
 *
 * 保持向后兼容的 state 对象接口
 * 内部使用 nanostores 进行响应式状态管理
 *
 * 注意：新代码应该使用 state.ts 中的 $* atoms 和 actions.ts 中的 actions
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
  $menubarOpen,
  $tourActive,
  $tourStep,
  $handDrawnFontFamily,
  $handDrawnFontSizePx,
  HAND_FONTS,
} from './state';

import type { FontKey, SeedMode, FontSize, PreviewBg, Lang, Theme } from './state';

// ═══════════════════════════════════════════════════════════════════════
// 兼容层：提供旧的 state 对象接口
// ═══════════════════════════════════════════════════════════════════════

/**
 * 全局应用状态（兼容旧代码）
 *
 * 通过 getter/setter 代理到 nanostores atoms
 * 所有 setter 操作都会自动触发副作用（通过 effects.ts）
 */
export const state = {
  // ── 手绘风格相关 ─────────────────────────────────────────────────────
  get handDrawn() { return $handDrawnEnabled.get(); },
  set handDrawn(v: boolean) { $handDrawnEnabled.set(v); },

  get handDrawnFont() { return $handDrawnFont.get(); },
  set handDrawnFont(v: FontKey) { $handDrawnFont.set(v); },

  get handDrawnFontSize() { return $handDrawnFontSize.get(); },
  set handDrawnFontSize(v: FontSize) { $handDrawnFontSize.set(v); },

  get handDrawnSeedMode() { return $handDrawnSeedMode.get(); },
  set handDrawnSeedMode(v: SeedMode) { $handDrawnSeedMode.set(v); },

  get handDrawnSeed() { return $handDrawnSeed.get(); },
  set handDrawnSeed(v: number) { $handDrawnSeed.set(v); },

  // ── 主题和背景 ───────────────────────────────────────────────────────
  get currentTheme() { return $currentTheme.get(); },
  set currentTheme(v: Theme) { $currentTheme.set(v); },

  get previewBg() { return $previewBg.get(); },
  set previewBg(v: PreviewBg) { $previewBg.set(v); },

  // ── 语言 ─────────────────────────────────────────────────────────────
  get currentLang() { return $currentLang.get(); },
  set currentLang(v: Lang) { $currentLang.set(v); },

  // ── UI 状态 ─────────────────────────────────────────────────────────
  get menubarOpen() { return $menubarOpen.get(); },
  set menubarOpen(v: boolean) { $menubarOpen.set(v); },

  get tourActive() { return $tourActive.get(); },
  set tourActive(v: boolean) { $tourActive.set(v); },

  get tourStep() { return $tourStep.get(); },
  set tourStep(v: number) { $tourStep.set(v); },

  // ── 运行时属性（不需要响应式，保持直接引用）─────────────────────────
  editorView: null as any,
  renderTimeout: null as ReturnType<typeof setTimeout> | null,
  renderCounter: 0,
  toastTimeout: null as ReturnType<typeof setTimeout> | null,
};

// ═══════════════════════════════════════════════════════════════════════
// 导出类型和常量
// ═══════════════════════════════════════════════════════════════════════

// 重新导出 HAND_FONTS 保持兼容
export { HAND_FONTS };

// ═══════════════════════════════════════════════════════════════════════
// 兼容函数
// ═══════════════════════════════════════════════════════════════════════

/**
 * 获取当前手绘字体的 CSS font-family 字符串
 */
export function getHandDrawnFontFamily(): string {
  return $handDrawnFontFamily.get();
}

/**
 * 获取当前手绘字体的像素大小
 */
export function getHandDrawnFontSizePx(): string {
  return $handDrawnFontSizePx.get();
}

/**
 * 解析并获取当前的手绘随机种子
 *
 * 注意：在 random 模式下，只返回随机值而不更新状态，
 * 避免触发副作用导致的无限渲染循环
 */
export function resolveHandDrawnSeed(): number {
  if ($handDrawnSeedMode.get() === 'random') {
    // 直接返回随机值，不更新状态，避免触发 scheduleRender 循环
    return Math.floor(Math.random() * 10000);
  }
  return $handDrawnSeed.get();
}

// ═══════════════════════════════════════════════════════════════════════
// 缩放和平移状态（保持原有结构）
// ═══════════════════════════════════════════════════════════════════════

export const pz = {
  scale: 1, tx: 0, ty: 0,
  dragging: false, startX: 0, startY: 0, startTx: 0, startTy: 0,
};

export const MIN_SCALE = 0.1;
export const MAX_SCALE = 8;
