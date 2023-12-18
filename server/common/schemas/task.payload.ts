import { JSONSchemaType } from "ajv";
import { configs } from "../../config.js";


interface Props {
  name: string,
  description: string,
  deadline: string,
  department: string,
  urgencyLevel: string,
}

export const taskPayload: JSONSchemaType<Props> = {
  type: 'object',
  properties: {
    name: {
      type: 'string',
    },
    description: {
      type: 'string',
    },
    deadline: {
      type: 'string',
    },
    department: {
      type: 'string',
      enum: Object.values(configs.department)
    },
    urgencyLevel: {
      type: 'string',
      enum: Object.values(configs.urgencyLevel)
    },
  },
  required: [
    'name',
    'description',
    'deadline',
    'department',
  ],
  additionalProperties: true,
};
