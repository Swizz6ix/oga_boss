import { JSONSchemaType } from "ajv";

interface Props {
  department: string,
  description: string
};

export const departmentPayload: JSONSchemaType<Props> = {
  type: 'object',
  properties: {
    department: {
      type: 'string',
      nullable: false,
    },
    description: {
      type: 'string',
      nullable: false,
    }
  },
  required: ['department'],
  additionalProperties: true,
}
