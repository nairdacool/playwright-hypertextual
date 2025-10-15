import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 30000,
  retries: 1,
  use: {
    headless: true,
    viewport: { width: 1280, height: 720 }, 
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    baseURL: 'https://hipertextual.com/',
  },
  reporter: [['list'], ['html', { outputFolder: 'playwright-report' }]],
});