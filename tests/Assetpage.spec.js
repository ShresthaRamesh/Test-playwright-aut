import { test, expect } from '@playwright/test';
import AssetPage from '../Pages/AssetPage';
import LoginPage from '../Pages/LoginPage';
import testdata from '../testdata/testdata.json';


test('Assets Creation', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.performValidLogin(
        testdata.base_url,
        testdata.valid_user.phone,
        testdata.valid_user.password
    );

    const assetPage = new AssetPage(page);
    await assetPage.navigateToAssetPage();

    await expect(page.getByText('Customer asset create').first()).toBeVisible();
    console.log('Assets Created Successfully.');

    //to verify the assets
    await assetPage.searchAssets();
    await assetPage.assetFound();

});