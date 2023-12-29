import { configs } from "../../config.js";
export const userUpdatePayload = {
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
//# sourceMappingURL=user.update.payload.js.map