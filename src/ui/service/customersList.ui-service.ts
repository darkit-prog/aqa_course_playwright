import { expect, Page } from "@playwright/test";
import { ICustomer } from "data/types/customers.type";
import _ from "lodash";
import { NewCustomerPage } from "ui/pages/customers/addNewCustomer.page";
import { CustomerListPage } from "ui/pages/customers/customersList.page";
import { logStep } from "utils/report/logStep.utils";

export class CustomersListUIService {
    customerListPage: CustomerListPage;
    addNewCustomerPage: NewCustomerPage;

    constructor(private page: Page) {
        this.customerListPage = new CustomerListPage(page);
        this.addNewCustomerPage = new NewCustomerPage(page);
    }

    @logStep("Open Add Customer Page via API")
    async openAddNewCustomerPage() {
        await this.customerListPage.clickAddNewCustomer();
        await this.addNewCustomerPage.waitForOpened();
    }

    @logStep("Open Add Customer Page via UI")
    async open() {
        await this.customerListPage.open("customers");
        await this.customerListPage.waitForOpened();
    }

    assertDetailsData(actual: ICustomer, expected: ICustomer) {
        expect(actual).toEqual({
        ..._.omit(expected, ["_id"]),
        });
    }

    @logStep("Check exist customer in table after creation")
    async assertProductInTable(customerName: string, { visible }: { visible: boolean }) {
        await expect(this.customerListPage.tableRowByEmail(customerName)).toBeVisible({ visible });
    }
}