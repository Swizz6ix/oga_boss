import { CreationOptional, DataTypes, ForeignKey, InferAttributes, InferCreationAttributes, Model, NonAttribute } from 'sequelize';
import { configs } from '../../config.js';
import { Task } from './task.js';
import { SuperUser } from './super.user.js';
import { Department } from './department.js';


// The user's schema
const userModel = {
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    unique: true,
    primaryKey: true,
  },
  email: {
    type: DataTypes.STRING(128),
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING(128),
    allowNUll: false,
  },
  userName: {
    type: DataTypes.STRING(128),
    allowNull: false,
    unique: true,
  },
  // department: {
  //   type: DataTypes.STRING(128),
  //   allowNull: false,
  //   defaultValue: configs.department.UNASSIGNED
  // },
  hod: {
    type: DataTypes.STRING(128),
    allowNull: true,
    defaultValue: configs.hod.NO
  },
  role: {
    type: DataTypes.STRING(128),
    allowNull: false,
    defaultValue: configs.roles.USER
  },
  firstName: {
    type: DataTypes.STRING(128),
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING(128),
    allowNull: false,
  }
};

export class User extends Model<InferAttributes<User>, InferCreationAttributes<User>>
{
  declare id: CreationOptional<number>;
  declare email: string;
  declare password: string;
  declare userName: string;
  // declare department: string;
  declare hod: string | null;
  declare role: string;
  declare firstName: string;
  declare lastName: string;
  declare SuperUserId: ForeignKey<SuperUser['id']>;
  declare SuperUser?: NonAttribute<SuperUser>
}

export const userCrud = {
  initialize: (sequelize: any) => {
    User.init(userModel, { tableName: 'users', sequelize });
  },
  createUser: (user: any) => {
    return User.create(user);
  },

  findUser: (query: any) => {
    return User.findOne({ where: query, include: [Task, Department] });
  },

  findAllUsers: (query: any) => {
    return User.findAll({ where: query, include: [Task, SuperUser, Department ] });
  },

  updateUser: (query: any, updateValue: any) => {
    return User.update(updateValue, { where: query });
  },

  deleteUser: (query: any) => {
    return User.destroy({ where: query })
  },
};
