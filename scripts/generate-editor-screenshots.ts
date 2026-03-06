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

const BASE_URL = 'http://localhost:8766/MermZen';
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

    // Navigate to the page
    await page.goto(BASE_URL, { waitUntil: 'networkidle', timeout: 30000 });

    // Set localStorage and reload
    await page.evaluate((langValue) => {
      localStorage.setItem('mermzen-lang', langValue);
      localStorage.setItem('mermzen-tour-done', 'true');
    }, lang);

    // Reload to apply settings
    await page.reload({ waitUntil: 'networkidle', timeout: 30000 });

    // Wait for the editor to be visible
    try {
      await page.waitForSelector('#editor-container', { timeout: 10000 });
    } catch {
      console.error(`  ✗ Timeout waiting for editor container: ${name}`);
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
