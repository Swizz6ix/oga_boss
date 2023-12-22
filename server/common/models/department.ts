import { Association, CreationOptional,
  DataTypes,
  HasManyCountAssociationsMixin,
  HasManyGetAssociationsMixin,
  InferAttributes,
  InferCreationAttributes,
  Model, 
  NonAttribute} from "sequelize";
import { User } from "./user.js";

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
    declare getUsers: HasManyGetAssociationsMixin<User>;
    declare countUsers: HasManyCountAssociationsMixin;
    declare Users?: NonAttribute<User[]>;
    declare static associations: {
      Users: Association<Department, User>;
    }
  };

export const departmentCrud = {
  initialize: (sequelize: any) => {
    Department.init(departmentModel, { tableName: 'department', sequelize });
  },
  addDept: (dept: any) => {
    return Department.create(dept);
  },
  findDept: (query: any) => {
    return Department.findOne({ where: query, include: { model: User } })
  },
  findAllDept: (query: any) => {
    return Department.findAll({ where: query, include: { model: User } });
  },
  updateDept: (query: any, updateValue: any) => {
    return Department.update(updateValue, { where: query });
  },
  deleteDept: (query: any) => {
    return Department.destroy({ where: query });
  },
}
