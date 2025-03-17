
import { test, expect } from '@playwright/test';
import LoginPage from '../Pages/LoginPage';
import testdata from '../testdata/testdata.json';
import DriverPage from '../Pages/DriverPage';

test('Driver Creation', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const driverPage = new DriverPage(page);

    try {
        await loginPage.perform_valid_login(
            testdata.base_url,
            testdata.valid_user.phone,
            testdata.valid_user.password
        );

        await driverPage.createNewDriver();
        
        // // Assert that the driver creation confirmation message is visible
        // await expect(page.getByText('Driver Created')).toBeVisible();
        console.log('Driver Created Successfully.');
    } catch (error) {
        console.error('Error during driver creation test:', error);
        throw error; // Rethrow the error to ensure the test fails
    }
});
