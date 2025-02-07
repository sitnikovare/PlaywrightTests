import { test, expect } from '@playwright/test';

let baseURL = 'https://sweetshop.netlify.app';

test('Checking the page title', async ({ page }) => {
    await page.goto(baseURL);

    await expect(page).toHaveTitle('Sweet Shop');
});

test.describe('Checking buttons', () => {
    test('Button: Browse Sweets', async ({ page }) => {
        await page.goto(baseURL);
    
        await page.getByRole('link', {name: 'Browse Sweets'}).click();
    
        await expect(page.locator('span.lead')).toHaveText('Browse our delicious choice of retro sweets.');
    });
    
    test('Button: Add to Basket', async ({ page }) => {
        await page.goto(baseURL);
    
        await expect(page.locator('a[href=\'/basket\'] > span')).toHaveText('0');
        await page.locator('a.addItem').nth(0).click();
    
        await expect(page.locator('a[href=\'/basket\'] > span')).toHaveText('1');
    });
});

test.describe('Checking NavBar', () => {
    test('Item: Sweets', async ({ page }) => {
        await page.goto(baseURL);
    
        await page.locator('//nav//descendant-or-self::a[contains(@href, \'/sweets\')]').click();
    
        await expect(page).toHaveURL(`${baseURL}/sweets`);
    });
    
    test('Item: About', async ({ page }) => {
        await page.goto(baseURL);
    
        await page.locator('//nav//descendant-or-self::a[contains(@href, \'/about\')]').click();
    
        await expect(page).toHaveURL(`${baseURL}/about`);
    });
    
    test('Item: Login', async ({ page }) => {
        await page.goto(baseURL);
    
        await page.locator('//nav//descendant-or-self::a[contains(@href, \'/login\')]').click();
    
        await expect(page).toHaveURL(`${baseURL}/login`);
    });
    
    test('Item: Basket', async ({ page }) => {
        await page.goto(baseURL);
    
        await page.locator('//nav//descendant-or-self::a[contains(@href, \'/basket\')]').click();
    
        await expect(page).toHaveURL(`${baseURL}/basket`);
    });
    
    test('Item: Logo', async ({ page }) => {
        await page.goto(baseURL);
    
        await page.locator('a.navbar-brand').click();
    
        await expect(page).toHaveURL(`${baseURL}/`);
    });
});