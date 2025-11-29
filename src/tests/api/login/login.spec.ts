import test, { expect } from "@playwright/test";
import { apiConfig } from "config/apiConfig"
import { credentials } from "config/env";
import { STATUS_CODES } from "data/statusCodes";
import _ from "lodash";
import { validateJsonSchema } from "utils/shema.utils";
import { loginSchema } from "data/schemas/login/login.schema"
import { TAGS } from "data/tags";

const { baseURL, endpoints } = apiConfig;

// Написать смоук API тест на логин
test.describe("[API] [Sales Portal] [Login]", () => {
  test("Login with correct credentials", 
    { tag: [TAGS.SMOKE, TAGS.API] },
    async ({ request }) => {
    // создать и проверить схему
    const loginResponse = await request.post(baseURL + endpoints.login, {
      data: credentials,
      headers: {
        "content-type": "application/json",
      },
    });
    
    const loginBody = await loginResponse.json();
    const token = loginResponse.headers()['authorization'];

    // проверить статус
    validateJsonSchema(loginBody, loginSchema);
    expect.soft(loginResponse.status()).toBe(STATUS_CODES.OK);

    // проверить наличие токена в хедерах
    expect(token).toBeTruthy();
  });
});