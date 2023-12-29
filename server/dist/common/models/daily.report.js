import { DataTypes, Model } from 'sequelize';
import { User } from './user.js';
const dailyRptModel = {
    reportId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
    },
    report: {
        type: DataTypes.STRING(128),
        allowNull: false,
    },
};
export class DailyRpt extends Model {
}
;
export const dailyRptCrud = {
    initialize: (sequelize) => {
        DailyRpt.init(dailyRptModel, { tableName: 'daily_report', sequelize });
    },
    newReport: (report) => {
        return DailyRpt.create(report);
    },
    findReport: (query) => {
        return DailyRpt.findOne({ where: query, include: { model: User } });
    },
    findAllReport: (query) => {
        return DailyRpt.findAll({ where: query, include: { model: User } });
    },
    updateReport: (query, updateValue) => {
        return DailyRpt.update(updateValue, { where: query });
    },
    deleteReport: (query) => {
        return DailyRpt.destroy({ where: query });
    },
};
//# sourceMappingURL=daily.report.js.map