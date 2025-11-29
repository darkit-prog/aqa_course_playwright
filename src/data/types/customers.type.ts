import { IOrderDate } from "./orders.type";
import { ID, IResponseFields } from "./core.types";

export interface ICustomer {
    email: string;
    name: string;
    country: string;
    city: string;
    street: string;
    house: number;
    flat: number;
    phone: string;
    createdOn?: string;
    notes?: string;
};

export interface ICustomersMetrics {
    totalNewCustomers: number;
    topCustomers: ITopCustomer[];
    customerGrowth: ICustomerGrowth[];
};
export interface ITopCustomer {
    totalSpent: number;
    ordersCount: number;
    customerName: string;
    customerEmail: string;
};

export interface ICustomerGrowth {
    date: IOrderDate;
    count: number;
};

// export interface IProductDetails extends Required<ICustomer> {}

export interface ICustomerFromResponse extends Required<ICustomer>, ID {}

export interface ICustomerResponse extends IResponseFields {
  Customer: ICustomerFromResponse;
};