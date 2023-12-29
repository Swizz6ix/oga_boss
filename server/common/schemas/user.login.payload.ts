import { JSONSchemaType } from "ajv";


interface Props {
  username: string,
  password: string,
};

export const userLoginPayload: JSONSchemaType<Props> = {
  type: 'object',
  properties: {
    username: {
      type: 'string',
    },
    password: {
      type: 'string',
    }
  },
  required: [
    'username',
    'password',
  ],
  additionalProperties: false,
};
