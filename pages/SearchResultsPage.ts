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

    async clickEntryHeaderContaining(searchedWord: string) {
        let previousCount = 0;
        while (true) {
            const headers = await this.resultsList.all();
            for (const header of headers) {
                const text = await header.textContent();
                if (text && text.toLowerCase().includes(searchedWord.toLowerCase())) {
                    await header.scrollIntoViewIfNeeded();
                    await header.click();
                    return;
                }
            }
            // If no new headers loaded, break to avoid infinite loop
            if (headers.length === previousCount) {
                throw new Error(`No entry header containing "${searchedWord}" was found.`);
            }
            previousCount = headers.length;
            // Scroll to the last header to trigger infinite scroll loading
            await headers[headers.length - 1].scrollIntoViewIfNeeded();
            // Wait for new results to load
            await this.page.waitForTimeout(1000);
        }
    }
}