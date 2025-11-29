import { test, expect } from "fixtures/api.fixture";
import { IProductFromResponse } from "data/types/product.types";
import { TAGS } from "data/tags";

// hw 25
test.describe("[API] [Sales Portal] [Products]", () => {
  let id = "";
  let token = "";

  test.afterEach(async ({ productsApiService }) => {
    await productsApiService.delete(token, id);
  });

  test("Get all products", 
    { tag: [TAGS.SMOKE, TAGS.API] },
    async ({ loginApiService, productsApiService, productsApi }) => {
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