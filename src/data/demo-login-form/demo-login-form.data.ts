interface ICredential {
    username: string,
    password: string
}

enum NOTIFICATIONS  {
    REGISTER_SUCCESS = "Successfully registered! Please, click Back to return on login page",
    REGISTER_FAIL_NO_VALID_DATA = "Please, provide valid data",
    REGISTER_FAIL_USERNAME_NOT_3_CHAR =  "Username should contain at least 3 characters",
    REGISTER_FAIL_USERNAME = "Prefix and postfix spaces are not allowed is username",
    REGISTER_FAIL_PASSWORD_NOT_8_CHAR = "Password should contain at least 8 characters",
    REGISTER_FAIL_PASSWORD_NO_LOWERCASE_CHAR = "Password should contain at least one character in lower case",
    REGISTER_FAIL_REPEAT_CREDENTIALS = "Username is in use",
    REGISTER_FAIL_NO_PASSWORD = "Password is required",
    REGISTER_FAIL_NO_USERNAME = "Username is required"
}

interface IUserData {
    title: string,
    credentials: ICredential,
    message: NOTIFICATIONS
}


// Username: обязательное, от 3 до 40 символов включительно, запрещены префиксные/постфиксные пробелы, как и имя состоящее из одних пробелов
// Password: обязательное, от 8 до 20 символов включительно, необходима хотя бы одна буква в верхнем и нижнем регистрах, пароль из одних пробелов запрещен
export const userData: IUserData[] = [
    {
        title: "Регистрация с правильными данными", // нужен для кейса с повторными кредами
        credentials: { username: "test", password: "Test1test" }, 
        message: NOTIFICATIONS.REGISTER_SUCCESS
    },
    {
        title: "Регистрация с пустыми полями имени и пароля", 
        credentials: { username: "", password: "" }, 
        message: NOTIFICATIONS.REGISTER_FAIL_NO_VALID_DATA
    },
    {
        title: "Регистрация с заполненным именем и пустым паролем", 
        credentials: { username: "Test123test", password: "" }, 
        message: NOTIFICATIONS.REGISTER_FAIL_NO_PASSWORD
    },
    {
        title: "Регистрация с пустым именем и заполненным паролем", 
        credentials: { username: "", password: "Test123test" }, 
        message: NOTIFICATIONS.REGISTER_FAIL_NO_USERNAME
    },
    {
        title: "Регистрация с именем меньше 3 символов", 
        credentials: { username: "da", password: "Test1test" }, 
        message: NOTIFICATIONS.REGISTER_FAIL_USERNAME_NOT_3_CHAR
    },
    {
        title: "Регистрация с паролем меньше 8 символов",
        credentials: { username: "Darya1", password: "123" },
        message: NOTIFICATIONS.REGISTER_FAIL_PASSWORD_NOT_8_CHAR
    },
    {
        title: "Регистрация с именем с префиксными пробелами",
        credentials: { username: "  Darya1", password: "Qer123qwe" },
        message: NOTIFICATIONS.REGISTER_FAIL_USERNAME
    },
    {
        title: "Регистрация с именем из пробелов",
        credentials: { username: "          ", password: "Qer123qwe" },
        message: NOTIFICATIONS.REGISTER_FAIL_USERNAME
    },
    {
        title: "Регистрация с именем с постфиксными пробелами",
        credentials: { username: "Darya1    ", password: "Qer123qwe" },
        message: NOTIFICATIONS.REGISTER_FAIL_USERNAME
    },
    {
        title: "Регистрация с паролем без строчных букв",
        credentials: { username: "Darya1", password: "QQQQQQQQQQQQQ" },
        message: NOTIFICATIONS.REGISTER_FAIL_PASSWORD_NO_LOWERCASE_CHAR
    },
    {
        title: "Регистрация с повторившимся паролем",
        credentials: { username: "test", password: "Test1test" },
        message: NOTIFICATIONS.REGISTER_FAIL_REPEAT_CREDENTIALS
    }
];

export default { userData, NOTIFICATIONS };