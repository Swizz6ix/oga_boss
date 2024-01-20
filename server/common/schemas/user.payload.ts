import { JSONSchemaType } from "ajv";
import { configs } from "../../config.js";

interface Props {
  email: string,
  password: string,
  username: string,
  hod?: string,
  role: string,
  vacation: boolean,
  position: string,
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
    password: {
      type: 'string',
      nullable: false,
    },
    username: {
      type: 'string',
    },
    hod: {
      type: 'string',
      nullable: true,
      enum: Object.values(configs.hod),
    },
    role: {
      type: 'string',
      enum: Object.values(configs.roles),
      default: configs.roles.USER,
    },
    vacation: {
      type: 'boolean',
      enum: Object.values(configs.vacation),
      default: configs.vacation.TRUE,
    },
    position: {
      type: 'string',
      nullable: false,
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
    'password',
    'position',
    'username',
    'firstName',
    'lastName',
  ],
  additionalProperties: true,
};
