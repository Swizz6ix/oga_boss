;
export const userLoginPayload = {
    type: 'object',
    properties: {
        username: {
            type: 'string',
        },
        password: {
            type: 'string',
        }
    },
    required: [
        'username',
        'password',
    ],
    additionalProperties: false,
};
//# sourceMappingURL=user.login.payload.js.map