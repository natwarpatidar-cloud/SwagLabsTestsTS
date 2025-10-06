import { expect, Locator, Page } from "@playwright/test";

export class AuthPage {
    readonly page: Page;
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;
    readonly errorMessage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.usernameInput = page.locator('[data-test="username"]');
        this.passwordInput = page.locator('[data-test="password"]');
        this.loginButton = page.locator('[data-test="login-button"]');
        this.errorMessage = page.locator('[data-test="error"]');
    }

    async goto() {
        await this.page.goto('https://www.saucedemo.com/');
    }

    async login(username: string, password: string) {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
        await expect(this.page.locator('[data-test="title"]')).toHaveText(/Products/);
    }

    async logout() {
        const menuButton: Locator =  this.page.getByRole('button', { name: 'Open Menu' });
        await menuButton.click();
        const logoutLink: Locator = this.page.locator('[data-test="logout-sidebar-link"]');
        await logoutLink.click();
    }
}