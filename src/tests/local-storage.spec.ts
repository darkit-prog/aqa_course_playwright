import {test, expect} from "@playwright/test";

interface ICredential {
    name: string,
    password: string
}

const user: ICredential = {
    name: "test@gmail.com",
    password: "SecretPw123!@#"
};

test.describe("herokuapp Dynamic Controls", () => {
    test("HomeWork 2", async ({ page }) => {
        const url = "https://anatoly-karpovich.github.io/demo-login-form/";
        const usernameInput = page.locator("#userName");
        const passwordInput = page.locator("#password");
        const submitButton = page.locator("#submit");
        const notification = page.locator("#successMessage");

        await page.goto(url);

        // Засунуть в localStorage браузера данные test@gmail.com / SecretPw123!@# для логина на сайт
        await page.evaluate((userData) => {
            localStorage.setItem(userData.name, JSON.stringify(userData));
        }, user);

        // Залогиниться с данными что вы вставили в localStorage
        const password = await page.evaluate((userData) => {
            return localStorage.getItem(userData.name);
        }, user);
    
        await usernameInput.fill(user.name);
        await passwordInput.fill(JSON.parse(password!).password);
        await submitButton.click();
        await expect(notification, "Завалидировать успешный логин").toHaveText(`Hello, ${user.name}!`)
    });
})
