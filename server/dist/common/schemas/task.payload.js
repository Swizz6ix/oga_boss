import { configs } from "../../config.js";
export const taskPayload = {
    type: 'object',
    properties: {
        name: {
            type: 'string',
        },
        description: {
            type: 'string',
        },
        deadline: {
            type: 'string',
        },
        department: {
            type: 'string',
            enum: Object.values(configs.department)
        },
        urgencyLevel: {
            type: 'string',
            enum: Object.values(configs.urgencyLevel)
        },
    },
    required: [
        'name',
        'description',
        'deadline',
        'department',
    ],
    additionalProperties: true,
};
//# sourceMappingURL=task.payload.js.map