import {test, expect} from "@playwright/test";

// Разработать тест со следующими шагами:
test.describe("herokuapp Dynamic Controls", () => {
    test("HomeWork 1", async ({ page }) => {
        const url = "https://the-internet.herokuapp.com/";
        const dynamicContorlsHref = page.getByRole("link", { name: "Dynamic Controls" });
        const removeButton = page.getByRole("button", { name: "Remove" });
        const checkbox = page.locator("input[type=\'checkbox\']");
        const addButton = page.getByRole("button", { name: "Add" });
        const title = page.getByRole("heading", { level: 4, name: "Dynamic Controls" });
        const textMessage = page.locator("p#message");

        // открыть https://the-internet.herokuapp.com/
        await page.goto(url);
        // перейти на страницу Dynamic Controls
        await dynamicContorlsHref.click();
        // Дождаться появления кнопки Remove
        await expect.soft(removeButton, "Дождаться появления кнопки Remove").toBeVisible({ timeout: 20000 });
        // Завалидировать текста в заголовке страницы
        await expect.soft(title, "Завалидировать текста в заголовке страницы").toHaveText("Dynamic Controls");

        // Чекнуть чекбокс
        await checkbox.check();
        // Кликнуть по кнопке Remove
        await removeButton.click();
        // Дождаться исчезновения чекбокса
        await expect.soft(checkbox, "Дождаться исчезновения чекбокса").toBeHidden({ timeout: 20000 });
        // Завалидировать текст It's gone!
        await expect.soft(textMessage).toHaveText("It's gone!");
    
        // Проверить наличие кнопки Add
        await expect(addButton, "Проверить наличие кнопки Add").toBeVisible();
        // Кликнуть на кнопку Add
        await addButton.click();
        // Дождаться появления чекбокса
        await expect.soft(checkbox, "Дождаться появления чекбокса").toBeVisible({ timeout: 20000 });
        // Завалидировать текст It's back!
        await expect.soft(textMessage).toHaveText("It's back!")
    });
});