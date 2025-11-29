import { expect, Page } from "@playwright/test";
import { ICustomer } from "data/types/customers.type";
import _ from "lodash";
import { NewCustomerPage } from "ui/pages/customers/addNewCustomer.page";
import { CustomerListPage } from "ui/pages/customers/customersList.page";

export class CustomersListUIService {
    customerListPage: CustomerListPage;
    addNewCustomerPage: NewCustomerPage;

    constructor(private page: Page) {
        this.customerListPage = new CustomerListPage(page);
        this.addNewCustomerPage = new NewCustomerPage(page);
    }

    async openAddNewCustomerPage() {
        await this.customerListPage.clickAddNewCustomer();
        await this.addNewCustomerPage.waitForOpened();
    }

    async open() {
        await this.customerListPage.open("customers");
        await this.customerListPage.waitForOpened();
    }

    assertDetailsData(actual: ICustomer, expected: ICustomer) {
        expect(actual).toEqual({
        ..._.omit(expected, ["_id"]),
        //   createdOn: convertToFullDateAndTime(expected.createdOn),
        });
    }
    //     assertDetailsData(actual: ICustomer, expected: ICustomer) {
    //     expect({..._.omit(actual, ["createdOn"])}).toEqual({
    //       ..._.omit(expected, ["_id"]),
    //     //   createdOn: convertToFullDateAndTime(expected.createdOn),
    //     });
    //   }

    async assertProductInTable(customerName: string, { visible }: { visible: boolean }) {
        await expect(this.customerListPage.tableRowByEmail(customerName)).toBeVisible({ visible });
    }
}