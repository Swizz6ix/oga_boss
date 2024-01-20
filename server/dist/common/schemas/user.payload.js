import { configs } from "../../config.js";
export const userPayload = {
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
//# sourceMappingURL=user.payload.js.map