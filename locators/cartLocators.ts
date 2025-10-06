import { Page } from "@playwright/test";

export class CartLocators {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    getBackpackRFCButton () {
        return this.page.locator('[data-test="remove-sauce-labs-backpack"]');
    }

    getContineuShoppingButton () {
        return this.page.locator('[data-test="continue-shopping"]');
    }

    getCheckoutButton () {
        return this.page.locator('[data-test="checkout"]');
    }

    getFirstName () {
        return this.page.locator('[data-test="firstName"]');
    }

    getLastName () {
        return this.page.locator('[data-test="lastName"]');
    }

    getPostalCode () {
        return this.page.locator('[data-test="postalCode"]');
    }

    getContinueButton () {
        return this.page.locator('[data-test="continue"]');
    }   

    getPageTitle () {
        return this.page.locator('[data-test="title"]');
    }

    getFinishShoppingButton () {
        return this.page.locator('[data-test="finish"]');
    }

    getThankyouMessage () {
        return this.page.locator('[data-test="complete-header"]');
    }

    getBackToHomeButton () {
        return this.page.locator('[data-test="back-to-products"]');
    }
}