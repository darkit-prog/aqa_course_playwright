import { logStep } from "utils/report/logStep.utils";
import { BaseModal } from "./base.modal";

export class ConfirmationModal extends BaseModal {
  readonly uniqueElement = this.page.locator('[name="confirmation-modal"]');

  readonly title = this.uniqueElement.locator("h5");
  readonly confirmButton = this.uniqueElement.locator("button.btn-danger");
  readonly cancelButton = this.uniqueElement.locator("button.btn-secondary");
  readonly closeButton = this.uniqueElement.locator("button.btn-close");
  readonly confirmationMessage = this.uniqueElement.locator("div.modal-body p");

  @logStep("Click on button to close confirmation modal")
  async clickClose() {
    await this.closeButton.click();
  }

  @logStep("Click on button not to save changes in modal")
  async clickCancel() {
    await this.cancelButton.click();
  }

  @logStep("Click on button to confirm changes in modal")
  async clickConfirm() {
    await this.confirmButton.click();
  }
}