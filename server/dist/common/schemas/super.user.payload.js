;
export const superUserPayload = {
    type: 'object',
    properties: {
        id: {
            type: 'string',
            nullable: false,
        },
        company: {
            type: 'string',
            nullable: false,
        },
        email: {
            type: 'string',
            pattern: '^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$',
            nullable: false,
        },
        password: {
            type: 'string',
            nullable: false,
        },
        username: {
            type: 'string',
            nullable: false,
        },
        firstName: {
            type: 'string',
            nullable: false,
        },
        lastName: {
            type: 'string',
            nullable: false,
        }
    },
    required: [
        // 'id',
        'company',
        'email',
        'password',
        'username',
        'firstName',
        'lastName',
    ],
    additionalProperties: false,
};
//# sourceMappingURL=super.user.payload.js.map