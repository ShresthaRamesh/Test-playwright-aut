const BasePage = require('./BasePage');

/**
 * Represents the LoginPage class which provides methods to interact with the login page.
 * 
 * @class
 * @extends BasePage
 * @param {object} page - The Playwright page object used for browser interactions.
 */
class LoginPage extends BasePage {
    constructor(page) {
        super(page);
    }

    /**
     * Navigate to the login page
     * @param {string} baseUrl - The base URL of the application
     */
    async navigateToLogin(baseUrl) {
        await this.page.goto(baseUrl);
        // Wait for the page to be fully loaded
        await this.page.waitForLoadState('networkidle');
    }

    /**
     * Fill in the login form
     * @param {string} username - The username/email to login with
     * @param {string} password - The password to login with
     */
    async fillLoginForm(username, password) {
        await this.fillByRole('textbox', 'Phone / Email', username);
        await this.fillByRole('textbox', 'Password', password);
    }

    /**
     * Click the login button
     */
    async clickLoginButton() {
        await this.clickByRole('button', 'Log In');
    }

    /**
     * Perform a valid login
     * @param {string} baseUrl - The base URL of the application
     * @param {string} username - The username/email to login with
     * @param {string} password - The password to login with
     * @throws {Error} If login fails
     */
    async performValidLogin(baseUrl, username, password) {
        try {
            await this.navigateToLogin(baseUrl);
            await this.fillLoginForm(username, password);
            await this.clickLoginButton();
            await this.waitForNavigation();
        } catch (error) {
            throw new Error(`Valid login failed: ${error.message}`);
        }
    }

    /**
     * Perform login with invalid username
     * @param {string} baseUrl - The base URL of the application
     * @param {string} username - The invalid username/email
     * @param {string} password - The password
     * @throws {Error} If login succeeds when it should fail
     */
    async performInvalidUsernameLogin(baseUrl, username, password) {
        try {
            await this.navigateToLogin(baseUrl);
            await this.fillLoginForm(username, password);
            await this.clickLoginButton();
            
            // Wait for and verify error message
            await this.waitForElement('text=Invalid username or password');
            await expect(this.page.getByText('Invalid username or password')).toBeVisible();
        } catch (error) {
            throw new Error(`Invalid username login test failed: ${error.message}`);
        }
    }

    /**
     * Perform login with invalid password
     * @param {string} baseUrl - The base URL of the application
     * @param {string} username - The username/email
     * @param {string} password - The invalid password
     * @throws {Error} If login succeeds when it should fail
     */
    async performInvalidPasswordLogin(baseUrl, username, password) {
        try {
            await this.navigateToLogin(baseUrl);
            await this.fillLoginForm(username, password);
            await this.clickLoginButton();
            
            // Wait for and verify error message
            await this.waitForElement('text=Invalid username or password');
            await expect(this.page.getByText('Invalid username or password')).toBeVisible();
        } catch (error) {
            throw new Error(`Invalid password login test failed: ${error.message}`);
        }
    }
}

module.exports = LoginPage;

