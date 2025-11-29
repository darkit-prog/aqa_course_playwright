import { logStep } from "utils/report/logStep.utils";
import { SalesPortalPage } from "../salesPortal.page";
import { ICustomer } from "data/types/customers.type";

export class NewCustomerPage extends SalesPortalPage {
  readonly title = this.page.locator("h2.page-title-text");
  readonly emailInput = this.page.locator("#inputEmail");
  readonly nameInput = this.page.locator("#inputName");
  readonly coutrySelect = this.page.locator("#inputCountry");
  readonly cityInput = this.page.locator("#inputCity");
  readonly streetInput = this.page.locator("#inputStreet");
  readonly houseInput = this.page.locator("#inputHouse");
  readonly flatInput = this.page.locator("#inputFlat");
  readonly phoneInput = this.page.locator("#inputPhone");
  
  readonly notesInput = this.page.locator("#textareaNotes");
  readonly saveButton = this.page.locator("#save-new-customer");

  // Уникальное поле - Email
  readonly uniqueElement = this.emailInput;

  @logStep("Fill form to create customer")
  async fillForm(customerData: Partial<ICustomer>) {
    if (customerData.email) await this.emailInput.fill(customerData.email);
    if (customerData.name) await this.nameInput.fill(customerData.name);
    if (customerData.country) await this.coutrySelect.selectOption(customerData.country);
    if (customerData.house) await this.houseInput.fill(customerData.house.toString());
    if (customerData.flat) await this.flatInput.fill(customerData.flat.toString());
    if (customerData.notes) await this.notesInput.fill(customerData.notes);
    if (customerData.city) await this.cityInput.fill(customerData.city);
    if (customerData.street) await this.streetInput.fill(customerData.street);
    if (customerData.phone) await this.phoneInput.fill(customerData.phone);
  }

  @logStep("Save filled form to create customer")
  async clickSave() {
    // await this.saveButton.scrollIntoViewIfNeeded()
    await this.saveButton.click({ force: false });
  }
}