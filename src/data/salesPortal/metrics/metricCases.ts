import { HomePage } from "ui/pages/home.page";
import { generateMetricsData } from "./generateMetricsData";
import numeral from "numeral";
import { Locator } from "@playwright/test";

interface ICreateMetricData {
    title: string,
    locator: (page: HomePage) => Locator,
    expectedData: string
}

export const metricsData = generateMetricsData();
// console.log(mockedMetricsData);

export const metricCases: ICreateMetricData[] = [
    {
        title: "Orders This Year",
        locator: (page: HomePage) => page.ordersThisYear,
        expectedData: metricsData.orders.totalOrders.toString(),
    },
    {
        title: "Total Revenue",
        locator: (page: HomePage) => page.totalRevenue,
        expectedData: numeral(metricsData.orders.totalRevenue.toString()).format("$0.0a"),
    },
    {
        title: "New Customers Count",
        locator: (page: HomePage) => page.newCustomers,
        expectedData: metricsData.customers.totalNewCustomers.toString(),
    },
    {
        title: "Avg Order Value",
        locator: (page: HomePage) => page.avgOrderValue,
        expectedData: numeral(metricsData.orders.averageOrderValue.toString()).format("$0.0a"),
    },
    {
        title: "Canceled Orders Count",
        locator: (page: HomePage) => page.canceledOrders,
        expectedData: metricsData.orders.totalCanceledOrders.toString(),
    }
]