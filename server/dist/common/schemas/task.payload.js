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
        urgencyLevel: {
            type: 'string',
            enum: Object.values(configs.urgencyLevel)
        },
    },
    required: [
        'name',
        'description',
        'deadline',
    ],
    additionalProperties: true,
};
//# sourceMappingURL=task.payload.js.map