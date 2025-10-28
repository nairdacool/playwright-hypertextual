import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 30000,
  retries: 1,
  workers: process.env.CI ? 2 : 4,
  use: {
    headless: true,
    viewport: { width: 1290, height: 720 }, //{ width: 1920, height: 1080 }, // Full HD resolution
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    baseURL: 'https://hipertextual.com/',
  },
  reporter: [
    ['list'], 
    ['allure-playwright'],
    [
      'html', 
      { 
        outputFolder: 'playwright-report',
        reportOnSingleRun: true, 
     }
    ]
  ],
});