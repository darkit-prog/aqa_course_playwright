import { userSchema } from "./user.schema";
import { obligatoryFieldsSchema, obligatoryRequredFields } from "../core.schema";

export const loginSchema = {
  type: "object",
  properties: {
    User: userSchema,
    ...obligatoryFieldsSchema
  },
  required: [...obligatoryRequredFields, 'User']
};
