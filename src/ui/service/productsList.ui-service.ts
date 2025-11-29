import { expect, Page } from "@playwright/test";
import { IProduct, IProductDetails } from "data/types/product.types";
import _ from "lodash";
import { NewProductPage } from "ui/pages/products/product.page";
import { ProductsListPage } from "ui/pages/products/productsList.page";
import { convertToFullDateAndTime } from "utils/date.utils";

export class ProductsListUIService {
  productsListPage: ProductsListPage;
  addNewProductPage: NewProductPage;
  editProductPage: NewProductPage;

  constructor(private page: Page) {
    this.productsListPage = new ProductsListPage(page);
    this.addNewProductPage = new NewProductPage(page);
    this.editProductPage = new NewProductPage(page);
  }

  async openAddNewProductPage() {
    await this.productsListPage.clickAddNewProduct();
    await this.addNewProductPage.waitForOpened();
  }

  async openDetailsModal(productName: string) {
    await this.productsListPage.detailsButton(productName).click();
    await this.productsListPage.detailsModal.waitForOpened();
  }

  async openDeleteModal(productName: string) {
    await this.productsListPage.clickAction(productName, "delete");
    await this.productsListPage.deleteModal.waitForOpened();
  }

  async deleteProduct(productName: string) {
    await this.productsListPage.clickAction(productName, "delete");
    await this.productsListPage.deleteModal.waitForOpened();
    await this.productsListPage.deleteModal.clickConfirm();
    await this.productsListPage.deleteModal.waitForClosed();
  }

  async search(text: string) {
    await this.productsListPage.fillSearchInput(text);
    await this.productsListPage.clickSearch();
    await this.productsListPage.waitForOpened();
  }

  async open() {
    await this.productsListPage.open("products");
    await this.productsListPage.waitForOpened();
  }

  async openEditProductPage(productName: string) {
    await this.productsListPage.editButton(productName).click();
    await this.editProductPage.waitForOpened();
  }

  assertDetailsData(actual: IProductDetails, expected: IProductDetails) {
    expect(actual).toEqual({
      ..._.omit(expected, ["_id"]),
      createdOn: convertToFullDateAndTime(expected.createdOn),
    });
  }

  assertDetailsDataAfterEdit(actual: IProductDetails, expected: IProduct) {
    expect({..._.omit(actual, ["createdOn"])}).toEqual({
      ..._.omit(expected, ["_id"]),
    });
  }

  async assertProductInTable(productName: string, { visible }: { visible: boolean }) {
    await expect(this.productsListPage.tableRowByName(productName)).toBeVisible({ visible });
  }
}