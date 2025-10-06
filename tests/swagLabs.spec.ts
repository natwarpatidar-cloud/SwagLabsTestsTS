import { expect, test } from "@playwright/test";
import { login } from "../utils/login.ts";

test.describe("Swag labs E2E test", () => {
    
    test.beforeEach(async({ page }) => {
        await login(page);
    });

    test("Add to Cart", async({ page }) => {
        await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
        await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText(/1/);
    });

    test("Logout Test", async({ page }) => {
        await page.getByRole('button', { name: 'Open Menu' }).click();
        await page.locator('[data-test="logout-sidebar-link"]').click();
    });

    test("Remove Item from Cart", async({ page }) => {
        await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
        await page.locator('[class="shopping_cart_link"]').click();
        await page.locator('[data-test="remove-sauce-labs-backpack"]').click();
        await expect(page.locator('[data-test="shopping-cart-badge"]')).toBeHidden();
    });

    test("Sort Products", async({ page }) => {
        await page.locator('[data-test="product-sort-container"]').selectOption('lohi');
        const firstItem = page.locator('[data-test="inventory-item"]').first();
        await expect(firstItem).toContainText('$7.99');
    });

    test("Checkout flow", async({ page }) => {
        const inventoryItems = page.locator('.inventory_item');
        const addedItems = [];
        for(let i = 0; i < 3; i++) {
            const item = inventoryItems.nth(i);
            const title = await item.locator('[data-test="inventory-item-name"]').innerText();
            addedItems.push(title);
            await item.locator('[data-test^="add-to-cart"]').click();
        }

        await page.locator('[data-test="shopping-cart-link"]').click();
        await page.locator('[data-test="checkout"]').click();

        await page.locator('[data-test="firstName"]').fill('Natwar');
        await page.locator('[data-test="lastName"]').fill('Patidar');
        await page.locator('[data-test="postalCode"]').fill('452001');

        await page.locator('[data-test="continue"]').click();

        const title = page.locator('[data-test="title"]');
        await expect(title).toHaveText(/Checkout: Overview/);

        await page.locator('[data-test="finish"]').click();

        const thankyouMessage = page.locator('[data-test="complete-header"]');
        await expect(thankyouMessage).toHaveText(/Thank you for your order!/);
    });

    test("Product Details Page", async({ page }) => {
        await page.locator('[data-test="inventory-item-name"]').first().click();
        await expect(page.locator('[data-test="back-to-products"]')).toHaveText(/Back to products/);
        const desc = page.locator('[data-test="inventory-item-desc"]').first();
        await expect(desc).toBeVisible();
        const price = page.locator('[data-test="inventory-item-price"]').first();
        await expect(price).toBeVisible();
    });

    test("Cart Navigation test", async({ page }) => {
        const inventoryItems = page.locator('.inventory_item');

        const addedItems = [];

        for(let i = 0; i < 3; i++) {
            const item = inventoryItems.nth(i);
            const title = await item.locator('[data-test="inventory-item-name"]').innerText();
            addedItems.push(title);
            await item.locator('[data-test^="add-to-cart"]').click();
        }

        await page.locator('[data-test="shopping-cart-link"]').click();

        for(let i = 0; i < 3; i++) {
            const name = page.locator('.inventory_item_name').nth(i)
            await expect(name).toBeVisible();
        }

        await page.locator('[data-test="continue-shopping"]').click();
        await expect(page.locator('[data-test="title"]')).toHaveText(/Products/);
    });

    test("Multiple Items checkout", async ({ page }) => {
        const inventoryItems = page.locator('.inventory_item');
        const addedItems = [];
        for(let i = 0; i < 3; i++) {
            const item = inventoryItems.nth(i);
            const title = await item.locator('[data-test="inventory-item-name"]').innerText();
            addedItems.push(title);
            await item.locator('[data-test^="add-to-cart"]').click();
        }

        await page.locator('[data-test="shopping-cart-link"]').click();

        for(let i = 0; i < 3; i++) {
            const name = page.locator('.inventory_item_name').nth(i)
            await expect(name).toBeVisible();
        }

        await page.locator('[data-test="checkout"]').click();

        await page.locator('[data-test="firstName"]').fill('Natwar');
        await page.locator('[data-test="lastName"]').fill('Patidar');
        await page.locator('[data-test="postalCode"]').fill('452001');

        await page.locator('[data-test="continue"]').click();

        const title = page.locator('[data-test="title"]');
        await expect(title).toHaveText(/Checkout: Overview/);

        await page.locator('[data-test="finish"]').click();

        const thankyouMessage = page.locator('[data-test="complete-header"]');
        await expect(thankyouMessage).toHaveText(/Thank you for your order!/);
    });

});

test("Negative Login Test", async({ page }) => {
    await page.goto("https://www.saucedemo.com/");
    await page.locator('[data-test="username"]').fill("natndgkdj");
    await page.locator('[data-test="password"]').fill("dfjs");
    await page.locator('[data-test="login-button"]').click();

    const errorMessage = page.locator('[data-test="error"]');
    await expect(errorMessage).toContainText('Epic sadface: Username and password do not match any user in this service');
});

test('UI Elements Verification', async({ page }) => {
    await page.goto("https://www.saucedemo.com/");

    await expect(page.locator('[data-test="username"]')).toBeVisible();
    await expect(page.locator('[data-test="password"]')).toBeVisible();
    const button = page.locator('[data-test="login-button"]');
    await expect(button).toBeVisible();
    await expect(button).toBeEnabled();

    await login(page);

    await expect(page.locator('[data-test="shopping-cart-link"]')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Open Menu' })).toBeVisible();

    const productTitles = page.locator('[data-test="inventory-item-name"]');
    await expect(productTitles.first()).toBeVisible();
});