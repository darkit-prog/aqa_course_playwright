import { faker } from "@faker-js/faker";
import { IMetrics } from "../../types/metric.type";

export function generateMetricsData(params?: Partial<IMetrics>): IMetrics {
  return {
    orders: {
      totalOrders: faker.number.int({ min: 0, max: 100 }),
      totalRevenue: faker.number.int({ min: 0, max: 1000 }),
      averageOrderValue: faker.number.int({ min: 0, max: 1000 }),
      totalCanceledOrders: faker.number.int({ min: 0, max: 100 }),
      recentOrders: [],
      ordersCountPerDay: [],
      ...params?.orders,
    },
    customers: {
      totalNewCustomers: faker.number.int({ min: 0, max: 100 }),
      topCustomers: [],
      customerGrowth: [],
      ...params?.customers,
    },
    products: {
      topProducts: [],
      ...params?.products,
    },
  };
}