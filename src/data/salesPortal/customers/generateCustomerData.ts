import { faker } from "@faker-js/faker";
import { IProduct, IProductFromResponse } from "../../../data/types/product.types";
import { getRandomEnumValue } from "../../../utils/enum.utils";
import { COUNTRIES } from "./coutries";
import { ObjectId } from "bson";
import { ICustomer, ICustomerFromResponse } from "data/types/customers.type";

export function generateCustomerData(params?: Partial<ICustomer>): ICustomer {
  return {
    email: faker.string.alphanumeric({ length: 25 }) + "@test.com",
    name: faker.person.firstName(),
    country: getRandomEnumValue(COUNTRIES),
    house: faker.number.int({ min: 1, max: 999 }),
    flat: faker.number.int({ min: 1, max: 9999 }),
    city: faker.string.alpha({ length: 20 }) ,
    street:  faker.string.alphanumeric({ length: 25 }) + faker.number.int({ min: 1, max: 1000}),
    phone: faker.phone.number({style: "international"}),
    notes: faker.string.alphanumeric({ length: 250 }),
    ...params,
  };
}

export function generateProductResponseData(params?: Partial<ICustomer>): ICustomerFromResponse {
  const initial = generateCustomerData(params);
  return {
    _id: new ObjectId().toHexString(),
    email: initial.email,
    name: initial.name,
    city: initial.city,
    street: initial.street,
    country: initial.country,
    house: initial.house,
    flat: initial.flat,
    phone: initial.phone,
    createdOn: new Date().toISOString(),
    notes: initial.notes!,
  };
}