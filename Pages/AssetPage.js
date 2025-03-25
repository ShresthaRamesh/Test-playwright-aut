import RandomGenerator from "./RandomGenerator";
import { expect } from "@playwright/test";
/**
 * Represents the AssetPage class which provides methods to interact with the asset page.
 * 
 * @class
 * @param {object} page - The Playwright page object used for browser interactions.
 * 
 * @property {object} page - The Playwright page object.
 * @property {object} assetName - A randomly generated asset name.
 * 
 * @method navigatetoassetpage - Navigates to the asset page and fills out the form to add a new asset.
 * @method searchassets - Searches for assets by name on the asset page.
 * @method assetfound - Verifies that the asset with the generated name is visible on the page.
 */
class AssetPage {
    constructor(page) {
        this.page = page;
        const {assetName} = new RandomGenerator().generateRandomName();
        this.assetName= assetName;
    }

    async navigatetoassetpage() {
        const { page, assetName } = this;
        await page.getByRole('button', { name: 'Operations ' }).click();
        // await page.locator("xpath=//button[@data-testid='top-navbar-item']//span/div[contains(text(), 'Operations')]").click();
        await page.getByRole('link', { name: 'Self Customer' }).click();
        await page.getByRole('button', { name: 'Add Asset' }).click();
        await page.getByRole('textbox', { name: 'NAME' }).fill(assetName);
        await page.getByRole('textbox', { name: 'UNIQUE ID *' }).fill(assetName);
        await page.locator('div:nth-child(4) > .chakra-form-control > .css-79elbk > .css-bu9dy5 > .css-tn8go7 > .css-18euh9p').click();
        await page.getByRole('button', { name: 'Acme branch 2 - Kalanki' }).click();
        await page.locator('div:nth-child(7) > .chakra-form-control > .css-79elbk > .css-bu9dy5 > .css-tn8go7 > .css-18euh9p').click();
        await page.getByRole('button', { name: 'Additive', exact: true }).click();
        await page.getByRole('button', { name: 'Use ShipTo Location' }).click();
        await page.getByRole('textbox', { name: 'Compartment Names * ERP ID' }).fill('Com-'+ assetName );
        await page.getByRole('button', { name: 'Create' }).click();
    }


    async searchassets(){
        const { page, assetName } = this;
        await page.getByRole('link', { name: 'Assets', exact: true }).click();
        await page.getByRole('textbox', { name: 'Search by name, shipto,' }).click();
        await page.getByRole('textbox', { name: 'Search by name, shipto,' }).fill(assetName);
        await page.getByText(assetName).first().click();     
    }

    async assetfound(){
        const {page, assetName} = this;
        await expect(page.getByRole('heading', { name: `${assetName}` })).toBeVisible();
    }
}



module.exports = AssetPage;