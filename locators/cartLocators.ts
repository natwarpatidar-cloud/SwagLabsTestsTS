import { Locator, Page } from "@playwright/test";

export class CartLocators {
    readonly page: Page;
    readonly contineuShoppingButton: Locator;
    readonly backpackRFCButton: Locator;
    readonly checkoutButton: Locator;
    readonly firstName: Locator;
    readonly lastName: Locator;
    readonly postalCode: Locator;
    readonly continueButton: Locator;
    readonly pageTitle: Locator;
    readonly finishShoppingButton: Locator;
    readonly thankyouMessage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.backpackRFCButton = page.locator('[data-test="remove-sauce-labs-backpack"]');
        this.contineuShoppingButton = page.locator('[data-test="continue-shopping"]');
        this.checkoutButton = page.locator('[data-test="checkout"]');

        this.firstName = page.locator('[data-test="firstName"]');
        this.lastName = page.locator('[data-test="lastName"]');
        this.postalCode = page.locator('[data-test="postalCode"]');

        this.continueButton = page.locator('[data-test="continue"]');
        this.pageTitle = page.locator('[data-test="title"]');

        this.finishShoppingButton = page.locator('[data-test="finish"]');
        this.thankyouMessage = page.locator('[data-test="complete-header"]');
    }
}