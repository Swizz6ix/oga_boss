import { JSONSchemaType } from "ajv";


interface Props {
  userName: string,
  password: string,
};

export const userLoginPayload: JSONSchemaType<Props> = {
  type: 'object',
  properties: {
    userName: {
      type: 'string',
    },
    password: {
      type: 'string',
    }
  },
  required: [
    'userName',
    'password',
  ],
  additionalProperties: false,
};
