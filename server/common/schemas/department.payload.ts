import { JSONSchemaType } from "ajv";

interface Props {
  name: string,
};

export const departmentPayload: JSONSchemaType<Props> = {
  type: 'object',
  properties: {
    name: {
      type: 'string',
      nullable: false,
    },
  },
  required: ['name'],
  // additionalProperties: false,
}
