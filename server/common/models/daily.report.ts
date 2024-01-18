import { CreationOptional,
  DataTypes,
  ForeignKey,
  InferAttributes,
  InferCreationAttributes,
  Model, 
  NonAttribute} from 'sequelize';
import { User } from './user.js';
import { SuperUser } from './super.user.js';

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

export class DailyRpt extends Model<InferAttributes<DailyRpt>,
  InferCreationAttributes<DailyRpt>> {
    declare reportId: CreationOptional<string>;
    declare report: string;
    declare userId: ForeignKey<User['userId']>;
    declare superuserId: ForeignKey<SuperUser['superuserId']>;
    declare SupuerUser?: NonAttribute<SuperUser>;
  };

export const dailyRptCrud = {
  initialize: (sequelize: any) => {
    DailyRpt.init(dailyRptModel, { tableName: 'daily_report', sequelize })
  },
  newReport: (report: any) => {
    return DailyRpt.create(report);
  },
  findReport: (query: any) => {
    return DailyRpt.findOne({ where: query, include: { model: User } });
  },
  findAllReport: (query: any) => {
    return DailyRpt.findAll({ where: query, include: { model: User } });
  },
  updateReport: (query: any, updateValue: any) => {
    return DailyRpt.update(updateValue, { where: query });
  },
  deleteReport: (query: any) => {
    return DailyRpt.destroy({ where: query });
  },
};
