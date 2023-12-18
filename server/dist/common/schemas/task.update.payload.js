import { configs } from "../../config.js";
export const taskUpdatePayload = {
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
    required: ['name'],
    additionalProperties: false,
};
//# sourceMappingURL=task.update.payload.js.map