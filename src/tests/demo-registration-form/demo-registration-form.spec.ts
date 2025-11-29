import { test, expect } from "@playwright/test"
import { TAGS } from "data/tags";

// Создайте ОДИН смоук тест со следующими шагами:
// 1. Переход на страницу https://anatoly-karpovich.github.io/demo-registration-form/
// 2. Заполните форму регистрации
// 3. Проверьте, что пользователь успешно зарегистрирован

interface ICredential {
    firstname: string,
    lastname: string,
    address: string,
    email: string,
    phone: string,
    country: string,
    gender: GENDERS,
    hobbies: HOBBIES[],
    language: COUNTRIES,
    skills: SKILLS,
    birthdayYear: string,
    birthdayMonth: string,
    birthdayDay: string,
    password: string
}

enum COUNTRIES {
    USA = "USA",
    CANADA = "Canada",
    UK = "UK"
}

enum GENDERS {
    MALE = "Male",
    FEMALE = "Female"
}

enum HOBBIES {
    TRAVELLING = "Travelling",
    MOVIES = "Movies",
    SPORTS = "Sports",
    GAMING = "Gaming",
    DANCING = "Dancing"
}

enum SKILLS {
    JAVASCRIPT = "JavaScript",
    PYTHON = "Python",
    JAVA = "Java",
    C = "C++",
    RUBY = "Ruby"
}

const credentials: ICredential  = {
    firstname: "Darya",
    lastname: "Pupkina",
    address: "Russia",
    email: "ddtest@gmail.com",
    phone: "88005553535",
    country: "Canada",
    gender: GENDERS.FEMALE,
    hobbies: [HOBBIES.DANCING, HOBBIES.TRAVELLING, HOBBIES.SPORTS],
    language: COUNTRIES.CANADA,
    skills: SKILLS.JAVASCRIPT,
    birthdayYear: "2000",
    birthdayMonth: "June",
    birthdayDay: "10",
    password: "Test1test"
}

test.describe("Register in demo-registration-form", () => {
    test("Register with valid credentions", 
        { tag: [TAGS.SMOKE, TAGS.UI] },
        async ({ page }) => {
        const url = "https://anatoly-karpovich.github.io/demo-registration-form/";
        const headerPage = page.locator("h2.text-center");
        const headerRegisterForm = page.locator("h2.text-center");
        const firstnameInput = page.locator("#firstName");
        const lastnameInput = page.locator("#lastName");
        const addressInput = page.locator("#address");
        const emailInput = page.locator("#email");
        const phoneInput = page.locator("#phone");
        const countryDropdown = page.locator("#country");
        const genderMaleCheckbox = page.locator("[value=\"male\"][name=\"gender\"]");
        const genderFemaleCheckbox = page.locator("[value=\"female\"][name=\"gender\"]");
        const languagesInput = page.locator("#language");
        const skillsSelector = page.locator("#skills");
        const birthYearDropdown = page.locator("#year");
        const birthMonthDropdown = page.locator("#month");
        const birthDayDropdown = page.locator("#day");
        const passwordInput = page.locator("#password");
        const passwordConfirmInput = page.locator("#password-confirm");
        const submitButtinn = page.locator(`button[type="submit"]`);
        const backButton = page.locator("[class=\"btn btn-primary\"]");

        await page.goto(url);
        await expect(headerPage).toHaveText("Register");

        await firstnameInput.fill(credentials.firstname);
        await expect(firstnameInput).toHaveValue(credentials.firstname);

        await lastnameInput.fill(credentials.lastname);
        await expect(lastnameInput).toHaveValue(credentials.lastname);

        await addressInput.fill(credentials.address);
        await expect(addressInput).toHaveValue(credentials.address);

        await emailInput.fill(credentials.email);
        await expect(emailInput).toHaveValue(credentials.email);

        await phoneInput.fill(credentials.phone);
        await expect(phoneInput).toHaveValue(credentials.phone);

        await countryDropdown.selectOption(COUNTRIES.CANADA);
        await expect(countryDropdown).toHaveValue(credentials.country);

        if (credentials.gender === GENDERS.MALE) {
            await genderMaleCheckbox.check();
            await expect(genderMaleCheckbox).toBeChecked();
        } else {
            await genderFemaleCheckbox.check();
            await expect(genderFemaleCheckbox).toBeChecked();
        }

        for (const hobby of credentials.hobbies) {
            const hobbyLocator = page.locator(`.hobby[value="${hobby}"]`);
            await hobbyLocator.check();
            await expect(hobbyLocator).toBeChecked();
        }

        await languagesInput.fill(credentials.language);
        await expect(languagesInput).toHaveValue(credentials.language);

        await skillsSelector.selectOption(credentials.skills);
        await expect(skillsSelector).toHaveValue(credentials.skills);

        await birthYearDropdown.selectOption(credentials.birthdayYear);
        await expect(birthYearDropdown).toHaveValue(credentials.birthdayYear);

        await birthMonthDropdown.selectOption(credentials.birthdayMonth);
        await expect(birthMonthDropdown).toHaveValue(credentials.birthdayMonth);

        await birthDayDropdown.selectOption(credentials.birthdayDay);
        await expect(birthDayDropdown).toHaveValue(credentials.birthdayDay);

        await passwordInput.fill(credentials.password);
        await expect(passwordInput).toHaveValue(credentials.password);

        await passwordConfirmInput.fill(credentials.password);
        await expect(passwordConfirmInput).toHaveValue(credentials.password);

        await submitButtinn.click();
        await expect(headerRegisterForm).toHaveText("Registration Details");
        await expect(backButton).toHaveText("Back to Form");
    });
})