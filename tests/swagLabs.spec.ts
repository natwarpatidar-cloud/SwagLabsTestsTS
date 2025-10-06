import { expect, test } from "@playwright/test";
import { login } from "../utils/login.ts";
import { AuthPage } from "../locators/authPage.ts";
import { HomePageLocators } from "../locators/homePageLocators.ts";
import { InventoryLocators } from "../locators/inventoryLocators.ts";
import { CartLocators } from "../locators/cartLocators.ts";

test.describe("Swag labs E2E test", () => {
    
    test.beforeEach(async({ page }) => {
        await page.waitForTimeout(2000);
        await login(page);
    });

    test("Logout Test", async({ page }) => {
        const authObj = new AuthPage(page);
        await authObj.logout();
    });
    
    test("Add to Cart", async({ page }) => {
        const homePageLocatorObj = new HomePageLocators(page);
        const inventory = new InventoryLocators(page);
        await inventory.backpackATCButton.click();
        await expect(homePageLocatorObj.cartBadge).toHaveText(/1/);
    });

    test("Remove Item from Cart", async({ page }) => {
        const inventory = new InventoryLocators(page);
        const homePageLocatorObj = new HomePageLocators(page);        
        await inventory.backpackATCButton.click();
        await homePageLocatorObj.cart.click();

        const cart = new CartLocators(page);
        await cart.backpackRFCButton.click();
        await expect(homePageLocatorObj.cartBadge).toBeHidden();
    });

    test("Sort Products", async({ page }) => {
        const homepage = new HomePageLocators(page);
        await homepage.filterButton.selectOption('lohi');

        const inventory = new InventoryLocators(page);
        await expect(inventory.cheapestItem).toContainText('$7.99');
    });

    test("Checkout flow", async({ page }) => {
        const inventory = new InventoryLocators(page);
        const items = inventory.inventoryItems;
        const addedItems = [];
        for(let i = 0; i < 3; i++) {
            const item = items.nth(i);
            const title = await item.locator('[data-test="inventory-item-name"]').innerText();
            addedItems.push(title);
            await item.locator('[data-test^="add-to-cart"]').click();
        }

        const homepage = new HomePageLocators(page);
        await homepage.cart.click();

        const cart = new CartLocators(page);
        await cart.checkoutButton.click();

        await cart.firstName.fill('Natwar');
        await cart.lastName.fill('Patidar');
        await cart.postalCode.fill('452001');
        await cart.continueButton.click();

        await expect(cart.pageTitle).toHaveText(/Checkout: Overview/);
        await cart.finishShoppingButton.click();
        await expect(cart.thankyouMessage).toHaveText(/Thank you for your order!/);
    });

    test("Product Details Page", async({ page }) => {
        const inventory = new InventoryLocators(page);
        await inventory.backpack.click();
        await expect(inventory.backToProductsButton).toHaveText(/Back to products/);

        await expect(inventory.backpackDescription).toBeVisible();
        await expect(inventory.backpackPrice).toBeVisible();
    });

    test("Cart Navigation test", async({ page }) => {
        const inventory = new InventoryLocators(page);
        const items = inventory.inventoryItems;
        const addedItems = [];
        for(let i = 0; i < 3; i++) {
            const item = items.nth(i);
            const title = await item.locator('[data-test="inventory-item-name"]').innerText();
            addedItems.push(title);
            await item.locator('[data-test^="add-to-cart"]').click();
        }

        const homepage = new HomePageLocators(page);
        await homepage.cart.click();

        for(let i = 0; i < 3; i++) {
            const name = inventory.inventoryItemName.nth(i)
            await expect(name).toBeVisible();
        }

        const cart = new CartLocators(page);
        await cart.contineuShoppingButton.click();
        await expect(homepage.pageTitle).toHaveText(/Products/);
    });

    test("Multiple Items checkout", async ({ page }) => {
        const inventory = new InventoryLocators(page);
        const items = inventory.inventoryItems;
        const addedItems = [];
        for(let i = 0; i < 3; i++) {
            const item = items.nth(i);
            const title = await item.locator('[data-test="inventory-item-name"]').innerText();
            addedItems.push(title);
            await item.locator('[data-test^="add-to-cart"]').click();
        }

        const homepage = new HomePageLocators(page);
        await homepage.cart.click();

        const cart = new CartLocators(page);
        await cart.checkoutButton.click();

        await cart.firstName.fill('Natwar');
        await cart.lastName.fill('Patidar');
        await cart.postalCode.fill('452001');
        await cart.continueButton.click();

        await expect(cart.pageTitle).toHaveText(/Checkout: Overview/);
        await cart.finishShoppingButton.click();
        await expect(cart.thankyouMessage).toHaveText(/Thank you for your order!/);
    });

});

test("Negative Login Test", async({ page }) => {
    const auth = new AuthPage(page);
    await auth.goto();
    await auth.usernameInput.fill("natndgkdj");
    await auth.passwordInput.fill("dfjs");
    await auth.loginButton.click();

    await expect(auth.errorMessage).toContainText('Epic sadface: Username and password do not match any user in this service');
});

test('UI Elements Verification', async({ page }) => {
    const auth = new AuthPage(page);
    await auth.goto();

    // Login form visibility test
    await expect(auth.usernameInput).toBeVisible();
    await expect(auth.passwordInput).toBeVisible();
    const button = auth.loginButton;
    await expect(button).toBeVisible();
    await expect(button).toBeEnabled();

    await login(page);

    // Home page icons visibility test
    const homepage = new HomePageLocators(page);
    await expect(homepage.cart).toBeVisible();
    await expect(homepage.menuIcon).toBeVisible();

    // CHeck product title visibility
    const inventory = new InventoryLocators(page);
    const items = inventory.inventoryItems;
    for(let i = 0; i < 3; i++) {
        await expect(items.nth(i)).toBeVisible();
    }
});