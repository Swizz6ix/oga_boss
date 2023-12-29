import { configs } from "../../config.js";
export const taskUpdatePayload = {
    type: 'object',
    properties: {
        title: {
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
            enum: Object.values(configs.urgencyLevel),
        },
        progress: {
            type: 'string',
            enum: Object.values(configs.progressLevel),
            default: configs.progressLevel.INPROGRESS,
        }
    },
    required: [
        'title',
    ],
    additionalProperties: false,
};
//# sourceMappingURL=task.update.payload.js.map