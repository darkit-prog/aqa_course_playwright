import { logStep } from "utils/report/logStep.utils";
import { SalesPortalPage } from "../salesPortal.page";

export class CustomerListPage extends SalesPortalPage {
    readonly customersPageTitle = this.page.locator("h2.fw-bold");
    readonly addNewCustomerButton = this.page.locator('[name="add-button"]');
    readonly tableRow = this.page.locator("tbody tr");
    readonly tableRowByEmail = (customerEmail: string) =>
        this.page.locator("table tbody tr", { has: this.page.locator("td", { hasText: customerEmail }) });
    readonly tableRowByIndex = (index: number) => this.page.locator("table tbody tr").nth(index);

    readonly editButton = (customerName: string) => this.tableRowByEmail(customerName).getByTitle("Edit");
    readonly detailsButton = (customerName: string) => this.tableRowByEmail(customerName).getByTitle("Details");
    readonly deleteButton = (customerName: string) => this.tableRowByEmail(customerName).getByTitle("Delete");

    readonly uniqueElement = this.addNewCustomerButton;

    @logStep("Click on button to create customer")
    async clickAddNewCustomer() {
        await this.addNewCustomerButton.click();
    }
}