import { expect, Locator } from "@playwright/test";
import { BasePage } from "./base.page";
import { SALES_PORTAL_URL } from "config/env";
import { logStep } from "utils/report/logStep.utils";

export abstract class SalesPortalPage extends BasePage {
  readonly spinner = this.page.locator(".spinner-border");
  readonly toastMessage = this.page.locator(".toast-body");
  abstract readonly uniqueElement: Locator;

  @logStep("Waiting to open window")
  async waitForOpened() {
    await expect(this.uniqueElement).toBeVisible({ timeout: 10000 });
    await this.waitForSpinners();
  }

  @logStep("Waiting for stop spinners")
  async waitForSpinners() {
    await expect(this.spinner).toHaveCount(0, { timeout: 10000 });
  }

  @logStep("Open neccessary page")
  async open(route?: string) {
    await this.page.goto(SALES_PORTAL_URL + route);
  }
}