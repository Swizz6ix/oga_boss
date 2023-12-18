import { JSONSchemaType } from "ajv";
import { configs } from "../../config.js";

interface Props {
  email: string,
  userName: string,
  department: string,
  hod?: string,
  role: string,
  firstName: string,
  lastName: string,
}

export const userPayload: JSONSchemaType<Props> = {
  type: 'object',
  properties: {
    email: {
      type: 'string',
      pattern: '^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$',
    },
    userName: {
      type: 'string',
    },
    department: {
      type: 'string',
      enum: Object.values(configs.department)
    },
    hod: {
      type: 'string',
      nullable: true,
      enum: Object.values(configs.hod),
    },
    role: {
      type: 'string',
      enum: Object.values(configs.roles)
    },
    firstName: {
      type: 'string',
    },
    lastName: {
      type: 'string',
    }
  },
  required: [
    'email',
    'userName',
    'firstName',
    'lastName',
  ],
  additionalProperties: false,
};
