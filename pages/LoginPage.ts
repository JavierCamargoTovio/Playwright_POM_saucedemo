import { Page, Locator } from "@playwright/test";
import { LoginDto } from "../models/LoginDto";

export class LoginPage {
    readonly page: Page;
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.usernameInput =  page.getByRole('textbox', { name: 'Username' });
        this.passwordInput = page.getByRole('textbox', { name: 'Password' });
        this.loginButton = page.locator('#login-button');
    }

    async login(loginDto: LoginDto) {
        await this.usernameInput.fill(loginDto.username);
        await this.passwordInput.fill(loginDto.password);
        await this.loginButton.click();
    }
}