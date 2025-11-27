// Используя DDT подход, напишите тест сьют для проверки эндпоинта создания продукта:
//   Требования:
//   Name: обязательное, уникальное, Products's name should contain only 3-40 alphanumerical characters and one space between
//   Manufacturer: обязательное
//   Price: обязательное, Price should be in range 1-99999
//   Amount: обязательное, Amount should be in range 0-999
//   Notes: Notes should be in range 0-250 and without < or > symbols

import { test, expect } from "fixtures/api.fixture";
import { createProductSchema } from "data/schemas/products/create.schema";
import _ from "lodash";
import { validateResponse } from "utils/validation/validateResponse.utils";
import { invalidTestDataForCreateProduct } from "data/salesPortal/products/createProductData";

test.describe("[API] [Sales Portal] [Products]", () => {
//   let id = "";
  let token = "";

  // логин перед каждым тестом
  test.beforeEach(async ({ loginApiService }) => {
    token = await loginApiService.loginAsAdmin();
  });

  for (const { title, productData, successMessage, statusCode} of invalidTestDataForCreateProduct) {
    test(`${title}`, async ({ productsApi }) => {
        const createdProduct = await productsApi.create(productData, token);
        // console.log(createProductSchema.properties.Product.properties)
        validateResponse(createdProduct, {
            status: statusCode,
            IsSuccess: false,
            ErrorMessage: successMessage,
        });
    });
  };
});