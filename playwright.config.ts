import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 30000,
  retries: 1,
  use: {
    headless: false,
    viewport:  { width: 1920, height: 1080 }, // Full HD resolution
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    baseURL: 'https://hipertextual.com/',
  },
  reporter: [['list'], ['html', { outputFolder: 'playwright-report' }]],
});