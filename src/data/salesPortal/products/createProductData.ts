import { IProduct } from "data/types/product.types";
import { generateProductData } from "./generateProductData";
import { STATUS_CODES } from "../../statusCodes";
import { ERROR_MESSAGES, NOTIFICATIONS } from "../notifications";

interface ICreateProductData {
    title: string,
    productData: IProduct,
    successMessage: string | null,
    statusCode: STATUS_CODES
}

export const validTestDataForCreateProduct: ICreateProductData[] = [
    // Name
    {
        title: "Create product WITH minimal lenth of name - 3",
        productData: generateProductData( { name : "abc"} ),
        successMessage: null,
        statusCode: STATUS_CODES.CREATED
    },
    {
        title: "Create product WITH maximal lenth of name - 40",
        productData: generateProductData( { name : "a".repeat(40)} ),
        successMessage: null,
        statusCode: STATUS_CODES.CREATED
    },
    {
        title: "Create product WITH space between name",
        productData: generateProductData( { name : "Albert Einstein"} ),
        successMessage: null,
        statusCode: STATUS_CODES.CREATED
    },
    // Price
    {
        title: "Create product WITH minimal price 1",
        productData: generateProductData( { price: 1 } ),
        successMessage: null,
        statusCode: STATUS_CODES.CREATED
    },
    {
        title: "Create product WITH maximal price 99999",
        productData: generateProductData( { price: 99999 } ),
        successMessage: null,
        statusCode: STATUS_CODES.CREATED
    },
    // Amount
    {
        title: "Create product WITH minimal amount 0",
        productData: generateProductData( { amount: 0 } ),
        successMessage: null,
        statusCode: STATUS_CODES.CREATED
    },
    {
        title: "Create product WITH maximal amount 999",
        productData: generateProductData( { amount: 999 } ),
        successMessage: null,
        statusCode: STATUS_CODES.CREATED
    },
    // Notes
    {
        title: "Create product WITH minimal symbols 0 in notes",
        productData: generateProductData( { notes: "" } ),
        successMessage: null,
        statusCode: STATUS_CODES.CREATED
    },
    {
        title: "Create product WITH maximal symbols 250 in notes",
        productData: generateProductData( { notes: "N".repeat(250) } ),
        successMessage: null,
        statusCode: STATUS_CODES.CREATED
    },
    {
        title: "Create product WITH special symbols in notes",
        productData: generateProductData( { notes: "!@#$%^&*()-+=1234567890,./?'|"} ),
        successMessage: null,
        statusCode: STATUS_CODES.CREATED
    }
]

export const invalidTestDataForCreateProduct: ICreateProductData[] = [
    // Name
    {
        title: "Create product WITH zero lenth name",
        productData: generateProductData({ name : "" }),
        successMessage: NOTIFICATIONS.PRODUCT_INCORRECT_REQUEST_BODY,
        statusCode: STATUS_CODES.BAD_REQUEST
    },
    {
        title: "Create product WITH over max lenth of name - 100",
        productData: generateProductData({ name : "D".repeat(100) }),
        successMessage: NOTIFICATIONS.PRODUCT_INCORRECT_REQUEST_BODY,
        statusCode: STATUS_CODES.BAD_REQUEST
    },
    {
        title: "Create product WITH two spaces in name",
        productData: generateProductData({ name : "I  am" }),
        successMessage: NOTIFICATIONS.PRODUCT_INCORRECT_REQUEST_BODY,
        statusCode: STATUS_CODES.BAD_REQUEST
    },
    {
        title: "Create product WITH out alphanumerical characters in name",
        productData: generateProductData({ name : "@.,>?!" }),
        successMessage: NOTIFICATIONS.PRODUCT_INCORRECT_REQUEST_BODY,
        statusCode: STATUS_CODES.BAD_REQUEST
    },
    {
        title: "Create product WITH out name",
        productData: generateProductData({ name : undefined! }),
        successMessage: NOTIFICATIONS.PRODUCT_INCORRECT_REQUEST_BODY,
        statusCode: STATUS_CODES.BAD_REQUEST
    },
    {
        title: "Create product WITH not unique name",
        productData: generateProductData({ name : "test" }),
        successMessage: ERROR_MESSAGES.PRODUCT_ALREADY_EXISTS("test"),
        statusCode: STATUS_CODES.CONFLICT
    },
    // Manufacturer
    {
        title: "Create product WITH out manufacturer",
        productData: generateProductData( {manufacturer: undefined! }),
        successMessage: NOTIFICATIONS.PRODUCT_INCORRECT_REQUEST_BODY,
        statusCode: STATUS_CODES.BAD_REQUEST
    },
    // Price
    {
        title: "Create product WITH price 0",
        productData: generateProductData({ price: 0 }),
        successMessage: NOTIFICATIONS.PRODUCT_INCORRECT_REQUEST_BODY,
        statusCode: STATUS_CODES.BAD_REQUEST
    },
    {
        title: "Create product WITH maximal price 1000000",
        productData: generateProductData({ price: 1000000 }),
        successMessage: NOTIFICATIONS.PRODUCT_INCORRECT_REQUEST_BODY,
        statusCode: STATUS_CODES.BAD_REQUEST
    },
    {
        title: "Create product WITH out price",
        productData: generateProductData({ price: undefined! }),
        successMessage: NOTIFICATIONS.PRODUCT_INCORRECT_REQUEST_BODY,
        statusCode: STATUS_CODES.BAD_REQUEST
    },
    // Amount
    {
        title: "Create product WITH amount -100",
        productData: generateProductData({ amount: -100 }),
        successMessage: NOTIFICATIONS.PRODUCT_INCORRECT_REQUEST_BODY,
        statusCode: STATUS_CODES.BAD_REQUEST
    },
    {
        title: "Create product WITH maximal amount 10000",
        productData: generateProductData({ amount: 10000 }),
        successMessage: NOTIFICATIONS.PRODUCT_INCORRECT_REQUEST_BODY,
        statusCode: STATUS_CODES.BAD_REQUEST
    },
    {
        title: "Create product WITH out amount",
        productData: generateProductData({ amount: undefined! }),
        successMessage: NOTIFICATIONS.PRODUCT_INCORRECT_REQUEST_BODY,
        statusCode: STATUS_CODES.BAD_REQUEST
    },
    // Notes
    {
        title: "Create product WITH 300 symbols",
        productData: generateProductData({ notes: "qwerty".repeat(50) }),
        successMessage: NOTIFICATIONS.PRODUCT_INCORRECT_REQUEST_BODY,
        statusCode: STATUS_CODES.BAD_REQUEST
    },
    {
        title: "Create product WITH < symbol",
        productData: generateProductData({ notes: "<" }),
        successMessage: NOTIFICATIONS.PRODUCT_INCORRECT_REQUEST_BODY,
        statusCode: STATUS_CODES.BAD_REQUEST
    },
    {
        title: "Create product WITH > symbols",
        productData: generateProductData({ notes: ">" }),
        successMessage: NOTIFICATIONS.PRODUCT_INCORRECT_REQUEST_BODY,
        statusCode: STATUS_CODES.BAD_REQUEST
    }
]