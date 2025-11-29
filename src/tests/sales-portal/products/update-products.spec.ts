import { test, expect } from "fixtures/business.fixture";
import { generateProductData } from "data/salesPortal/products/generateProductData";
import _ from "lodash";
import { NOTIFICATIONS } from "data/salesPortal/notifications";
import { TAGS } from "data/tags";

test.describe("[E2E] [Sales Portal] [Products]", () => {
    let id = "";
    let token = "";

    test.afterEach(async ({ productsApiService }) => {
        await productsApiService.delete(token, id);
        id = "";
    });

    test("Update product", 
        { tag: [TAGS.SMOKE, TAGS.UI] },
        async ({ productsListPage, productsListUIService, productsApiService, homeUIService, editProductPage }) => {
        const editData = generateProductData();
        // залогиниться 
        token = await productsListPage.getAuthToken();

        // создать продукт через API
        const createdProduct = await productsApiService.create(token);
        id = createdProduct._id;

        //   - Перейти на страницу Edit Product
        await homeUIService.homePage.open("products");
        await productsListUIService.openEditProductPage(createdProduct.name);

        //   - Заполнить поля валидными данными
        await editProductPage.fillForm(editData);

        //   - Сохранить продукт
        await editProductPage.clickSaveEditProduct();
        await expect(productsListPage.toastMessage).toHaveText(NOTIFICATIONS.PRODUCT_EDITED);

        //   - Проверить продукт в таблице
        await expect(productsListPage.tableRowByName(editData.name)).toBeVisible();

        //   - Открыть модалку деталей продукта
        await productsListUIService.openDetailsModal(editData.name);

        //   - Проверить данные в модалке
        const modalData = await productsListPage.detailsModal.getData();
        productsListUIService.assertDetailsDataAfterEdit(modalData, editData);
    });
});