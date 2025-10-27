import { expect, Page } from "@playwright/test";

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

    async addMultipleItems() {
        const items = this.getInventoryItems();
        let addedItems: string[] = [];
        for (let i = 0; i < 3; i++) {
            const item = items.nth(i);
            const title = await item.locator('[data-test="inventory-item-name"]').innerText();
            addedItems.push(title);
            const atcBtn = item.locator('[data-test^="add-to-cart"]');
            if(atcBtn) {
                await atcBtn.click();
            }
        }
    }

    async verifyAddedItems() {
        for (let i = 0; i < 3; i++) {
            const name = this.getInventoryItemName().nth(i)
            await expect(name).toBeVisible();
        }
    }

    async checkIfTitleVisible() {
        const items = this.getInventoryItems();
        for(let i = 0; i < 3; i++) {
            await expect(items.nth(i)).toBeVisible();
        }
    }
}