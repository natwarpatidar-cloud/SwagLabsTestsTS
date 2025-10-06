import { Locator, Page } from "@playwright/test";

export class InventoryLocators {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    getBackpackATCButton() {
        return this.page.locator('[data-test="add-to-cart-sauce-labs-backpack"]');
    }
    getBackpack() {
        return this.page.locator('[data-test="item-4-title-link"]');
    }
    getBackpackDescription() {
        return this.page.locator('[data-test="inventory-item-desc"]');
    }
    getBackpackPrice() {
        return this.page.locator('[data-test="inventory-item-price"]');
    }
    getCheapestItem() {
        return this.page.locator('[data-test="inventory-item"]').first();
    }
    getInventoryItems() {
        return this.page.locator('.inventory_item');
    }
    getBackToProductsButton() {
        return this.page.locator('[data-test="back-to-products"]');
    }
    getInventoryItemName() {
        return this.page.locator('.inventory_item_name');
    }
}