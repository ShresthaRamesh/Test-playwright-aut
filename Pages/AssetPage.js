import RandomGenerator from "./RandomGenerator";
import { expect } from "@playwright/test";
const BasePage = require('./BasePage');

/**
 * Represents the AssetPage class which provides methods to interact with the asset page.
 * 
 * @class
 * @extends BasePage
 * @param {object} page - The Playwright page object used for browser interactions.
 * @param {string} [assetName] - Optional asset name. If not provided, will be generated.
 */
class AssetPage extends BasePage {
    constructor(page, assetName) {
        super(page);
        this.assetName = assetName || new RandomGenerator().generateRandomName().name;
    }

    /**
     * Navigates to the asset page and creates a new asset
     * @throws {Error} If navigation or form filling fails
     */
    async navigateToAssetPage() {
        try {
            // Navigate through menu
            await this.clickByRole('button', 'Operations');
            await this.clickByRole('link', 'Self Customer');
            await this.clickByRole('button', 'Add Asset');

            // Fill asset details
            await this.fillAssetDetails();

            // Create asset
            await this.clickByRole('button', 'Create');
            await this.waitForNavigation();
        } catch (error) {
            throw new Error(`Failed to navigate to asset page: ${error.message}`);
        }
    }

    /**
     * Fills the asset details form
     * @private
     */
    async fillAssetDetails() {
        const { assetName } = this;
        
        // Fill basic details
        await this.fillByRole('textbox', 'NAME', assetName);
        await this.fillByRole('textbox', 'UNIQUE ID *', assetName);
        
        // Select location
        await this.clickWithRetry('div:nth-child(4) > .chakra-form-control > .css-79elbk > .css-bu9dy5 > .css-tn8go7 > .css-18euh9p');
        await this.clickByRole('button', 'Acme branch 2 - Kalanki', { exact: true });
        
        // Select type - Using first option for multiple matches
        await this.clickWithRetry('div:nth-child(7) > .chakra-form-control > .css-79elbk > .css-bu9dy5 > .css-tn8go7 > .css-18euh9p');
        await this.clickByRole('button', 'Bio', { exact: true, first: true });
        
        // Select status
        await this.clickWithRetry('[role="group"]:has-text("statusSelect...") svg');
        await this.clickByRole('button', 'Company', { exact: true });
        
        // Set location and compartment
        await this.clickByRole('button', 'Use ShipTo Location', { exact: true });
        await this.fillByRole('textbox', 'Compartment Names * ERP ID', `Com-${assetName}`);
    }

    /**
     * Searches for assets by name
     * @throws {Error} If search fails
     */
    async searchAssets() {
        try {
            const { assetName } = this;
            
            // Click on Assets link - using first:true since we want the first "Assets" link, not "Rental Assets"
            // await this.clickByRole('link', 'Assets', { exact: true, first: true });
            
            // Wait for search field and fill it
            await this.page.waitForLoadState('networkidle');
            await this.fillByRole('textbox', 'Search by name, shipto,', assetName);
            
            // Wait for and click the search result
            await this.waitForElement(`text=${assetName}`);
            await this.clickElement(`text=${assetName}`);
        } catch (error) {
            throw new Error(`Failed to search for assets: ${error.message}`);
        }
    }

    /**
     * Verifies that the asset is visible on the page
     * @throws {Error} If asset is not found
     */
    async assetFound() {
        try {
            const { assetName } = this;
            await this.textToBeVisible(assetName);
            await expect(this.page.getByRole('heading', { name: assetName })).toBeVisible();
        } catch (error) {
            throw new Error(`Asset ${this.assetName} not found: ${error.message}`);
        }
    }
}

module.exports = AssetPage;