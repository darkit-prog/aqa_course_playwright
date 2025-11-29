import { Page } from "@playwright/test";
import { credentials } from "config/env";
import { ICredentials } from "data/types/credentials.types";
import { HomePage } from "ui/pages/home.page";
import { SignInPage } from "ui/pages/signIn.page";
import { logStep } from "utils/report/logStep.utils";

export class LoginUIService {
  homePage: HomePage;
  loginPage: SignInPage;

  constructor(private page: Page) {
    this.homePage = new HomePage(page);
    this.loginPage = new SignInPage(page);
  }

  @logStep("Login via Api")
  async loginAsAdmin() {
    return await this.login(credentials);
  }

  @logStep("Login via UI")
  async login(credentials: ICredentials) {
    await this.loginPage.open();
    await this.loginPage.sighIn(credentials);
    await this.homePage.waitForOpened();
    const token = (await this.page.context().cookies()).find((c) => c.name === "Authorization")!.value;
    return token;
  }
}