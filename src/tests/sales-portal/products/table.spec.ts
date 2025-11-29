import { test, expect } from "fixtures/business.fixture";
import { credentials } from "config/env";
import { NOTIFICATIONS } from "data/salesPortal/notifications";
import { generateProductData } from "data/salesPortal/products/generateProductData";
import { TAGS } from "data/tags";
import _ from "lodash";
import { HomePage } from "ui/pages/home.page";
import { NewProductPage } from "ui/pages/products/product.page";
import { ProductsListPage } from "ui/pages/products/productsList.page";
import { SignInPage } from "ui/pages/signIn.page";

test.describe("[Sales Portal] [Products]", () => {
  test("Table parsing", 
    { tag: [TAGS.SMOKE, TAGS.UI] },
    async ({ page, productsListUIService }) => {
    const productsListPage = new ProductsListPage(page);
    const addNewProductPage = new NewProductPage(page);
    await productsListUIService.open();
    await productsListPage.waitForOpened();
    await productsListPage.clickAddNewProduct();
    await addNewProductPage.waitForOpened();
    const productData = generateProductData();
    await addNewProductPage.fillForm(productData);
    await addNewProductPage.clickSaveNewProduct();
    await productsListPage.waitForOpened();
    await expect(productsListPage.toastMessage).toContainText(NOTIFICATIONS.PRODUCT_CREATED);
    await expect(productsListPage.tableRowByName(productData.name)).toBeVisible();

    await expect.soft(productsListPage.nameCell(productData.name)).toHaveText(productData.name);
    await expect.soft(productsListPage.priceCell(productData.name)).toHaveText(`$${productData.price.toString()}`);
    await expect.soft(productsListPage.manufacturerCell(productData.name)).toHaveText(productData.manufacturer);
    // await expect.soft(productsListPage.createdOnCell(productData.name)).toHaveText("");

    const productFromTable = await productsListPage.getProductData(productData.name);
    const expectedProduct = _.omit(productData, ["notes", "amount"]);
    const actualProduct = _.omit(productFromTable, ["createdOn"]);
    expect(actualProduct).toEqual(expectedProduct);

    const tableData = await productsListPage.getTableData();
    console.log(tableData);
  });
});