import { Association, Attributes, CreationOptional, DataTypes, ForeignKey, HasManyCountAssociationsMixin, HasManyGetAssociationsMixin, InferAttributes, InferCreationAttributes, Model, ModelAttributeColumnOptions, ModelStatic, NonAttribute } from 'sequelize';
import { configs } from '../../config.js';
import { Task } from './task.js';
import { SuperUser } from './super.user.js';
import { Department } from './department.js';
import { ChatRoom } from './chat.room.js';
import { DailyRpt } from './daily.report.js';


// The user's schema
const userModel = {
  userId: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
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
  username: {
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
  vacation: {
    type: DataTypes.BOOLEAN,
    defaultValue: configs.vacation.FALSE,
  },
  position: {
    type: DataTypes.STRING(128),
    allowNull: false,
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
  declare userId: CreationOptional<number>;
  declare email: string;
  declare password: string;
  declare username: string;
  declare hod: string | null;
  declare role: string;
  declare vacation: boolean;
  declare position: string;
  declare firstName: string;
  declare lastName: string;
  declare getTasks: HasManyGetAssociationsMixin<Task>;
  declare getDailyRpts: HasManyGetAssociationsMixin<DailyRpt>;
  declare getChatRooms: HasManyGetAssociationsMixin<ChatRoom>;
  declare countTasks: HasManyCountAssociationsMixin;
  declare countDailyRpts: HasManyCountAssociationsMixin;
  declare countChatRooms: HasManyCountAssociationsMixin;
  declare Tasks?: NonAttribute<Task[]>;
  declare DailyRpts?: NonAttribute<DailyRpt[]>;
  declare ChatRooms?: NonAttribute<ChatRoom[]>;
  declare static association: {
    Tasks: Association<User, Task>;
    DailyRpts: Association<User, DailyRpt>;
    GenRooms: Association<User, ChatRoom>;
  };
  declare superuserId: ForeignKey<SuperUser['superuserId']>;
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
        model: ChatRoom,
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
        ChatRoom,
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
