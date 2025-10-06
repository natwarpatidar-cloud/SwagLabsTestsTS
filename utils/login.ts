import { Page } from '@playwright/test';
import { AuthPage } from '../locators/authPage';

export async function login(page: Page, username: string = "standard_user", password: string = "secret_sauce") {
    const authObj = new AuthPage(page);   
    await authObj.goto();
    await authObj.login(username, password);
}