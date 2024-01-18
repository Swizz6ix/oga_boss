import { CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes, Model, Sequelize } from "sequelize";

const loggerModel = {
  logId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  level: {
    type: DataTypes.STRING(16),
    allowNull: false,
  },
  source: {
    type: DataTypes.STRING(1024),
    allowNull: false,
  },
  metadata: {
    type: DataTypes.STRING(2048),
    allowNull: false,
  },
  time: {
    type: DataTypes.DATE,
    allowNull: false,
  },
};

export class Logger extends Model<InferAttributes<Logger>,
  InferCreationAttributes<Logger>> {
    declare logId: CreationOptional<number>;
    declare level: string;
    declare source: string;
    declare metadata: string;
    declare time: string;
  }

export const loggerCrud = {
  initialize: (sequelize: Sequelize ) => {
    Logger.init(loggerModel, { tableName: 'sys_logs', timestamps: false, sequelize });
  },
  getLog: (query: any) => {
    return Logger.findOne({ where: query });
  },
  getAllLogs: (query: any) => {
    return Logger.findAll({ where: query });
  },
  deleteLog: (query: any) => {
    return Logger.destroy({ where: query });
  },
};
