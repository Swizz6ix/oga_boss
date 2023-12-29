;
export const departmentPayload = {
    type: 'object',
    properties: {
        department: {
            type: 'string',
            nullable: false,
        },
    },
    required: ['department'],
    additionalProperties: true,
};
//# sourceMappingURL=department.payload.js.map