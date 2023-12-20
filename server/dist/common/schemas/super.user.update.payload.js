export const superUserUpdate = {
    type: 'object',
    properties: {
        password: {
            type: 'string',
        },
        username: {
            type: 'string',
        }
    },
    required: ['password'],
    additionalProperties: false,
};
//# sourceMappingURL=super.user.update.payload.js.map