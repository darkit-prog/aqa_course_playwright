import { test as base, expect } from "@playwright/test";
import { HomePage } from "ui/pages/home.page";
import { AddNewProductPage } from "ui/pages/products/addNewProduct.page";
import { ProductsListPage } from "ui/pages/products/productsList.page";
import { SignInPage } from "ui/pages/signIn.page";

export interface IPages {
  homePage: HomePage;
  productsListPage: ProductsListPage;
  addNewProductPage: AddNewProductPage;
  signInPage: SignInPage
}

export const test = base.extend<IPages>({
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },
  productsListPage: async ({ page }, use) => {
    await use(new ProductsListPage(page));
  },
  addNewProductPage: async ({ page }, use) => {
    await use(new AddNewProductPage(page));
  },

  signInPage: async ({ page }, use) => {
    await use(new SignInPage(page));
  }
});

export { expect };