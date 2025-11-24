// Написать Page Object класс для страницы Sign In:
//   - email input
//   - password input
//   - login button
//   - fillCredentials method
//   - click on login button method
import { BasePage } from "./base.page";
import { SALES_PORTAL_URL } from "config/env";
import { ICredentials } from "data/types/credentials.types";

export class SignInPage extends BasePage {
    readonly emailInput = this.page.locator("#emailinput");
    readonly passwordInput = this.page.locator("#passwordinput");
    readonly loginButton = this.page.locator("button[type='submit']");

    async open() {
        await this.page.goto(SALES_PORTAL_URL);
    }

    async sighIn(creds: ICredentials) {
        await this.emailInput.fill(creds.username);
        await this.passwordInput.fill(creds.password);
        await this.loginButton.click();
    }
}