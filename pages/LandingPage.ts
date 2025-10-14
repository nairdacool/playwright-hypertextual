import { Locator, Page, expect } from '@playwright/test';

export class LandingPage {
    readonly page: Page;
    readonly privacyDisclaimerModal;
    readonly privacyDisclaimerAcceptButton: Locator;
    readonly searchIcon: Locator;
    readonly searchInput: Locator;
    readonly pageHeader: Locator;
    readonly searchedInput: Locator;

    constructor(page: Page) {
        this.page = page;
        this.privacyDisclaimerModal = page.locator('.qc-cmp2-summary-section');
        this.privacyDisclaimerAcceptButton = page.locator('#accept-btn');
        this.searchIcon = page.locator('#search-toggle');
        this.searchInput = page.locator('#search-form-2');
        this.pageHeader = page.locator('.page-header');
        this.searchedInput = page.locator('#search-form-3');
    }

    async acceptPrivacyDisclaimerIfVisible() {
        if (await this.privacyDisclaimerModal.isVisible()) {
            await this.privacyDisclaimerAcceptButton.click();
            await expect(this.privacyDisclaimerModal).toBeHidden();
        }
    }

    async clickSearchIcon() {
        await this.searchIcon.click({ delay: 200 });
        await expect(this.searchInput).toBeVisible();
    }

    async searchForArticle(articleTitle: string) {
        await this.searchInput.fill(articleTitle).then(() => this.searchInput.press('Enter'));
        await expect(this.pageHeader).toBeVisible();
        await expect(this.searchedInput).toHaveValue(articleTitle);
    }
}