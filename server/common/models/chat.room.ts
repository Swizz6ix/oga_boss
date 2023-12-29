import { CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model } from "sequelize";
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

export class ChatRoom extends Model<InferAttributes<ChatRoom>,
  InferCreationAttributes<ChatRoom>> {
    declare messageId: CreationOptional<string>;
    declare message: string;
    declare messageFrom: string;
  };

export const chatRoomCrud = {
  initialize: (sequelize: any) => {
    ChatRoom.init(chatRoomModel, { tableName: 'chat_room', sequelize });
  },
  postMessage: (message: any) => {
    return ChatRoom.create(message);
  },
  getMessage: (query: any) => {
    return ChatRoom.findOne({ where: query, include: [SuperUser, User] });
  },
  getAllMessages: (query: any) => {
    return ChatRoom.findAll({ where: query, include: [SuperUser, User] });
  },
  updateMessage: (query: any, updateValue: any) => {
    return ChatRoom.update(updateValue, { where: query });
  },
  deleteMessage: (query: any) => {
    return ChatRoom.destroy({ where: query });
  },
};
