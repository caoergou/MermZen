/**
 * 生成编辑器界面截图用于 README
 * 依赖：Vite preview 服务需在 8766 端口运行
 */
import { chromium } from '@playwright/test';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Get port from command line arguments, default to 8766
const port = process.argv[2] ? parseInt(process.argv[2], 10) : 8766;
const BASE_URL = `http://localhost:${port}`;
const ASSETS_DIR = path.join(__dirname, '..', 'assets');

interface ScreenshotDef {
  name: string;
  lang: 'zh' | 'en';
  dark: boolean;
  width: number;
  height: number;
}

const SCREENSHOTS: ScreenshotDef[] = [
  { name: 'editor-en', lang: 'en', dark: false, width: 1280, height: 720 },
  { name: 'editor-en-dark', lang: 'en', dark: true, width: 1280, height: 720 },
  { name: 'editor-zh', lang: 'zh', dark: false, width: 1280, height: 720 },
  { name: 'editor-zh-dark', lang: 'zh', dark: true, width: 1280, height: 720 },
];

async function generateScreenshots(): Promise<void> {
  if (!fs.existsSync(ASSETS_DIR)) fs.mkdirSync(ASSETS_DIR, { recursive: true });

  const browser = await chromium.launch();

  for (const { name, lang, dark, width, height } of SCREENSHOTS) {
    console.log(`\nRendering ${name}.png...`);

    // Use deviceScaleFactor: 2 for high-DPI screenshots
    const context = await browser.newContext({
      viewport: { width, height },
      deviceScaleFactor: 2,
    });
    const page = await context.newPage();

    // Navigate to the page with lang parameter directly for reliability
    await page.goto(`${BASE_URL}/MermZen/?lang=${lang}&tour=skip`, { waitUntil: 'domcontentloaded', timeout: 60000 });

    // Set localStorage as fallback
    await page.evaluate((langValue) => {
      localStorage.setItem('mermzen-lang', langValue);
      localStorage.setItem('mermzen-tour-seen', '1');
      localStorage.setItem('mermzen-onboarding-dismissed', '1');
    }, lang);

    // Reload to apply settings
    await page.reload({ waitUntil: 'domcontentloaded', timeout: 60000 });

    // Wait for the editor to be visible
    try {
      // 等待任意编辑器元素，选择器更通用
      await page.waitForSelector('.cm-editor, #editor, [class*="editor"]', { timeout: 30000 });
      // 额外等待3秒确保所有内容渲染完成
      await page.waitForTimeout(3000);
      // 关闭可能存在的弹窗或引导
      await page.evaluate(() => {
        // 移除所有弹窗元素
        const modals = document.querySelectorAll('.modal, .tour, .dialog, .ant-modal, .el-dialog, [role="dialog"]');
        modals.forEach(modal => modal.remove());
        // 点击空白区域
        document.body.click();
      });
      // 等待弹窗关闭
      await page.waitForTimeout(1000);
    } catch (e) {
      console.error(`  ✗ Timeout waiting for editor container: ${name}`, e);
      await page.close();
      await context.close();
      continue;
    }

    // Apply dark theme if needed
    if (dark) {
      await page.evaluate(() => {
        document.documentElement.setAttribute('data-theme', 'dark');
      });
      await page.waitForTimeout(500);
    }

    // Wait a bit for fonts to load
    await page.waitForTimeout(2000);

    // Cancel any text selection to avoid "全选" state in screenshot
    await page.evaluate(() => {
      window.getSelection()?.removeAllRanges();
      // Click on a non-editable area to defocus the editor
      const header = document.querySelector('header');
      if (header) (header as HTMLElement).click();
    });

    // Wait for stabilization
    await page.waitForTimeout(500);

    // Take screenshot
    const outPath = path.join(ASSETS_DIR, `${name}.png`);
    await page.screenshot({ path: outPath, fullPage: false });
    console.log(`  ✓ Saved ${name}.png`);

    await page.close();
    await context.close();
  }

  await browser.close();
  console.log('\n✓ All editor screenshots generated');
}

generateScreenshots().catch(console.error);
