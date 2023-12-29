import { configs } from "../../config.js";
const ADMIN = configs.roles.ADMIN;
;
export const superUserPayload = {
    type: 'object',
    properties: {
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
};
//# sourceMappingURL=super.user.payload.js.map