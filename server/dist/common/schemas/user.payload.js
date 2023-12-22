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
        userName: {
            type: 'string',
        },
        // department: {
        //   type: 'string',
        //   enum: Object.values(configs.department)
        // },
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
        'password',
        'userName',
        'firstName',
        'lastName',
    ],
    // additionalProperties: false,
};
//# sourceMappingURL=user.payload.js.map