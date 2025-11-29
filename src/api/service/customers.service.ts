import { CustomerApi } from "api/api/customer.api";
import { generateCustomerData } from "data/salesPortal/customers/generateCustomerData";
import { createCustomerSchema } from "data/schemas/customers/create.schema";
import { STATUS_CODES } from "data/statusCodes";
import { ICustomer } from "data/types/customers.type";
import { validateResponse } from "utils/validation/validateResponse.utils";

export class CustomerApiService {
    constructor(private customerApi: CustomerApi) {}

    async create(token: string, customerData?: ICustomer) {
        const data = generateCustomerData(customerData);
        const response = await this.customerApi.create(data, token);
        validateResponse(response, {
            status: STATUS_CODES.CREATED,
            IsSuccess: true,
            ErrorMessage: null,
            schema: createCustomerSchema,
        });
        return response.body.Customer;
    }

    async delete(token: string, id: string) {
        const response = await this.customerApi.delete(id, token);
        validateResponse(response, {
            status: STATUS_CODES.DELETED,
        });
    }
}