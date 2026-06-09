// @ts-check
// 冒烟测试：覆盖「AI 渲染层」核心路径——embed 页面与 ?text= 明文参数。
// 这些是项目对外差异化的关键入口（AI 生成图 → 点开查看/编辑 → 永久分享），
// 必须保证在改动 embed.ts / export.ts / render.ts 时不被回归打破。
import { test, expect } from '@playwright/test';

const BASE = 'http://localhost:56324/MermZen/';
const SAMPLE = 'graph TD; A[Start] --> B[End]';

test.describe('embed 页面 (?text=)', () => {
  test('从 ?text= 明文参数渲染图表', async ({ page }) => {
    await page.goto(`${BASE}embed.html?text=${encodeURIComponent(SAMPLE)}`);

    const svg = page.locator('#diagram svg');
    await expect(svg).toBeVisible({ timeout: 8000 });
    // 错误区域应保持隐藏
    await expect(page.locator('#error')).toBeHidden();
  });

  test('显示缩放工具栏', async ({ page }) => {
    await page.goto(`${BASE}embed.html?text=${encodeURIComponent(SAMPLE)}`);
    await expect(page.locator('#diagram svg')).toBeVisible({ timeout: 8000 });

    await expect(page.locator('#zoom-in')).toBeVisible();
    await expect(page.locator('#zoom-out')).toBeVisible();
    await expect(page.locator('#zoom-fit')).toBeVisible();
  });

  test('brand 角标指回主应用并带上同一份图表代码', async ({ page }) => {
    await page.goto(`${BASE}embed.html?text=${encodeURIComponent(SAMPLE)}`);
    await expect(page.locator('#diagram svg')).toBeVisible({ timeout: 8000 });

    const brand = page.locator('#brand');
    await expect(brand).toBeVisible();
    // 角标链接应回到主应用，并把当前代码透传到 ?text=（增长闭环）
    const href = await brand.getAttribute('href');
    expect(href).toContain('text=');
    // 查询串里空格被编码为 '+'（application/x-www-form-urlencoded），还原后再断言
    const decoded = decodeURIComponent((href ?? '').replace(/\+/g, ' '));
    expect(decoded).toContain('graph TD');
  });

  test('无代码时不渲染 SVG', async ({ page }) => {
    await page.goto(`${BASE}embed.html`);
    await page.waitForTimeout(1000);
    await expect(page.locator('#diagram svg')).toHaveCount(0);
  });
});

test.describe('主应用 (?text=)', () => {
  test('从 ?text= 渲染预览并填充编辑器', async ({ page }) => {
    await page.goto(`${BASE}?text=${encodeURIComponent(SAMPLE)}&skipTour=1`);

    // 预览区应渲染出 SVG
    await expect(page.locator('#mermaid-preview svg')).toBeVisible({ timeout: 8000 });

    // CodeMirror 编辑器应载入对应代码
    await expect(page.locator('#editor-container .cm-content')).toContainText('graph TD', {
      timeout: 8000,
    });
  });
});
