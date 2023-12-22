import { JSONSchemaType } from "ajv";

interface Props {
  password: string,
  username: string,
}

export const superUserUpdate: JSONSchemaType<Props> = {
  type: 'object',
  properties: {
    password: {
      type: 'string',
    },
    username: {
      type: 'string',
    }
  },
  required: [],
  additionalProperties: false,
}
