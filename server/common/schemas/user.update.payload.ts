import { JSONSchemaType } from "ajv";
import { configs } from "../../config.js";

interface Props {
  department: string,
  hod?: string,
  role: string,
  password: string,
  userName: string,
}

export const userUpdatePayload: JSONSchemaType<Props> = {
  type: 'object',
  properties: {
    department: {
      type: 'string',
      enum: Object.values(configs.department),
    },
    hod: {
      type: 'string',
      nullable: true,
      enum: Object.values(configs.hod),
    },
    role: {
      type: 'string',
      enum: Object.values(configs.roles),
    },
    password: {
      type: 'string',
    },
    userName: {
      type: 'string',
    }
  },
  required: [],
  additionalProperties: false,
};
