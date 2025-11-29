import {
  test as base,
  expect,
  // Page
} from "@playwright/test";
import { HomePage } from "ui/pages/home.page";
import { SignInPage } from "ui/pages/signIn.page";
import { NewProductPage } from "ui/pages/products/product.page";
import { ProductsListPage } from "ui/pages/products/productsList.page";
import { AddNewProductUIService } from "ui/service/addNewProduct.ui-service";
import { HomeUIService } from "ui/service/home.ui-service";
import { LoginUIService } from "ui/service/login.ui-service";
import { ProductsListUIService } from "ui/service/productsList.ui-service";
import { CustomerListPage } from "ui/pages/customers/customersList.page";
import { NewCustomerPage } from "ui/pages/customers/addNewCustomer.page";
import { AddNewCustomerUIService } from "ui/service/addNewCustomer.ui-service";
import { CustomersListUIService } from "ui/service/customersList.ui-service";

export interface IPages {
  //pages
  loginPage: SignInPage;
  homePage: HomePage;
  productsListPage: ProductsListPage;
  addNewProductPage: NewProductPage;
  editProductPage: NewProductPage;
  customerListPage: CustomerListPage;
  addNewCustomerPage: NewCustomerPage;

  //ui-services
  homeUIService: HomeUIService;
  productsListUIService: ProductsListUIService;
  addNewProductUIService: AddNewProductUIService;
  loginUIService: LoginUIService;
  homeUIServise: HomeUIService;
  customersListUIService: CustomersListUIService;
  addNewCustomerUIService: AddNewCustomerUIService;
}

export const test = base.extend<IPages>({
  //pages
  loginPage: async ({ page }, use) => {
    await use(new SignInPage(page));
  },

  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },
  productsListPage: async ({ page }, use) => {
    await use(new ProductsListPage(page));
  },
  addNewProductPage: async ({ page }, use) => {
    await use(new NewProductPage(page));
  },
  editProductPage: async ({ page }, use) => {
    await use(new NewProductPage(page));
  },

  customerListPage: async ({ page }, use) => {
    await use(new CustomerListPage(page));
  },
  addNewCustomerPage: async ({ page }, use) => {
    await use(new NewCustomerPage(page));
  },

  //ui-services
  homeUIService: async ({ page }, use) => {
    await use(new HomeUIService(page));
  },

  productsListUIService: async ({ page }, use) => {
    await use(new ProductsListUIService(page));
  },

  addNewProductUIService: async ({ page }, use) => {
    await use(new AddNewProductUIService(page));
  },

  loginUIService: async ({ page }, use) => {
    await use(new LoginUIService(page));
  },

  customersListUIService: async ({ page }, use) => {
    await use(new CustomersListUIService(page));
  },

  addNewCustomerUIService: async ({ page }, use) => {
    await use(new AddNewCustomerUIService(page));
  },
});

// export class Pages {
//   public homePage: HomePage;
//   public productsListPage: ProductsListPage;
//   public addNewProductPage: AddNewProductPage;

//   constructor(page: Page) {
//     this.homePage = new HomePage(page);
//     this.productsListPage = new ProductsListPage(page);
//     this.addNewProductPage = new AddNewProductPage(page);
//   }
// }

// interface IPages {
//   pages: Pages;
// }

// const test = base.extend<IPages>({
//   pages: async ({ page }, use) => {
//     await use(new Pages(page));
//   },
// });

export { expect };