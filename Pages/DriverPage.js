
import RandomGenerator from "./RandomGenerator";
import { expect } from "@playwright/test";

/**
 * Represents a page for managing driver operations.
 * Utilizes the RandomGenerator class to generate random driver details.
 * 
 * @constructor
 * @param {object} page - The Playwright page object for interacting with the browser.
 * 
 * @property {string} driverName - Randomly generated driver name.
 * @property {string} phoneNumber - Randomly generated phone number.
 * @property {string} email - Randomly generated email address.
 * 
 * @method createNewDriver - Automates the process of creating a new driver by navigating to the driver section,
 *                           filling in driver details, submitting the form, and verifying the driver creation.
 * 
 * @method navigateToDriverSection - Navigates to the driver section in the application.
 * 
 * @method fillDriverDetails - Fills in the driver details form with the generated driver name, phone number, and email.
 * 
 * @method submitDriverForm - Submits the driver creation form.
 * 
 * @method searchdriver - Searches for the newly created driver using the driver name.
 * 
 * @method driverfound - Verifies that the driver has been successfully created and is visible on the page.
 */

class DriverPage {
    constructor(page) {
        this.page = page;
        const { drivername } = new RandomGenerator().generateRandomName();
        this.driverName = drivername;
        this.phoneNumber = new RandomGenerator().generateRandomPhoneNumber();
        this.email = new RandomGenerator().generateRandomEmail();
    }

    async createNewDriver() {
        const { driverName, phoneNumber, email } = this;
        try {
            await this.navigateToDriverSection();
            await this.fillDriverDetails(driverName, phoneNumber, email);
            await this.submitDriverForm();
            await this.searchdriver();
            await this.driverfound();
        } catch (error) {
            console.error("Error creating new driver:", error);
            throw error;
        }
    }

    async navigateToDriverSection() {
        const { page } = this;
        await page.getByRole('button', { name: 'Operations ' }).click();
        await page.getByRole('link', { name: 'Self Customer' }).click();
        await page.getByRole('link', { name: 'Drivers' }).click();
        await page.getByRole('button', { name: 'Add Driver' }).click();
    }

    async fillDriverDetails(driverName, phoneNumber, email) {
        const { page } = this;
        await page.getByRole('textbox', { name: 'NAME *' }).fill(driverName);
        await page.getByRole('textbox', { name: 'ERP ID' }).fill('123');
        await page.getByRole('textbox', { name: 'EMAIL' }).fill(email);
        await page.getByRole('textbox', { name: 'phone' }).fill(phoneNumber);
        await page.getByRole('group').filter({ hasText: 'statusSelect...' }).locator('svg').click();
        await page.getByRole('button', { name: 'Company' }).click();
        await page.locator('label').filter({ hasText: 'PRIMARY ?' }).locator('span').first().click();
    }

    async submitDriverForm() {
        const { page } = this;
        await page.getByRole('button', { name: 'Create' }).click();
    }


    async searchdriver(){
        const { page, driverName } = this;
        await page.getByRole('link', { name: 'Drivers', exact: true }).click();
        await page.getByRole('textbox', { name: 'Search by name, phone, email' }).click();
        await page.getByRole('textbox', { name: 'Search by name, phone, email' }).fill(driverName);
        await page.getByText(driverName).first().click();     
    }

    async driverfound(){
        const {page, driverName} = this;
        try {
            await expect(page.getByRole('heading', { name: `${driverName}` })).toBeVisible();
        } catch (error) {
            console.error("Driver not found:", error);
            throw error; // Rethrow the error to ensure the test fails
        }
    }
}

module.exports = DriverPage;
