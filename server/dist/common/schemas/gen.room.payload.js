;
export const genRoomPayload = {
    type: 'object',
    properties: {
        message: {
            type: 'string',
            nullable: false,
        },
        messageFrom: {
            type: 'string',
        }
    },
    required: ['message'],
    additionalProperties: false,
};
//# sourceMappingURL=gen.room.payload.js.map