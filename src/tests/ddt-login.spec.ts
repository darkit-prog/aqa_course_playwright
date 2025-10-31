import { test, expect } from "@playwright/test"
import { userData } from "../data/demo-login-form.data"

// Создать тест сьют используя DDT подход с негативными тест-кейсами по регистрации на сайте
test.describe("Register in demo-login-form", () => {
    for (const { title, credentials, message} of userData) {
        test(title, async ({ page }) => {
            const url = "https://anatoly-karpovich.github.io/demo-login-form/";
            const registerOnButtonLink = page.locator("#registerOnLogin");
            const registerButton = page.locator("#register");
            const notification = page.locator("#errorMessageOnRegister");
            const usernameInput = page.locator("#userNameOnRegister");
            const passwordInput = page.locator("#passwordOnRegister");
            
            await page.goto(url);
            await registerOnButtonLink.click();
            await expect(registerButton).toBeVisible();
            await usernameInput.fill(credentials.username);
            await passwordInput.fill(credentials.password);
            await registerButton.click();
            if (userData[userData.length - 1]?.title === title) {
                await usernameInput.fill(credentials.username);
                await passwordInput.fill(credentials.password);
                await registerButton.click();
            }
            await expect(notification).toHaveText(message);
        });
    };
});
