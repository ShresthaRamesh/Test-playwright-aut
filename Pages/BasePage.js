const { text } = require("stream/consumers");

/**
 * Base class for all page objects
 * Provides common functionality for page interactions
 */
class BasePage {
    constructor(page) {
        this.page = page;
    }

    /**
     * Wait for element to be visible and clickable
     * @param {string} selector - The selector to wait for
     * @param {number} timeout - Timeout in milliseconds (default: 30000)
     */
    async waitForElement(selector, timeout = 30000) {
        await this.page.waitForSelector(selector, { visible: true, timeout });
    }

    /**
     * Click on an element with retry mechanism
     * @param {string} selector - The selector to click
     * @param {number} maxRetries - Maximum number of retries (default: 3)
     */
    async clickWithRetry(selector, maxRetries = 3) {
        for (let i = 0; i < maxRetries; i++) {
            try {
                await this.page.click(selector);
                return;
            } catch (error) {
                if (i === maxRetries - 1) throw error;
                await this.page.waitForTimeout(1000);
            }
        }
    }

    async clickElement(selector){
        await this.page.click(selector)
    }

    /**
     * Fill input field with retry mechanism
     * @param {string} selector - The selector to fill
     * @param {string} value - The value to fill
     * @param {number} maxRetries - Maximum number of retries (default: 3)
     */
    async fillWithRetry(selector, value, maxRetries = 3) {
        for (let i = 0; i < maxRetries; i++) {
            try {
                await this.page.fill(selector, value);
                return;
            } catch (error) {
                if (i === maxRetries - 1) throw error;
                await this.page.waitForTimeout(1000);
            }
        }
    }

    /**
     * Wait for navigation to complete
     * @param {number} timeout - Timeout in milliseconds (default: 30000)
     */
    async waitForNavigation(timeout = 30000) {
        await this.page.waitForNavigation({ timeout });
    }

    /**
     * Click element by role and name
     * @param {string} role - The role of the element
     * @param {string} name - The name of the element
     */
    async clickByRole(role, name) {
        await this.page.getByRole(role, { name }).click();
    }

    async textToBeVisible(name){
        await this.page.getByText(name)
    }

    /**
     * Fill input by role and name
     * @param {string} role - The role of the element
     * @param {string} name - The name of the element
     * @param {string} value - The value to fill
     */
    async fillByRole(role, name, value) {
        await this.page.getByRole(role, { name }).fill(value);
    }
}

module.exports = BasePage; 