
const { test, expect } = require('@playwright/test');
const RandomName = require('../Pages/RandomName');

test('Generate a random name', async ({ page }) => {
    const randomName = new RandomName();
    await randomName.generateRandomName(); // Generate a name

    console.log('Generated Random Name:', "Fp-" + randomName.name()); // Print the name
});
