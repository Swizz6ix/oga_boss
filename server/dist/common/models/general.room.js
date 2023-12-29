import { DataTypes, Model } from "sequelize";
import { User } from "./user.js";
const chatRoomModel = {
    messageId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
    },
    message: {
        type: DataTypes.STRING(128),
        allowNull: false,
    },
    messageFrom: {
        type: DataTypes.STRING(128),
    }
};
export class GenRoom extends Model {
}
;
export const genRoomCrud = {
    initialize: (sequelize) => {
        GenRoom.init(chatRoomModel, { tableName: 'chat_room', sequelize });
    },
    postMessage: (message) => {
        return GenRoom.create(message);
    },
    getMessage: (query) => {
        return GenRoom.findOne({ where: query, include: [User] });
    },
    getAllMessages: (query) => {
        return GenRoom.findAll({ where: query, include: [User] });
    },
    updateMessage: (query, updateValue) => {
        return GenRoom.update(updateValue, { where: query });
    },
    deleteMessage: (query) => {
        return GenRoom.destroy({ where: query });
    },
};
//# sourceMappingURL=general.room.js.map