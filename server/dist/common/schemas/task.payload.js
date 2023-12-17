export const taskPayload = {
    type: Object,
    properties: {
        name: {
            type: 'string',
        },
        description: {
            type: 'string',
        },
        duration: {
            type: 'string',
        },
        department: {
            type: 'string',
        },
        urgencyLevel: {
            type: 'string',
        },
    },
    required: [
        'name',
        'description',
        'duration',
        'department',
        'urgencyLevel',
    ],
    additionalProperties: false,
};
//# sourceMappingURL=task.payload.js.map