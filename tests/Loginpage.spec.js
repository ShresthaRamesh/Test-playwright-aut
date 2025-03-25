import LoginPage from '../Pages/LoginPage';
import testdata from '../testdata/testdata.json';
import { test, expect } from '@playwright/test';

test.describe('Run login test', () => {

    test('Login successfully with valid phone and password', async ({ page }) => {
        // Initialize login page object
        const loginPage = new LoginPage(page);
        
        // Perform login with valid credentials
        await loginPage.performValidLogin(
            testdata.base_url,
            testdata.valid_user.phone,
            testdata.valid_user.password
        );

        // Verify successful login
        await expect(page).toHaveURL('https://client.avenger.fleetpanda.com/');
        console.log("Log in successfully");
    });

    test('Log in with invalid phone', async ({ page }) => {
        // Initialize login page object
        const loginPage = new LoginPage(page);
        
        // Attempt login with invalid phone
        await loginPage.performInvalidUsernameLogin(
            testdata.base_url,
            testdata.invalid_user.phone,
            testdata.invalid_user.password
        );
        
        // Verify error message is displayed
        await expect(page.getByText('Invalid phone or password.')).toBeVisible();
        console.log("Phone number is invalid!");
    });

    test('Log in with invalid password', async ({ page }) => {
        // Initialize login page object
        const loginPage = new LoginPage(page);
        
        // Attempt login with invalid password
        await loginPage.performInvalidPasswordLogin(
            testdata.base_url,
            testdata.invalid_user.phone,
            testdata.invalid_user.password
        );
        
        // Verify error message is displayed
        await expect(page.getByText('Invalid phone or password.')).toBeVisible();
        console.log('Password is invalid');

    });

});
