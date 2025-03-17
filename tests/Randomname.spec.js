
const { test, expect } = require('@playwright/test');
const RandomGenerator = require('../Pages/RandomGenerator');

test('Generate a random name', async ({ page }) => {
    const randomName = new RandomGenerator();
    const name = await randomName.generateRandomName(); // Assuming this is async

    console.log('Generated Random Name:', name); // Print the name
});

test('Generate a random number', async ({ page }) => {
    const randomnumber = new RandomGenerator();
    const number = randomnumber.generateRandomPhoneNumber();

    console.log('Generated Random number:', number); 
});

test('Generate a random email', async ({ page }) => {
    const randomEmail = new RandomGenerator();
    const email = await randomEmail.generateRandomEmail(); 

    console.log('Generated Random Email:', email); // Print the name
});
