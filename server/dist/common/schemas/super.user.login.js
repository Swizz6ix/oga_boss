;
export const superUserLogin = {
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
//# sourceMappingURL=super.user.login.js.map