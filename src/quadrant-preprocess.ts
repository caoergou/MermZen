/**
 * quadrant-preprocess.ts
 *
 * Mermaid v11 的 quadrantChart 词法器只认 ASCII 字符（ALPHA token = /[A-Za-z]+/，
 * point_start 条件下只认 /^\w+/）。含 CJK 字符的 data point 标签、axis 标签
 * 或 title 会导致整个图表静默失败（空白输出）。
 *
 * 本模块提供：
 *   preprocessQuadrant(code)   → { processed, restore }
 *     processed : 传给 mermaid.render 的替换版本（CJK → ASCII placeholder）
 *     restore   : (svg: string) => string，将渲染后 SVG 里的 placeholder 还原为原始中文
 */

/** 判断字符串中是否含非 ASCII 字符 */
function hasNonAscii(s: string): boolean {
  return /[^\x00-\x7F]/.test(s);
}

/** 匹配 quadrantChart 中的各类可能含 CJK 的字段 */
// data point:  "    SomeLabel: [0.15, 0.2]"
const RE_POINT = /^(\s+)([^\x00-\x7F][^:]*|[^:]*[^\x00-\x7F][^:]*)(\s*:\s*\[\s*[\d.]+\s*,\s*[\d.]+\s*\])/;
// axis:        "    x-axis low --> high"   其中 low/high 可为中文
const RE_AXIS = /^(\s+)(x-axis|y-axis)(\s+)(.*?)(\s*-->?\s*)(.*?)(\s*)$/;
// title:       "    title 某标题"
const RE_TITLE = /^(\s+title\s+)(.*)/;

export interface QuadrantPreprocessResult {
  processed: string;
  /** 将 SVG 中的 ASCII placeholder 还原为原始 CJK 文本 */
  restore: (svg: string) => string;
}

/**
 * 对非 quadrantChart 代码直接返回原始字符串及恒等 restore。
 */
function noop(code: string): QuadrantPreprocessResult {
  return { processed: code, restore: (svg) => svg };
}

export function preprocessQuadrant(code: string): QuadrantPreprocessResult {
  // 只处理 quadrantChart
  const firstLine = code.trimStart().split('\n')[0].trim().toLowerCase();
  if (!firstLine.startsWith('quadrantchart')) return noop(code);

  // 用 map 记录 placeholder → 原始文本，后处理时替换回来
  const map = new Map<string, string>();
  let counter = 0;

  function placeholder(original: string): string {
    const key = `CJKPH${counter++}X`;
    map.set(key, original);
    return key;
  }

  const lines = code.split('\n');
  const processed = lines.map((line) => {
    // --- title ---
    const titleMatch = line.match(RE_TITLE);
    if (titleMatch && hasNonAscii(titleMatch[2])) {
      const ph = placeholder(titleMatch[2]);
      return titleMatch[1] + ph;
    }

    // --- axis ---
    const axisMatch = line.match(RE_AXIS);
    if (axisMatch) {
      // axisMatch 结构: [全, 前缀空格, x/y-axis, 空格, label1, arrow, label2, 末尾空格]
      const [, indent, axis, sp, label1, arrow, label2, trailingWS] = axisMatch;
      let changed = false;
      let l1 = label1;
      let l2 = label2;
      if (hasNonAscii(label1)) { l1 = placeholder(label1); changed = true; }
      if (hasNonAscii(label2)) { l2 = placeholder(label2); changed = true; }
      if (changed) return `${indent}${axis}${sp}${l1}${arrow}${l2}${trailingWS}`;
      return line;
    }

    // --- data point ---
    // 先尝试带 CJK 的完整 label 匹配
    const ptMatch = line.match(RE_POINT);
    if (ptMatch) {
      const [, indent, label, rest] = ptMatch;
      const ph = placeholder(label.trim());
      return `${indent}${ph}${rest}`;
    }

    // 宽松兜底：只要这行看起来是 "    Label: [x, y]" 且含非 ASCII
    if (hasNonAscii(line)) {
      const looseMatch = line.match(/^(\s+)(.+?)(\s*:\s*\[\s*[\d.]+\s*,\s*[\d.]+\s*\])/);
      if (looseMatch) {
        const [, indent, label, rest] = looseMatch;
        if (hasNonAscii(label)) {
          const ph = placeholder(label.trim());
          return `${indent}${ph}${rest}`;
        }
      }
    }

    return line;
  }).join('\n');

  if (map.size === 0) {
    // 没有替换任何内容，直接返回原始
    return noop(code);
  }

  function restore(svg: string): string {
    let result = svg;
    for (const [ph, original] of map.entries()) {
      // SVG 里 placeholder 会出现在 <text> 内容、title、tspan 等地方；
      // 用全局替换，兼容 XML 转义情况（placeholder 全是 ASCII，不会被转义）
      result = result.split(ph).join(original);
    }
    return result;
  }

  return { processed, restore };
}
