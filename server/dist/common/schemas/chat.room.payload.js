;
export const genRoomPayload = {
    type: 'object',
    properties: {
        message: {
            type: 'string',
            nullable: false,
        },
    },
    required: ['message'],
    // additionalProperties: false,
};
//# sourceMappingURL=chat.room.payload.js.map