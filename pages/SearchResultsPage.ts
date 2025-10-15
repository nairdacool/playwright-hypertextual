import { Page, Locator, expect } from '@playwright/test';

export class SearchResultsPage {
    readonly page: Page;
    readonly resultsList: Locator;
    readonly articleTitle: Locator;

    constructor(page: Page) {
        this.page = page;
        this.resultsList = page.locator('.entry-header');
        this.articleTitle = page.locator('.entry-title.entry-title--with-subtitle');
    }

    async clickEntryHeaderContaining(searchedWord: string, maxAttempts = 30, delayMs = 1000) {
        let previousCount = 0;
        let attempts = 0;
        while (attempts < maxAttempts) {
            const headers = await this.resultsList.all();
            for (const header of headers) {
                const text = await header.textContent();
                if (text && text.toLowerCase().includes(searchedWord.toLowerCase())) {
                    await header.scrollIntoViewIfNeeded();
                    await header.click();
                    return;
                }
            }
            // If no new headers loaded since last loop, consider stopping early
            if (headers.length === previousCount) {
                attempts++;
            } else {
                previousCount = headers.length;
                attempts = 0; // reset attempts when new items are found
            }
            // If we've reached the element list end, scroll the last item to trigger more loading
            if (headers.length) {
                await headers[headers.length - 1].scrollIntoViewIfNeeded();
            } else {
                // fallback: scroll page
                await this.page.evaluate(() => window.scrollBy(0, window.innerHeight));
            }
            // wait for new results to load
            await this.page.waitForTimeout(delayMs);
        }
        throw new Error(`No entry header containing "${searchedWord}" was found after ${maxAttempts} scroll attempts.`);
    }
}