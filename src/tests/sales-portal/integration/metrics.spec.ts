// Для реализации подмокивайте респонс эндпоинта metrics
//   - Orders This Year: Metrics.orders.totalOrders
//   - New Customers: Metrics.customers.totalNewCustomers
//   - Canceled Orders: Metrics.orders.totalCanceledOrders
// 1. Total Revenue: Metrics.customers.totalRevenue
// 2. Avg Order Value: Metrics.orders.averageOrderValue
// Остальной объект оставьте как есть сейчас в респонсе, замените просто на ваши данные в метриках нужных

import { metricCases, metricsData } from "data/salesPortal/metrics/metricCases";
import { test, expect } from "fixtures/business.fixture";

test.describe("[Integration] [Sales Portal] [Home] [Metrics]", () => {
    test.beforeEach(async ({ loginAsAdmin, mock, homePage }) => {
        await mock.metrics({
            Metrics: metricsData,
            IsSuccess: true,
            ErrorMessage: null
        });
        await loginAsAdmin();
        await homePage.waitForOpened();
    });

    for (const { title, locator, expectedData } of metricCases) {
        test(`[Metrics] ${title}`, async({ homePage }) => {
            await expect(locator(homePage)).toHaveText(expectedData);
        });
    };
});