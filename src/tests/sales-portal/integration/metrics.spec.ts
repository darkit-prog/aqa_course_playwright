// Для реализации подмокивайте респонс эндпоинта metrics
//   - Orders This Year: Metrics.orders.totalOrders
//   - New Customers: Metrics.customers.totalNewCustomers
//   - Canceled Orders: Metrics.orders.totalCanceledOrders
// 1. Total Revenue: Metrics.customers.totalRevenue
// 2. Avg Order Value: Metrics.orders.averageOrderValue
// Остальной объект оставьте как есть сейчас в респонсе, замените просто на ваши данные в метриках нужных

import { SALES_PORTAL_URL } from "config/env";
import { metricCases, metricsData } from "data/salesPortal/metrics/metricCases";
import { TAGS } from "data/tags";
import { test, expect } from "fixtures/business.fixture";

test.describe("[Integration] [Sales Portal] [Home] [Metrics]", () => {
    test.beforeEach(async ({ mock }) => {
        await mock.metrics({
            Metrics: metricsData,
            IsSuccess: true,
            ErrorMessage: null
        });
    });

    for (const { title, locator, expectedData } of metricCases) {
        test(`[Metrics] ${title}`, 
            { tag: [TAGS.REGRESSION, TAGS.API] },
            async({ homePage, page }) => {
                await page.goto(SALES_PORTAL_URL + "home");
                await homePage.waitForOpened();
                await expect(locator(homePage)).toHaveText(expectedData);
        });
    };
});