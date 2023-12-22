import { CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model } from "sequelize";
import { User } from "./user.js";

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

export class GenRoom extends Model<InferAttributes<GenRoom>,
  InferCreationAttributes<GenRoom>> {
    declare id: CreationOptional<string>;
    declare message: string;
  };

export const genRoomCrud = {
  initialize: (sequelize: any) => {
    GenRoom.init(genRoomModel, { tableName: 'general_room', sequelize });
  },
  postMessage: (message: any) => {
    return GenRoom.create(message);
  },
  getMessage: (query: any) => {
    return GenRoom.findOne({ where: query, include: [User] });
  },
  getAllMessages: (query: any) => {
    return GenRoom.findAll({ where: query, include: [User] })
  },
  updateMessage: (query: any, updateValue: any) => {
    return GenRoom.update(updateValue, { where: query });
  },
  deleteMessage: (query: any) => {
    return GenRoom.destroy({ where: query });
  },
};
