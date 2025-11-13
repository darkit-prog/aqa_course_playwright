import {test, expect, Page} from "@playwright/test"

// Разработайте смоук тест-сьют с тестами на REGISTER на странице https://anatoly-karpovich.github.io/demo-login-form/
//   Страница регистрации:
//     Username: обязательное, от 3 до 40 символов включительно, запрещены префиксные/постфиксные пробелы, как и имя состоящее из одних пробелов
//     Password: обязательное, от 8 до 20 символов включительно, необходима хотя бы одна буква в верхнем и нижнем регистрах, пароль из одних пробелов запрещен
//   Страница логина:
//     Username: обязательное
//     Password: обязательное

interface ICredential {
    username: string,
    password: string
}

enum NOTIFICATIONS  {
    REGISTER_SUCCESS = "Successfully registered! Please, click Back to return on login page"
    // REGISTER_FAIL_NO_VALID_DATA = "Please, provide valid data",
    // REGISTER_FAIL_USERNAME_NOT_3_CHAR =  "Username should contain at least 3 characters",
    // REGISTER_FAIL_USERNAME = "Prefix and postfix spaces are not allowed is username",
    // REGISTER_FAIL_PASSWORD_NOT_8_CHAR = "Password should contain at least 8 characters",
    // REGISTER_FAIL_PASSWORD_NO_LOWERCASE_CHAR = "Password should contain at least one character in lower case",
    // REGISTER_FAIL_REPEAT_CREDENTIALS = "Username is in use"
}

test.describe("Register in demo-login-form", () => {
    const validCredentials: ICredential = {
        username: "test",
        password: "Test1test"
    }

    // const invalidCredentials: ICredential[] = [
    // {
    //     username: "da",
    //     password: validCredentials.password
    // },
    // {
    //     username: "Darya1",
    //     password: "123"
    // },
    // {
    //     username: "  Darya1  ",
    //     password: "qer123qwe"
    // },
    // {
    //     username: "Darya1",
    //     password: "QQQQQQQQQQQQQ"
    // },
    // {
    //     username: "         ",
    //     password: "            "
    // }]

    async function registerPage(page: Page, username: string, password: string) {
        const usernameInput = page.locator("#userNameOnRegister");
        const passwordInput = page.locator("#passwordOnRegister");
        const registerButton = page.locator("#register");

        await usernameInput.fill(username);
        await passwordInput.fill(password);
        await registerButton.click();
    };

    async function loginPage(page: Page) {
        const usernameInput = page.locator("#userName");
        const passwordInput = page.locator("#password");
        const submitButton = page.locator("#submit");

        await usernameInput.fill(validCredentials.username);
        await passwordInput.fill(validCredentials.password);
        await submitButton.click();
    }

    test.beforeEach(async ({ page }) => {
        const url = "https://anatoly-karpovich.github.io/demo-login-form/";
        const registerOnButtonLink = page.locator("#registerOnLogin");
        await page.goto(url);
        await registerOnButtonLink.click();
    });

    test("Register with valid credentions", async ({ page }) => {
        const notification = page.locator("#errorMessageOnRegister");
        await registerPage(page, validCredentials.username, validCredentials.password);
        await expect(notification).toHaveText(NOTIFICATIONS.REGISTER_SUCCESS);
    });

    test("Login with valid credentions", async ({ page }) => {
        const backButton = page.locator("#backOnRegister");
        await registerPage(page, validCredentials.username, validCredentials.password);
        await backButton.click();
        await loginPage(page);
    
        const notification = page.locator("#successMessage");
        await expect(notification).toHaveText(`Hello, ${validCredentials.username}!`)
    });





    // Добавила тесты для себя для набивания руки. Считаю, что данные кейсы не надо добавлять в смоук тест-сьют

    // test("Register with invalid username with small length", async ({ page }) => {
    //     const notification = page.locator("#errorMessageOnRegister");
    //     await registerPage(page, invalidCredentials[0]?.username!, invalidCredentials[0]?.password!);
    //     await expect(notification).toHaveText(NOTIFICATIONS.REGISTER_FAIL_USERNAME_NOT_3_CHAR);
    // });

    // test("Register with invalid password with small length", async ({ page }) => {
    //     const notification = page.locator("#errorMessageOnRegister");
    //     await registerPage(page, invalidCredentials[1]?.username!, invalidCredentials[1]?.password!);
    //     await expect(notification).toHaveText(NOTIFICATIONS.REGISTER_FAIL_PASSWORD_NOT_8_CHAR);
    // });
    
    // test("Register with invalid username with prefix and postfix spaces", async ({ page }) => {
    //     const notification = page.locator("#errorMessageOnRegister");
    //     await registerPage(page, invalidCredentials[2]?.username!, invalidCredentials[2]?.password!);
    //     await expect(notification).toHaveText(NOTIFICATIONS.REGISTER_FAIL_USERNAME);
    // });

    // test("Register with invalid password with uppercase characters", async ({ page }) => {
    //     const notification = page.locator("#errorMessageOnRegister");
    //     await registerPage(page, invalidCredentials[3]?.username!, invalidCredentials[3]?.password!);
    //     await expect(notification).toHaveText(NOTIFICATIONS.REGISTER_FAIL_PASSWORD_NO_LOWERCASE_CHAR);
    // });

    // test("Register with repeat credentials", async ({ page }) => {
    //     const notificationFirst = page.locator("#errorMessageOnRegister");
    //     await registerPage(page, validCredentials.username, validCredentials.password);
    //     await expect(notificationFirst).toHaveText(NOTIFICATIONS.REGISTER_SUCCESS);
        
    //     const notificationSecond = page.locator("#errorMessageOnRegister");
    //     await registerPage(page, validCredentials.username, validCredentials.password);
    //     await expect(notificationSecond).toHaveText(NOTIFICATIONS.REGISTER_FAIL_REPEAT_CREDENTIALS);
    // });

    // test("Register with invalid username and password", async ({ page }) => {
    //     const notification = page.locator("#errorMessageOnRegister");
    //     await registerPage(page, invalidCredentials[4]?.username!, invalidCredentials[4]?.password!);
    //     await expect(notification).toHaveText(NOTIFICATIONS.REGISTER_FAIL_NO_VALID_DATA);
    // });
})