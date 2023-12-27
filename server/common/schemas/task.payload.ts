import { JSONSchemaType } from "ajv";
import { configs } from "../../config.js";


interface Props {
  name: string,
  description: string,
  deadline: string,
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
    urgencyLevel: {
      type: 'string',
      enum: Object.values(configs.urgencyLevel)
    },
  },
  required: [
    'name',
    'description',
    'deadline',
  ],
  additionalProperties: true,
};
