import { test, expect } from "fixtures/business.fixture";
import { NOTIFICATIONS } from "data/salesPortal/notifications";
import { generateProductData } from "data/salesPortal/products/generateProductData";
import { HomePage } from "ui/pages/home.page";
import { NewProductPage } from "ui/pages/products/product.page";
import { ProductsListPage } from "ui/pages/products/productsList.page";
import { SignInPage } from "ui/pages/signIn.page";
import { TAGS } from "data/tags";

test.describe("[Sales Portal] [Products]", async () => {
  let id = "";
  let token = "";

  test.afterEach( async ({ productsApiService }) => {
    if (id) await productsApiService.delete(token, id);
    id = "";
  });

  test("Add new product with services", 
    {
      tag: [TAGS.SMOKE, TAGS.REGRESSION, TAGS.PRODUCTS],
    },
    async ({ 
    // loginUIService, 
    // homeUIService, 
    // productsListUIService, 

    addNewProductUIService, 
    productsListPage, 
    // page 
  }) => {
      // token = await loginUIService.loginAsAdmin();
      // await homeUIService.homePage.waitForOpened();
      // await productsListUIService.openAddNewProductPage();

      await addNewProductUIService.open();
      const createProduct = await addNewProductUIService.create();
      id = createProduct._id;
      token = await productsListPage.getAuthToken();

      await expect(productsListPage.toastMessage).toContainText(NOTIFICATIONS.PRODUCT_CREATED);
      await expect(productsListPage.tableRowByName(createProduct.name)).toBeVisible();
  });

  test("Add new product", 
    {
      tag: [TAGS.SMOKE, TAGS.REGRESSION, TAGS.PRODUCTS]
    },
    async ({ page }) => {
    const signInProductPage = new SignInPage(page);
    const homePage = new HomePage(page);
    const productsListPage = new ProductsListPage(page);
    const addNewProductPage = new NewProductPage(page);
    const firstRowOfTable = page.locator('#table-products tbody tr').first();
    
    //login page
    // Открыть Sales Portal локально поднятый в докере
    await signInProductPage.open();

    // Войти в приложения используя учетные данные указанные в readme к проекту
    // await signInProductPage.sighIn(credentials);

    // home page
    await homePage.waitForOpened();
    await homePage.clickOnViewModule("Products");

    // product list page
    await productsListPage.waitForOpened();
    await productsListPage.clickAddNewProduct();

    // add new product page
    await addNewProductPage.waitForOpened();

    // Создать продукт (модуль Products)
    const productData = generateProductData();
    await addNewProductPage.fillForm(productData);
    await addNewProductPage.clickSaveNewProduct();

    // return product list page
    await productsListPage.waitForOpened();

    // Верифицировать появившуюся нотификацию
    await expect(productsListPage.toastMessage).toContainText(NOTIFICATIONS.PRODUCT_CREATED);
    await expect(productsListPage.tableRowByName(productData.name)).toBeVisible();
    
    // Верифицировать созданный продукт в таблице (сравнить все имеющиеся поля, продукт должен быть самым верхним)
    await expect(firstRowOfTable.locator('td:nth-child(1)')).toHaveText(productData.name);
    await expect(firstRowOfTable.locator('td:nth-child(2)')).toHaveText(`$${productData.price}`);
    await expect(firstRowOfTable.locator('td:nth-child(3)')).toHaveText(productData.manufacturer);
  });
});
