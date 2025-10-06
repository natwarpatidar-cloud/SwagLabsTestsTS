import { expect, Page } from "@playwright/test";

export class AuthPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    getUsernameInput () {
        return this.page.locator('[data-test="username"]');;
    }

    getPasswordInput () {
        return this.page.locator('[data-test="password"]');
    }

    getLoginButton () {
        return this.page.locator('[data-test="login-button"]');
    }

    getErrorMessage () {
        return this.page.locator('[data-test="error"]');
    }

    getMenuButton () {
        return this.page.getByRole('button', { name: 'Open Menu' });
    }

    getLogoutLink () {
        return this.page.locator('[data-test="logout-sidebar-link"]');
    }

    getPageTitle () {
        return this.page.locator('[data-test="title"]');
    }

    async goto() {
        await this.page.goto('https://www.saucedemo.com/');
    }

    async login(username: string, password: string) {
        await this.getUsernameInput().fill(username);
        await this.getPasswordInput().fill(password);
        await this.getLoginButton().click();
        await expect(this.getPageTitle()).toHaveText(/Products/);
    }

    async logout() {
        await this.getMenuButton().click();
        await this.getLogoutLink().click();
    }
}