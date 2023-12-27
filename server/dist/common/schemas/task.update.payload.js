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
        urgencyLevel: {
            type: 'string',
            enum: Object.values(configs.urgencyLevel)
        },
    },
    required: ['name'],
    additionalProperties: false,
};
//# sourceMappingURL=task.update.payload.js.map