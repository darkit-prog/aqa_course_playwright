// Написать Page Object класс для страницы Sign In:
//   - email input
//   - password input
//   - login button
//   - fillCredentials method
//   - click on login button method
import { BasePage } from "./base.page";
import { ICredentials } from "data/types/credentials.types";
import { SALES_PORTAL_URL } from "config/env";

export class SignInPage extends BasePage {
    readonly emailInput = this.page.locator("#emailinput");
    readonly passwordInput = this.page.locator("#passwordinput");
    readonly loginButton = this.page.locator("button[type='submit']");
    readonly uniqueElement = this.page.locator("#signInPage");

    async open() {
        await this.page.goto(SALES_PORTAL_URL);
    }

    async sighIn(credentials: Partial<ICredentials>) {
        if (credentials.username) await this.emailInput.fill(credentials.username);
        if (credentials.password) await this.passwordInput.fill(credentials.password);
        await this.loginButton.click();
    }
}