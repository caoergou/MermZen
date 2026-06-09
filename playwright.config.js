// @ts-check
import { defineConfig, devices } from '@playwright/test';

const isCI = !!process.env.CI;

export default defineConfig({
  testDir: '.',
  testMatch: '*.spec.js',
  forbidOnly: isCI,
  retries: isCI ? 1 : 0,
  use: { headless: true },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:56324/MermZen/',
    timeout: 60000,
    reuseExistingServer: !isCI,
  },
});
