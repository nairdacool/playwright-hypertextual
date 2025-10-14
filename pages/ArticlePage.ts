import { Page, Locator, expect } from "playwright/test";

export class ArticlePage {
    readonly page: Page;
    readonly articleTitle: Locator;

    constructor(page: Page) {
        this.page = page;
        this.articleTitle = page.locator('.entry-title.entry-title--with-subtitle');
    }

    async verifyArticleTitle(expectedTitle: string) {
        await this.articleTitle.waitFor({ state: 'visible' , timeout: 5000 });
        console.log('Found article Title Text match:', await this.articleTitle.textContent());
        await expect(this.articleTitle).toContainText(expectedTitle);
    }

    async verifyArticleUrlContains(expectedSlug: string) {
        const url = this.page.url();
        console.log('Current article URL:', url);
        expect(url).toContain(expectedSlug);
    }
}