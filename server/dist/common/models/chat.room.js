import { DataTypes, Model } from "sequelize";
import { User } from "./user.js";
import { SuperUser } from "./super.user.js";
const chatRoomModel = {
    messageId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    message: {
        type: DataTypes.STRING(128),
        allowNull: false,
    },
    messageFrom: {
        type: DataTypes.STRING(128),
    }
};
export class ChatRoom extends Model {
}
;
export const chatRoomCrud = {
    initialize: (sequelize) => {
        ChatRoom.init(chatRoomModel, { tableName: 'chat_room', sequelize });
    },
    postMessage: (message) => {
        return ChatRoom.create(message);
    },
    getMessage: (query) => {
        return ChatRoom.findOne({ where: query, include: [SuperUser, User] });
    },
    getAllMessages: (query) => {
        return ChatRoom.findAll({ where: query, include: [SuperUser, User] });
    },
    updateMessage: (query, updateValue) => {
        return ChatRoom.update(updateValue, { where: query });
    },
    deleteMessage: (query) => {
        return ChatRoom.destroy({ where: query });
    },
};
//# sourceMappingURL=chat.room.js.map