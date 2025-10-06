import { expect, Page, test } from "@playwright/test";
import { login } from "../utils/login.ts";
import { AuthPage } from "../locators/authPage.ts";
import { HomePageLocators } from "../locators/homePageLocators.ts";
import { InventoryLocators } from "../locators/inventoryLocators.ts";
import { CartLocators } from "../locators/cartLocators.ts";

let page: Page;
let context;
let authObj: AuthPage;
let cart: CartLocators;
let homepage: HomePageLocators;
let inventory: InventoryLocators;

test.beforeAll(async ({ browser }) => {
    context = await browser.newContext();
    page = await context.newPage();
    authObj = new AuthPage(page);
    cart = new CartLocators(page);
    homepage = new HomePageLocators(page);
    inventory = new InventoryLocators(page);
    await login(page);
});

test.afterAll(async () => {
    await authObj.logout();
});

test("Add to Cart", async () => {
    await inventory.getBackpackATCButton().click();
    await expect(homepage.getCartBadge()).toHaveText(/1/);
});

test("Remove Item from Cart", async () => {
    await homepage.getCart().click();

    await cart.getBackpackRFCButton().click();
    await expect(homepage.getCartBadge()).toBeHidden();
    await cart.getContineuShoppingButton().click();
});

test("Sort Products", async () => {
    await homepage.getFilterButton().selectOption('lohi');

    await expect(inventory.getCheapestItem()).toContainText('$7.99');
});

test("Checkout flow", async () => {
    const items = inventory.getInventoryItems();
    const addedItems = [];
    for (let i = 0; i < 3; i++) {
        const item = items.nth(i);
        const title = await item.locator('[data-test="inventory-item-name"]').innerText();
        addedItems.push(title);
        await item.locator('[data-test^="add-to-cart"]').click();
    }

    await homepage.getCart().click();

    await cart.getCheckoutButton().click();

    await cart.getFirstName().fill('Natwar');
    await cart.getLastName().fill('Patidar');
    await cart.getPostalCode().fill('452001');
    await cart.getContinueButton().click();

    await expect(cart.getPageTitle()).toHaveText(/Checkout: Overview/);
    await cart.getFinishShoppingButton().click();
    await expect(cart.getThankyouMessage()).toHaveText(/Thank you for your order!/);
    await cart.getBackToHomeButton().click();
});

test("Product Details Page", async () => {
    await inventory.getBackpack().click();
    await expect(inventory.getBackToProductsButton()).toHaveText(/Back to products/);

    await expect(inventory.getBackpackDescription()).toBeVisible();
    await expect(inventory.getBackpackPrice()).toBeVisible();
    await inventory.getBackToProductsButton().click();
});

// test("Cart Navigation test", async () => {
//     const inventory = new InventoryLocators(page);
//     const items = inventory.inventoryItems;
//     const addedItems = [];
//     for (let i = 0; i < 3; i++) {
//         const item = items.nth(i);
//         const title = await item.locator('[data-test="inventory-item-name"]').innerText();
//         addedItems.push(title);
//         await item.locator('[data-test^="add-to-cart"]').click();
//     }

//     const homepage = new HomePageLocators(page);
//     await homepage.cart.click();

//     for (let i = 0; i < 3; i++) {
//         const name = inventory.inventoryItemName.nth(i)
//         await expect(name).toBeVisible();
//     }

//     const cart = new CartLocators(page);
//     await cart.contineuShoppingButton.click();
//     await expect(homepage.pageTitle).toHaveText(/Products/);
// });

test("Multiple Items checkout", async () => {
    const items = inventory.getInventoryItems();
    const addedItems = [];
    for (let i = 0; i < 3; i++) {
        const item = items.nth(i);
        const title = await item.locator('[data-test="inventory-item-name"]').innerText();
        addedItems.push(title);
        const atcBtn = item.locator('[data-test^="add-to-cart"]');
        if(atcBtn) {
            await atcBtn.click();
        } else {
            continue;
        }
    }

    await homepage.getCart().click();

    for (let i = 0; i < 3; i++) {
        const name = inventory.getInventoryItemName().nth(i)
        await expect(name).toBeVisible();
    }

    await cart.getCheckoutButton().click();

    await cart.getFirstName().fill('Natwar');
    await cart.getLastName().fill('Patidar');
    await cart.getPostalCode().fill('452001');
    await cart.getContinueButton().click();

    await expect(cart.getPageTitle()).toHaveText(/Checkout: Overview/);
    await cart.getFinishShoppingButton().click();
    await expect(cart.getThankyouMessage()).toHaveText(/Thank you for your order!/);
    await cart.getBackToHomeButton().click();
});

test("Negative Login Test", async() => {
    await authObj.goto();
    await authObj.getUsernameInput().fill("natndgkdj");
    await authObj.getPasswordInput().fill("dfjs");
    await authObj.getLoginButton().click();

    await expect(authObj.getErrorMessage()).toContainText('Epic sadface: Username and password do not match any user in this service');
});

test('UI Elements Verification', async() => {
    await authObj.goto();

    // Login form visibility test
    await expect(authObj.getUsernameInput()).toBeVisible();
    await expect(authObj.getPasswordInput()).toBeVisible();
    const button = authObj.getLoginButton();
    await expect(button).toBeVisible();
    await expect(button).toBeEnabled();

    await login(page);

    // Home page icons visibility test
    await expect(homepage.getCart()).toBeVisible();
    await expect(homepage.getMenuIcon()).toBeVisible();

    // CHeck product title visibility
    const items = inventory.getInventoryItems();
    for(let i = 0; i < 3; i++) {
        await expect(items.nth(i)).toBeVisible();
    }
});