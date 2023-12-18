import { configs } from "../../config.js";
export const userUpdatePayload = {
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
    },
    required: ['department'],
    additionalProperties: false,
};
//# sourceMappingURL=user.update.payload.js.map