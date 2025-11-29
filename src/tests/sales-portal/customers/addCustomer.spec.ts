import { generateCustomerData } from "data/salesPortal/customers/generateCustomerData";
import { NOTIFICATIONS } from "data/salesPortal/notifications";
import { TAGS } from "data/tags";
import { test, expect } from "fixtures/business.fixture";

test.describe("[E2E] [Sales Portal] [Customers]", () => {
    let id = "";
    let token = ""

    test(`Add customer`, 
        { tag: [TAGS.SMOKE, TAGS.UI] },
        async({ homeUIService, addNewCustomerPage, customerApiService, customersListUIService, customerListPage }) => {
        const customerData = generateCustomerData();
        
        //   - залогиниться
        token = await customerListPage.getAuthToken();
        //   - Перейти на страницу Customers List
        await homeUIService.homePage.open("customers");

        //   - Перейти на страницу Add New Customer
        await customersListUIService.openAddNewCustomerPage();

        //   - Заполнить поля валидными данными
        const createdCustomer = await customerApiService.create(token);
        id = createdCustomer._id;
        // await customersListUIService.open();
        await addNewCustomerPage.fillForm(customerData);

        //   - Сохранить покупателя
        await addNewCustomerPage.clickSave();
        await expect(customerListPage.toastMessage).toHaveText(NOTIFICATIONS.CUSTOMER_CREATED);
    
        //   - Проверить наличие покупателя в таблице
        await expect(customerListPage.tableRowByEmail(customerData.email)).toBeVisible();
    });

    // За собой удаляем продукт через апи, разумеется:)
    // - Удалить покупателя через API
    test.afterEach(async ({ customerApiService }) => {
        if (id) await customerApiService.delete(token, id);
        id = "";
    });
});