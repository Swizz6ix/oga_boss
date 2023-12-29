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
//# sourceMappingURL=chat.room.payload.js.map