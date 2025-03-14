import RandomName from "./RandomName";
import { expect } from "@playwright/test";

class AssetPage {
    constructor(page) {
        this.page = page;
        this.assetName = new RandomName().generateRandomName();
    }

    async navigatetoassetpage() {
        const { page, assetName } = this;
        await page.getByRole('button', { name: 'Operations ' }).click();
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