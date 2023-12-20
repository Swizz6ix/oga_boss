import { CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model } from "sequelize";

const departmentModel = {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING(128),
    allowNull: false,
    unique: true,
  },
};

export class Department extends Model<InferAttributes<Department>,
  InferCreationAttributes<Department>> {
    declare id: CreationOptional<string>;
    declare name: string;
  };

export const departmentCrud = {
  initialize: (sequelize: any) => {
    Department.init(departmentModel, { tableName: 'department', sequelize });
  },
  addDept: (dept: any) => {
    return Department.create(dept);
  },
  findDept: (query: any) => {
    return Department.findOne({ where: query })
  },
  updateDept: (query: any, updateValue: any) => {
    return Department.update(updateValue, { where: query });
  },
  deleteDept: (query: any) => {
    return Department.destroy({ where: query });
  },
}
