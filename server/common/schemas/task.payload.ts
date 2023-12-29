import { JSONSchemaType } from "ajv";
import { configs } from "../../config.js";


interface Props {
  title: string,
  description: string,
  deadline: string,
  urgencyLevel: string,
  progress: string,
}

export const taskPayload: JSONSchemaType<Props> = {
  type: 'object',
  properties: {
    title: {
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
    progress: {
      type: 'string',
      enum: Object.values(configs.progressLevel),
      default: configs.progressLevel.INPROGRESS,
    }
  },
  required: [
    'title',
    'description',
    'deadline',
  ],
  additionalProperties: true,
};
