import { test, expect } from '@playwright/test';

let baseURL = 'https://sweetshop.netlify.app';
let aboutURL = `${baseURL}/about`;

test.beforeEach('Open a page', async ({ page }) => {
    await page.goto(aboutURL);
});

test.describe('Checking elements', () => {
    test('Navigation Bar', async ({ page }) => {
        let sweetsElement = page.locator('//nav//li[descendant::a[@href=\'/sweets\']]');
        let aboutElement = page.locator('//nav//li[descendant::a[@href=\'/about\']]');
        let loginElement = page.locator('//nav//li[descendant::a[@href=\'/login\']]');
        let basketElement = page.locator('//nav//li[descendant::a[@href=\'/basket\']]');
    
        await expect(sweetsElement).not.toHaveAttribute('class', 'active');
        await expect(aboutElement).toHaveAttribute('class', /*active*/);
        await expect(loginElement).not.toHaveAttribute('class', 'active');
        await expect(basketElement).not.toHaveAttribute('class', 'active');
    });
    
    test('Main body', async ({ page }) => {

        let headerElement = page.locator('//header//h1');
        let describe1Element = page.locator('//header//p').nth(0);
		let describe2Element = page.locator('//header//p').nth(1);

        let headerText = 'Sweet Shop Project';
        let describe1Text = 'An intentionally broken web application to help demonstrate Chrome DevTools.';
		let describe2Text = 'Sweet Shop is a project created to help demonstrate some of the great features of the Chrome DevTools which may be of use to people who help test web applications. Sweet Shop encompasses common issues found in real-world web applications!';
        
        await expect(headerElement).toHaveText(headerText);
        await expect(describe1Element).toHaveText(describe1Text);
        await expect(describe2Element).toHaveText(describe2Text);
    });
});

test('Footer', async ({ page }) => {   
    let footerElement = page.locator('//footer//p');
    let footerDescribe = 'Sweet Shop Project 2018';

    await expect(footerElement).toHaveText(footerDescribe);
});