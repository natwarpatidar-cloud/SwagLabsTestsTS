import { Locator, Page } from "@playwright/test";

export class InventoryLocators {
    readonly page: Page;
    readonly backpackATCButton: Locator;
    readonly backpack: Locator;
    readonly backpackDescription: Locator;
    readonly backpackPrice: Locator
    readonly cheapestItem: Locator;
    readonly inventoryItems: Locator;
    readonly inventoryItemName: Locator;
    readonly backToProductsButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.backpackATCButton = page.locator('[data-test="add-to-cart-sauce-labs-backpack"]');
        this.backpack = page.locator('[data-test="item-4-title-link"]');
        this.backpackDescription = page.locator('[data-test="inventory-item-desc"]');
        this.backpackPrice = page.locator('[data-test="inventory-item-price"]');
        this.cheapestItem = page.locator('[data-test="inventory-item"]').first();
        this.inventoryItems = page.locator('.inventory_item');
        this.backToProductsButton = page.locator('[data-test="back-to-products"]');
        this.inventoryItemName = page.locator('.inventory_item_name');
    }
}