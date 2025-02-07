import { test, expect } from '@playwright/test';

let baseURL = 'https://sweetshop.netlify.app';
let sweetsURL = `${baseURL}/sweets`;

test.beforeEach('Open a page', async ({ page }) => {
    await page.goto(sweetsURL);
});

test.describe('Checking elements', () => {
    test('Page', async ({ page }) => {
        let mainHeaderLocator = 'div.container > header > h1';
        let describeLocator = '//span[@class=\'lead\']';
        let cardListLocator = 'div.card';

        let headerText = 'Browse sweets';
        let describeText = 'Browse our delicious choice of retro sweets.';
    
        await expect(page.locator(mainHeaderLocator)).toHaveText(headerText);
        await expect(page.locator(describeLocator)).toHaveText(describeText);
        await expect(page.locator(cardListLocator).nth(0)).toBeVisible();
    });
    
    test('Card', async ({ page }) => {

        let cardImageElement = page.locator('div.card > img').nth(0);
        let cardTitleElement = page.locator('h4.card-title').nth(0);
		let cardDescribeElement = page.locator('p.card-text').nth(0);
		let cardPriceElement = page.locator('//div[@class=\'card\']//descendant-or-self::small').nth(0);
		let cardButtonElement = page.locator('//div[@class=\'card\']//descendant-or-self::a').nth(0);

        let cardImagePath = 'img/cups.jpg';
        let cardTitleText = 'Chocolate Cups';
		let cardDescribeText = 'Candy Chocolate Cups.';
		let cardPriceAmount = '£1.00';
        
        await expect(cardImageElement).toHaveAttribute('src', cardImagePath);
        await expect(cardTitleElement).toHaveText(cardTitleText);
        await expect(cardDescribeElement).toHaveText(cardDescribeText);
        await expect(cardPriceElement).toHaveText(cardPriceAmount);
        await expect(cardButtonElement).toBeVisible();
    });
});

test('Adding a product to the cart', async ({ page }) => {   
    let backetCounterElement = page.locator('a[href=\'/basket\'] > span');
    let addToCartButton = page.locator('a.addItem').nth(0);

    await expect(backetCounterElement).toHaveText('0');
    await addToCartButton.click();

    await expect(backetCounterElement).toHaveText('1');
});