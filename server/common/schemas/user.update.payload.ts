import { JSONSchemaType } from "ajv";
import { configs } from "../../config.js";

interface Props {
  // department: string,
  hod?: string,
  role: string,
  password: string,
  username: string,
  position: string,
  vacation: boolean,
}

export const userUpdatePayload: JSONSchemaType<Props> = {
  type: 'object',
  properties: {
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
    username: {
      type: 'string',
    },
    position: {
      type: 'string',
    },
    vacation: {
      type: 'boolean',
    }
  },
  required: [],
  additionalProperties: false,
};
