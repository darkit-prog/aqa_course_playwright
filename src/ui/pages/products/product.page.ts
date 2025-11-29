import { IProduct } from "data/types/product.types";
import { SalesPortalPage } from "../salesPortal.page";

export class NewProductPage extends SalesPortalPage {
  readonly title = this.page.locator("h2.page-title-text");
  readonly nameInput = this.page.locator("#inputName");
  readonly manufacturerSelect = this.page.locator("#inputManufacturer");
  readonly priceInput = this.page.locator("#inputPrice");
  readonly amountInput = this.page.locator("#inputAmount");
  readonly notesInput = this.page.locator("#textareaNotes");
  readonly saveButtonNewProduct = this.page.locator("#save-new-product");
  readonly saveButtonEditProduct = this.page.locator("#save-product-changes");

  readonly uniqueElement = this.title;


  //http://localhost:8585/#/products/691635f6dd88b5714d826c6a/edit
  async fillForm(productData: Partial<IProduct>) {
    if (productData.name) await this.nameInput.fill(productData.name);
    if (productData.manufacturer) await this.manufacturerSelect.selectOption(productData.manufacturer);
    if (productData.price) await this.priceInput.fill(productData.price.toString());
    if (productData.amount) await this.amountInput.fill(productData.amount.toString());
    if (productData.notes) await this.notesInput.fill(productData.notes);
  }

  async clickSaveNewProduct() {
    await this.saveButtonNewProduct.click();
  }

  async clickSaveEditProduct() {
    await this.saveButtonEditProduct.click();
  }
}