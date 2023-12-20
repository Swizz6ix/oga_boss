import { DataTypes, Model } from "sequelize";
const genRoomModel = {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
    },
    message: {
        type: DataTypes.STRING(128),
        allowNull: false,
    },
};
export class GenRoom extends Model {
}
;
export const genRoomCrud = {
    initialize: (sequelize) => {
        GenRoom.init(genRoomModel, { tableName: 'general_room', sequelize });
    },
    postMessage: (message) => {
        return GenRoom.create(message);
    },
    getMessage: (query) => {
        return GenRoom.findOne({ where: query });
    },
    updateMessage: (query, updateValue) => {
        return GenRoom.update(updateValue, { where: query });
    },
    deleteMessage: (query) => {
        return GenRoom.destroy({ where: query });
    },
};
//# sourceMappingURL=general.room.js.map