import { test as base, expect } from "@playwright/test";
import { RequestApi } from "api/apiClients/requestApi";
import { ProductsApi } from "api/api/products.api";
import { LoginApi } from "api/api/login.api";
import { LoginService } from "api/service/login.service";
import { ProductsApiService } from "api/service/products.service";
import { CustomerApi } from "api/api/customer.api";
import { CustomerApiService } from "api/service/customers.service";

export interface IApi {
  // api
  productsApi: ProductsApi;
  loginApi: LoginApi;
  customerApi: CustomerApi;

  //services
  productsApiService: ProductsApiService;
  loginApiService: LoginService;
  customerApiService: CustomerApiService;
}

const test = base.extend<IApi>({
  //api
  productsApi: async ({ request }, use) => {
    const apiClient = new RequestApi(request);
    const api = new ProductsApi(apiClient);
    await use(api);
  },

  loginApi: async ({ request }, use) => {
    const apiClient = new RequestApi(request);
    const api = new LoginApi(apiClient);
    await use(api);
  },

  customerApi: async ({ request }, use) => {
    const apiClient = new RequestApi(request);
    const api = new CustomerApi(apiClient);
    await use(api);
  },

  //services
  productsApiService: async ({ productsApi }, use) => {
    await use(new ProductsApiService(productsApi));
  },

  loginApiService: async ({ loginApi }, use) => {
    await use(new LoginService(loginApi));
  },

  customerApiService: async ({ customerApi }, use) => {
    await use(new CustomerApiService(customerApi));
  },

});

export { test, expect };