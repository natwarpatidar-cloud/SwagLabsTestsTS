import { Page } from "@playwright/test";

export class HomePageLocators {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    getCart () {
        return this.page.locator('[class="shopping_cart_link"]');
    }
    getCartBadge() {
        return this.page.locator('[data-test="shopping-cart-badge"]');
    }
    getFilterButton() {
        return this.page.locator('[data-test="product-sort-container"]');
    }
    getPageTitle() {
        return this.page.locator('[data-test="title"]');
    }
    getMenuIcon() {
        return this.page.getByRole('button', { name: 'Open Menu' });
    }
}