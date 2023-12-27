import { Association, Attributes, CreationOptional, DataTypes, ForeignKey, HasManyCountAssociationsMixin, HasManyGetAssociationsMixin, InferAttributes, InferCreationAttributes, Model, ModelAttributeColumnOptions, ModelStatic, NonAttribute } from 'sequelize';
import { configs } from '../../config.js';
import { Task } from './task.js';
import { SuperUser } from './super.user.js';
import { Department } from './department.js';
import { GenRoom } from './general.room.js';
import { DailyRpt } from './daily.report.js';


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
  hod: {
    type: DataTypes.STRING(128),
    allowNull: true,
    defaultValue: configs.hod.NO,
  },
  role: {
    type: DataTypes.STRING(128),
    allowNull: false,
    defaultValue: configs.roles.USER,
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

// function getAtrr<M extends Model>(model: ModelStatic<M>, attributeName: keyof Attributes<M>): ModelAttributeColumnOptions {
//   model.getAttributes;
// }
export class User extends Model<InferAttributes<User>, InferCreationAttributes<User>>
{
  declare id: CreationOptional<number>;
  declare email: string;
  declare password: string;
  declare userName: string;
  declare hod: string | null;
  declare role: string;
  declare firstName: string;
  declare lastName: string;
  declare getTasks: HasManyGetAssociationsMixin<Task>;
  declare getDailyRpts: HasManyGetAssociationsMixin<DailyRpt>;
  declare getGenRooms: HasManyGetAssociationsMixin<GenRoom>;
  declare countTasks: HasManyCountAssociationsMixin;
  declare countDailyRpts: HasManyCountAssociationsMixin;
  declare countGenRooms: HasManyCountAssociationsMixin;
  declare Tasks?: NonAttribute<Task[]>;
  declare DailyRpts?: NonAttribute<DailyRpt[]>;
  declare GenRooms?: NonAttribute<GenRoom[]>;
  declare static association: {
    Tasks: Association<User, Task>;
    DailyRpts: Association<User, DailyRpt>;
    GenRooms: Association<User, GenRoom>;
  };
  declare SuperUserId: ForeignKey<SuperUser['id']>;
  declare SuperUser?: NonAttribute<SuperUser>;
}

export const userCrud = {
  initialize: (sequelize: any) => {
    User.init(userModel, { tableName: 'users', sequelize });
  },
  createUser: (user: any) => {
    return User.create(user);
  },

  findUser: (query: any) => {
    return User.findOne({
      where: query,
      include: [{
        model: SuperUser,
        attributes: {
          exclude: [
            'password',
            'username',
            'createdAt',
            'updatedAt',
            'role',
          ],
        },
      },
      {
        model: Department,
        attributes: {
          exclude: [
            'SuperUserId',
            'createdAt',
            'updatedAt',
          ],
        },
      },
      {
        model: Task,
        attributes: {
          exclude: [
            'UserId',
            'DepartmentId',
          ],
        },
      },
      {
        model: DailyRpt,
        attributes: {
          exclude: ['UserId']
        }
      },
      {
        model: GenRoom,
        attributes: {
          exclude: [
            'UserId',
            'SuperUserId',
          ],
        },
      }],
    });
  },

  findAllUsers: (query: any) => {
    return User.findAll({ where: query,
      include: [
        SuperUser,
        Department,
        Task,
        DailyRpt,
        GenRoom,
      ],
    });
  },

  updateUser: (query: any, updateValue: any) => {
    return User.update(updateValue, { where: query });
  },

  deleteUser: (query: any) => {
    return User.destroy({ where: query })
  },
};
