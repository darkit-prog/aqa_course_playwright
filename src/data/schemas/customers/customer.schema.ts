import { COUNTRIES } from "data/salesPortal/customers/coutries";

export const customerSchema = {
  type: "object",
  properties: {
    _id: { type: "string" },
    email: {
      type: "string",
    },
    name: {
      type: "string",
    },
    city: {
      type: "string",
    },
    street: {
      type: "string",
    },
    house: {
      type: "number",
    },
    flat: {
      type: "number",
    },
    createdOn: {
      type: "string",
    },
    notes: {
      type: "string",
    },
    phone: {
      type: "string",
    },
    country: {
      type: "string",
      enum: Object.values(COUNTRIES),
    },
  },
  required: ["_id", "email", "name", "city", "street", "house", "flat", "createdOn", "country", "phone"],
  additionalProperties: false,
};