import { Page, Locator, expect, Frame} from '@playwright/test';

export class NewsletterPage {
    readonly page: Page;
    private readonly iframeSelector = 'iframe[data-test-id="beehiiv-embed"]';
    private iframeContent: Frame | null = null;
    
    private readonly emailInputSelector = 'input[name="email"]';
    private readonly subscribeButtonSelector = 'button[type="submit"]:has-text("Suscríbete")';

    constructor(page: Page) {
        this.page = page;
    }

    async verifyNewsletterSubscriptionFormIsVisible(): Promise<void> {
        const iframeLocator = this.page.locator(this.iframeSelector);
        
        // 1. Wait for the iframe element itself to be in the DOM
        await iframeLocator.waitFor({ state: 'attached', timeout: 30000 });
        
        // 2. Retrieve the content frame (the iframe's document context)
        const elementHandle = await iframeLocator.elementHandle();
        this.iframeContent = elementHandle ? await elementHandle.contentFrame() : null;

        if (!this.iframeContent) {
            throw new Error(`Failed to retrieve content frame for iframe using selector: ${this.iframeSelector}`);
        }
        
        // 3. Wait for the email input inside the iframe to confirm visibility
        const emailInput = this.iframeContent.locator(this.emailInputSelector);
        await emailInput.waitFor({ state: 'visible', timeout: 10000 });
    }

    async fillNewsletterEmail(email: string): Promise<void> {
        if (!this.iframeContent) {
            throw new Error('Iframe content is not loaded. Call verifyNewsletterSubscriptionFormIsVisible() first.');
        }
        const emailInput = this.iframeContent.locator(this.emailInputSelector);
        await emailInput.fill(email);
        // Optional assertion to confirm the value was filled
        await expect(emailInput).toHaveValue(email);
    }

    async clickSubscribeButton(): Promise<void> {
        if (!this.iframeContent) {
            throw new Error('Iframe content is not loaded. Call verifyNewsletterSubscriptionFormIsVisible() first.');
        }
        const subscribeButton = this.iframeContent.locator(this.subscribeButtonSelector);
        await expect(subscribeButton, 'Button should be visible and enabled').toBeEnabled();
        await subscribeButton.click();
        console.log('------ Subscribe button successfully clicked!!!! ------');
        
        // --- NOTE ON SUBSCRIPTION VALIDATION ---
        // Due to restrictions within the embedded beehiiv iframe, the form does not display a client-side
        // confirmation message (e.g., "Success!"). Furthermore, server-side validation is rejecting the
        // submission endpoint (/api/submitRequest) with a 403 Forbidden status, likely due to bot detection.
        // Therefore, we cannot validate a successful subscription.
        // Instead, this test confirms two things:
        // 1. The subscribe button is clickable and does not throw errors upon interaction.
        // 2. After the click event, we're indicating that the action was performed.
        // Further validation would require extensive experience and support or more investigation.
    }

    getEmailInputLocator(): Locator {
        if (!this.iframeContent) {
            throw new Error('Iframe content is not loaded. Call load() first.');
        }
        return this.iframeContent.locator(this.emailInputSelector);
    }
}