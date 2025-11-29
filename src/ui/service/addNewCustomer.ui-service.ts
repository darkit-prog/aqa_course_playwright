import { expect, Page } from "@playwright/test";
import { apiConfig } from "config/apiConfig";
import { generateCustomerData } from "data/salesPortal/customers/generateCustomerData";
import { STATUS_CODES } from "data/statusCodes";
import { ICustomer, ICustomerResponse } from "data/types/customers.type";
import _ from "lodash";
import { NewProductPage, ProductsListPage } from "ui/pages/products";
import { logStep } from "utils/report/logStep.utils";

export class AddNewCustomerUIService {
  addNewCustomerPage: NewProductPage;
  productsListPage: ProductsListPage;

  constructor(private page: Page) {
    this.addNewCustomerPage = new NewProductPage(page);
    this.productsListPage = new ProductsListPage(page);
  }

  @logStep("Open Add Customer Page")
  async open() {
    await this.addNewCustomerPage.open("customers/add");
    await this.addNewCustomerPage.waitForOpened();
  }

  @logStep("Create Customer in Add Customer Page")
  async create(customerData?: Partial<ICustomer>) {
    const data = generateCustomerData(customerData);
    await this.addNewCustomerPage.fillForm(data);
    const response = await this.addNewCustomerPage.interceptResponse<ICustomerResponse, any>(
      apiConfig.endpoints.customers,
      this.addNewCustomerPage.clickSaveNewProduct.bind(this.addNewCustomerPage),
    );
    expect(response.status).toBe(STATUS_CODES.CREATED);
    expect(_.omit(response.body.Customer, "_id", "createdOn")).toEqual(data);

    await this.productsListPage.waitForOpened();
    return response.body.Customer;
  }
}