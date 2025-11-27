export const productWithSameName = (name: string) => `Product with name '${name}' already exists`

export enum NOTIFICATIONS {
  PRODUCT_CREATED = "Product was successfully created",
  PRODUCT_DELETED = "Product was successfully deleted",
  PRODUCT_INCORRECT_REQUEST_BODY = "Incorrect request body"
}