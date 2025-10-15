import { Locator, Page, expect } from '@playwright/test';

export class LandingPage {
    readonly page: Page;
    readonly privacyDisclaimerModal;
    readonly privacyDisclaimerAcceptButton: Locator;
    readonly searchIcon: Locator;
    readonly searchInput: Locator;
    readonly pageHeader: Locator;
    readonly searchedInput: Locator;
    readonly mainMenu: Locator;

    constructor(page: Page) {
        this.page = page;
        this.privacyDisclaimerModal = page.locator('.qc-cmp2-summary-section');
        this.privacyDisclaimerAcceptButton = page.locator('#accept-btn');
        this.searchIcon = page.locator('#search-toggle');
        this.searchInput = page.locator('#search-form-2');
        this.pageHeader = page.locator('.page-header');
        this.searchedInput = page.locator('#search-form-3');
        this.mainMenu = page.locator('#menu-header-1');
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

    async selectOptionFromMainMenu(menuOption: string) {
        await this.mainMenu.waitFor({ state: 'visible', timeout: 5000 });

        const items = this.mainMenu.locator('li');
        const count = await items.count();

        for (let i = 0; i < count; i++) {
            const item = items.nth(i);
            const text = (await item.textContent()) ?? '';

            if (text.includes(menuOption)) { 
                const link = item.locator('a').first();
                if ((await link.count()) > 0) {
                    await link.click();
                } else {
                    await item.click();
                }
                return;
            }
        }

        throw new Error(`Menu option containing "${menuOption}" was not found in the main menu.`);
    }
}