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
import { validTestDataForCreateProduct } from "data/salesPortal/products/createProductData";

test.describe("[API] [Sales Portal] [Products]", () => {
  let id = "";
  let token = "";

  // логин перед тестом
  test.beforeAll(async ({ loginApiService }) => {
    token = await loginApiService.loginAsAdmin();
  });

  // после каждого теста, где создастся продукт - удаляйте его
  test.afterEach(async ({ productsApiService }) => {
    if (id) await productsApiService.delete(token, id);
  });

  // Используйте LoginApiService, ProductsApi
  for (const { title, productData, successMessage, statusCode} of validTestDataForCreateProduct) {
    test(`${title}`, async ({ productsApi }) => {
        const createdProduct = await productsApi.create(productData, token);
        validateResponse(createdProduct, {
            status: statusCode,
            schema: createProductSchema,
            IsSuccess: true,
            ErrorMessage: successMessage,
        });

        id = createdProduct.body.Product._id;

        const actualProductData = createdProduct.body.Product;
        expect(_.omit(actualProductData, ["_id", "createdOn"])).toEqual(productData);
    });
  };
});