// import { test, expect } from "@playwright/test";
// import { apiConfig } from "config/apiConfig";
// import { credentials } from "config/env";
// import { generateProductData } from "data/salesPortal/products/generateProductData";
// import { STATUS_CODES } from "data/statusCodes";
// import _ from "lodash";
// import { validateJsonSchema } from "utils/shema.utils";
// import { loginSchema } from "data/schemas/login/login.schema";
// import { getAllProductsSchema } from "data/schemas/products/getAllProducts.schema";
// import { IProductFromResponse } from "data/types/product.types"
// import { getProductSchema } from "data/schemas/products/get.schema";
// import { validateResponse } from "utils/validation/validateResponse.utils";
import { test, expect } from "fixtures/api.fixture";
import { getProductSchema } from "data/schemas/products/get.schema";
import { STATUS_CODES } from "data/statusCodes";
import { validateResponse } from "utils/validation/validateResponse.utils";
import { IProductFromResponse } from "data/types/product.types";

// const { baseURL, endpoints } = apiConfig;

// Написать смоук API тест на получение всех продуктов (без фильтрационных параметров) со следующими шагами:
// test.describe("[API] [Sales Portal] [Products]", () => {
  // let id = "";
  // let token = "";

  // login befor tests
  // test.beforeEach(async ({ request }) => {
  //   // Залогиниться
  //   const loginResponse = await request.post(`${baseURL}${endpoints.login}`, {
  //     data: credentials,
  //     headers: {
  //       'content-type': 'application/json',
  //     },
  //   });
  //   const loginBody = await loginResponse.json();
  //   token = loginResponse.headers()['authorization']!;

  //   validateJsonSchema(loginBody, loginSchema);
  //   expect.soft(loginResponse.status()).toBe(STATUS_CODES.OK);
  //   expect(token).toBeTruthy();
  // });

  // delete product after test
  // test.afterAll(async ({ request }) => {
  //   if (id) {
  //     const deleteResponse = await request.delete(`${baseURL}${endpoints.productById(id)}`, {
  //       headers: {
  //         'content-type': 'application/json',
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });
  //     console.log(`Bearer ${token}`, id);
  //     expect(deleteResponse.status()).toBe(STATUS_CODES.DELETED);
  //     expect(token).toBeTruthy();
  //   }
  // });

  // test("Get all products", async ({ request }) => {
  //   // variant from hw 24
  //   // Создать продукт и проверить 201й статус
  //   const productData = generateProductData();
  //   const createProductResponse = await request.post(baseURL + endpoints.products, {
  //     data: productData,
  //     headers: {
  //       "content-type": "application/json",
  //       Authorization: `Bearer ${token}`,
  //     },
  //   });

  //   const createProductBody = await createProductResponse.json();
  //   id = createProductBody.Product._id;
  //   expect.soft(createProductResponse.status()).toBe(STATUS_CODES.CREATED);

  //   // Получить все продукты
  //   const getAllProductsResponse = await request.get(`${baseURL}${endpoints.productsAll}`, {
  //     headers: {
  //       "content-type": "application/json",
  //       Authorization: `Bearer ${token}`,
  //     },
  //   });

  //   // создать и проверить схему
  //   const getAllProductsBody = await getAllProductsResponse.json();
  //   validateJsonSchema(getAllProductsBody, getAllProductsSchema);
  //   console.log('All products response body:', getAllProductsBody);

  //   // проверить статус
  //   expect.soft(getAllProductsResponse.status()).toBe(STATUS_CODES.OK);
  //   // проверить, что в массиве тела респонса есть созданный продукт
  //   const createdProduct = getAllProductsBody.Products.some(
  //     (element: IProductFromResponse) => element._id === id
  //   )
  //   expect.soft(createdProduct).toBe(true);
  //   // проверить поля IsSuccess и ErrorMessage
  //   expect.soft(getAllProductsBody.IsSuccess).toBe(true);
  //   expect.soft(getAllProductsBody.ErrorMessage).toBe(null);
  // });
// });

// hw 25
test.describe("[API] [Sales Portal] [Products]", () => {
  let id = "";
  let token = "";

  test.afterEach(async ({ productsApiService }) => {
    await productsApiService.delete(token, id);
  });

  test("Get all products", async ({ loginApiService, productsApiService, productsApi }) => {
    //TODO: Preconditions
    token = await loginApiService.loginAsAdmin();
    const product = await productsApiService.create(token);
    id = product._id;

    //TODO: Action
    const getProductResponse = await productsApi.getAll(token);

    //TODO: Assert
    expect.soft(getProductResponse.body.Products.some(
      (element: IProductFromResponse) => element._id === id
    )).toBe(true);
  });
});