import { JSONSchemaType } from "ajv";
import { configs } from "../../config.js";

const ADMIN = configs.roles.ADMIN;

interface Props {
  id: string,
  company: string,
  email: string,
  password: string,
  username: string,
  role: string,
  firstName: string,
  lastName: string,
};

export const superUserPayload: JSONSchemaType<Props> = {
  type: 'object',
  properties: {
    id: {
      type: 'string',
      nullable: false,
    },
    company: {
      type: 'string',
      nullable: false,
    },
    email: {
      type: 'string',
      pattern: '^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$',
      nullable: false,
    },
    password: {
      type: 'string',
      nullable: false,
    },
    username: {
      type: 'string',
      nullable: false,
    },
    role: {
      type: 'string',
      enum: Object.values(configs.roles),
      default: ADMIN
    },
    firstName: {
      type: 'string',
      nullable: false,
    },
    lastName: {
      type: 'string',
      nullable: false,
    }
  },
  required: [
    'company',
    'email',
    'password',
    'username',
    'firstName',
    'lastName',
  ],
  additionalProperties: false,
}
