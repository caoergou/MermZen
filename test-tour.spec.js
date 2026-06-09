// @ts-check
import { test, expect } from '@playwright/test';

const FILE_URL = 'http://localhost:56324/MermZen/';  // Dev server

test.beforeEach(async ({ page }) => {
  // Capture console messages
  page.on('console', msg => {
    if (msg.type() === 'error') {
      console.log('BROWSER ERROR:', msg.text());
    }
  });
  // Capture page errors
  page.on('pageerror', error => {
    console.log('PAGE ERROR:', error.message);
  });
  await page.addInitScript(() => {
    localStorage.removeItem('mermzen-tour-seen');
    localStorage.removeItem('mermzen-lang');
  });
});

test('tour shows language picker on first visit', async ({ page }) => {
  await page.goto(FILE_URL);
  // Wait for page to fully load
  await page.waitForLoadState('networkidle');
  // Wait additional time for tour to start (it has 500ms delay in bootstrap)
  await page.waitForTimeout(1000);

  // Check if tour overlay exists and its visibility
  const overlay = page.locator('#tour-overlay');
  const isVisible = await overlay.isVisible();
  console.log('Tour overlay visible:', isVisible);

  // Check localStorage state
  const tourSeen = await page.evaluate(() => localStorage.getItem('mermzen-tour-seen'));
  console.log('tour-seen in localStorage:', tourSeen);

  await expect(overlay).toBeVisible({ timeout: 8000 });

  await expect(page.locator('.lang-pick[data-lang="zh"]')).toBeVisible();
  await expect(page.locator('.lang-pick[data-lang="en"]')).toBeVisible();
});

test('selecting English starts tour in English', async ({ page }) => {
  await page.goto(FILE_URL);
  await page.locator('#tour-overlay').waitFor({ state: 'visible', timeout: 8000 });

  await page.locator('.lang-pick[data-lang="en"]').click();

  await expect(page.locator('#tour-title')).toHaveText('Code Editor');
  await expect(page.locator('#tour-step')).toHaveText('1 / 5');
  await expect(page.locator('#tour-next')).toContainText('Next');
});

test('selecting Chinese starts tour in Chinese', async ({ page }) => {
  await page.goto(FILE_URL);
  await page.locator('#tour-overlay').waitFor({ state: 'visible', timeout: 8000 });

  await page.locator('.lang-pick[data-lang="zh"]').click();

  await expect(page.locator('#tour-title')).toHaveText('代码编辑器');
  await expect(page.locator('#tour-next')).toContainText('下一步');
});

test('tour advances through all 5 steps and closes', async ({ page }) => {
  await page.goto(FILE_URL);
  await page.locator('#tour-overlay').waitFor({ state: 'visible', timeout: 8000 });
  await page.locator('.lang-pick[data-lang="en"]').click();

  for (let i = 1; i <= 4; i++) {
    await expect(page.locator('#tour-step')).toHaveText(`${i} / 5`);
    await page.locator('#tour-next').click();
  }

  await expect(page.locator('#tour-step')).toHaveText('5 / 5');
  await expect(page.locator('#tour-next')).toContainText('Done');
  await page.locator('#tour-next').click();

  await expect(page.locator('#tour-overlay')).toBeHidden();
});

test('skip button closes tour immediately', async ({ page }) => {
  await page.goto(FILE_URL);
  await page.locator('#tour-overlay').waitFor({ state: 'visible', timeout: 8000 });
  await page.locator('.lang-pick[data-lang="en"]').click();

  await page.locator('#tour-skip').click();
  await expect(page.locator('#tour-overlay')).toBeHidden();
});

test('curtain divs are present during tour', async ({ page }) => {
  await page.goto(FILE_URL);
  await page.locator('#tour-overlay').waitFor({ state: 'visible', timeout: 8000 });
  await page.locator('.lang-pick[data-lang="en"]').click();

  await expect(page.locator('#tour-curtain-top')).toBeAttached();
  await expect(page.locator('#tour-curtain-bottom')).toBeAttached();
  await expect(page.locator('#tour-curtain-left')).toBeAttached();
  await expect(page.locator('#tour-curtain-right')).toBeAttached();
});

test('tour does not show on second visit', async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.setItem('mermzen-tour-seen', '1');
  });
  await page.goto(FILE_URL);
  await page.waitForTimeout(1500);
  await expect(page.locator('#tour-overlay')).toBeHidden();
});
