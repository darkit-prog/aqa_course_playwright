import { IApiClient } from "api/apiClients/types";
import { apiConfig } from "config/apiConfig";
import { IRequestOptions } from "data/types/core.types";
import { ICustomer, ICustomerResponse } from "data/types/customers.type";
import { logStep } from "utils/report/logStep.utils";

export class CustomerApi {
    constructor(private apiClient: IApiClient) {}

    @logStep("POST /api/customer")
    async create(customer: ICustomer, token: string) {
        const options: IRequestOptions = {
            baseURL: apiConfig.baseURL, //backend url
            url: apiConfig.endpoints.customers, //endpoint address
            method: "post",
            headers: {
                "content-type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            data: customer,
        };
        // return await this.apiClient.send<ICustomerResponse?>(options);
        return await this.apiClient.send<ICustomerResponse>(options);
    }

    @logStep("DELETE /api/customers/id")
    async delete(_id: string, token: string) {
        const options: IRequestOptions = {
            baseURL: apiConfig.baseURL,
            url: apiConfig.endpoints.customerById(_id),
            method: "delete",
            headers: {
                "content-type": "application/json",
                Authorization: `Bearer ${token}`
            },
        };
        return await this.apiClient.send<null>(options);
    }
}