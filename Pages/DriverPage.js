import RandomGenerator from "./RandomGenerator";
import { expect } from "@playwright/test";
const BasePage = require('./BasePage');

/**
 * Represents a page for managing driver operations.
 * Extends BasePage for common functionality and uses RandomGenerator for generating driver details.
 * 
 * @class
 * @extends BasePage
 * @param {object} page - The Playwright page object for interacting with the browser.
 * @param {Object} [driverDetails] - Optional driver details. If not provided, will be generated.
 */
class DriverPage extends BasePage {
    constructor(page, driverDetails) {
        super(page);
        const randomGen = new RandomGenerator();
        this.driverName = driverDetails?.driverName || randomGen.generateRandomName().drivername;
        this.phoneNumber = driverDetails?.phoneNumber || randomGen.generateRandomPhoneNumber();
        this.email = driverDetails?.email || randomGen.generateRandomEmail();
    }

    /**
     * Creates a new driver with generated details
     * @throws {Error} If driver creation fails
     */
    async createNewDriver() {
        try {
            await this.navigateToDriverSection();
            await this.fillDriverDetails();
            await this.submitDriverForm();
            await this.searchDriver();
            await this.verifyDriverFound();
        } catch (error) {
            throw new Error(`Failed to create new driver: ${error.message}`);
        }
    }

    /**
     * Navigates to the driver section
     * @private
     */
    async navigateToDriverSection() {
        await this.clickByRole('button', 'Operations');
        await this.clickByRole('link', 'Self Customer');
        await this.clickByRole('link', 'Drivers');
        await this.clickByRole('button', 'Add Driver');
    }

    /**
     * Fills in the driver details form
     * @private
     */
    async fillDriverDetails() {
        const { driverName, phoneNumber, email } = this;
        
        // Fill basic information
        await this.fillByRole('textbox', 'NAME *', driverName + "Dr");
        await this.fillByRole('textbox', 'ERP ID', driverName);
        await this.fillByRole('textbox', 'EMAIL', email);
        await this.fillByRole('textbox', 'phone', phoneNumber);
        
        // Select status
        await this.clickWithRetry('[role="group"]:has-text("statusSelect...") svg');
        await this.clickByRole('button', 'Company');
        
        // Set as primary
        await this.clickWithRetry('label:has-text("PRIMARY ?") span');
    }

    /**
     * Submits the driver creation form
     * @private
     */
    async submitDriverForm() {
        await this.clickByRole('button', 'Create');
        await this.waitForNavigation();
    }

    /**
     * Searches for the created driver
     * @private
     */
    async searchDriver() {
        const { driverName } = this;
        await this.clickByRole('link', 'Drivers');
        await this.fillByRole('textbox', 'Search by name, phone, email', driverName);
        await this.clickElement(`text=${driverName}`);
    }

    /**
     * Verifies that the driver is visible on the page
     * @private
     * @throws {Error} If driver is not found
     */
    async verifyDriverFound() {
        const { driverName } = this;
        try {
            await this.textToBeVisible(driverName);
            await expect(this.page.getByRole('heading', { name: driverName })).toBeVisible();
        } catch (error) {
            throw new Error(`Driver ${driverName} not found: ${error.message}`);
        }
    }
}

module.exports = DriverPage;
