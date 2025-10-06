import { Locator, Page } from "@playwright/test";

export class HomePageLocators {
    readonly page: Page;
    readonly cart: Locator;
    readonly cartBadge: Locator;
    readonly filterButton: Locator;
    readonly pageTitle: Locator;
    readonly menuIcon: Locator;

    constructor(page: Page) {
        this.page = page;
        this.cart = page.locator('[class="shopping_cart_link"]');
        this.cartBadge = page.locator('[data-test="shopping-cart-badge"]');
        this.filterButton = page.locator('[data-test="product-sort-container"]');
        this.pageTitle = page.locator('[data-test="title"]');
        this.menuIcon = page.getByRole('button', { name: 'Open Menu' })
    }
}