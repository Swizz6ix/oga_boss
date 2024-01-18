import { DataTypes, Model } from "sequelize";
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
export class Logger extends Model {
}
export const loggerCrud = {
    initialize: (sequelize) => {
        Logger.init(loggerModel, { tableName: 'sys_logs', timestamps: false, sequelize });
    },
    getLog: (query) => {
        return Logger.findOne({ where: query });
    },
    getAllLogs: (query) => {
        return Logger.findAll({ where: query });
    },
    deleteLog: (query) => {
        return Logger.destroy({ where: query });
    },
};
//# sourceMappingURL=logger.js.map