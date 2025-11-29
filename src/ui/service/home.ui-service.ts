import test, { Page } from "@playwright/test";
import { HomeModuleButton, HomePage } from "ui/pages/home.page";
import { CustomerListPage } from "ui/pages/customers/customersList.page";
import { ProductsListPage } from "ui/pages/products/productsList.page";
import { logStep } from "utils/report/logStep.utils";

export class HomeUIService {
  homePage: HomePage;
  productsListPage: ProductsListPage;
  customersListPage: CustomerListPage;

  constructor(private page: Page) {
    this.homePage = new HomePage(page);
    this.productsListPage = new ProductsListPage(page);
    this.customersListPage = new CustomerListPage(page);
  }

  @logStep("Open necessary page")
  async openModule(moduleName: HomeModuleButton) {
    await test.step(`Search for "${moduleName}" on Products List page`, async () => {
        await this.homePage.clickOnViewModule(moduleName);

        switch (moduleName) {
          case "Products":
            await this.productsListPage.waitForOpened();
          case "Customers":
            await this.customersListPage.waitForOpened();
      }
    })
  }
}