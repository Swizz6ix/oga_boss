import { CreationOptional, DataTypes, ForeignKey, InferAttributes, InferCreationAttributes, Model, NonAttribute } from "sequelize";
import { configs } from "../../config.js";
import { User } from "./user.js";
import { Department } from "./department.js";
import { SuperUser } from "./super.user.js";

const taskModel = {
  taskId: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },

  title: {
    type: DataTypes.STRING(128),
    allowNull: false,
  },

  description: {
    type: DataTypes.STRING(128),
    allowNull: false,
  },

  deadline: {
    type: DataTypes.STRING(128),
    allowNull: false,
  },

  urgencyLevel: {
    type: DataTypes.STRING(128),
    allowNull: false,
    defaultValue: configs.urgencyLevel.NORMAL
  },
  
  progress: {
    type: DataTypes.STRING(128),
    defaultValue: configs.progressLevel.INPROGRESS,
  }
}

export class Task extends Model<InferAttributes<Task>, InferCreationAttributes<Task>> {
  declare taskId: CreationOptional<number>;
  declare title: string;
  declare description: string;
  declare deadline: Date;
  declare urgencyLevel: string;
  declare progress: string;
  declare userId: ForeignKey<User['userId']>;
  declare superuserId: ForeignKey<SuperUser['superuserId']>;
  declare User?: NonAttribute<User>;
  declare SuperUser?: NonAttribute<SuperUser>;
}

export const taskCrud = {
  initialize: (sequelize: any) => {
    Task.init(taskModel, { tableName: 'tasks', sequelize });
  },

  createTask: (task: any) => {
    return Task.create(task, { include: User, required: true });
  },

  findTask: (query: any) => {
    return Task.findOne({ where: query, include: [{
      model: User,
      attributes: {
        exclude: [
          'password',
          'email',
          'username',
          'role',
          'superuserId',
          'createdAt',
          'updatedAt',
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
      }
    }],
    attributes: {
      exclude: [
        'deadline',
        'urgencyLevel',
        'UserId',
        'DepartmentId',
        'createdAt',
        'updatedAt'
      ]
    }});
  },

  findAllTasks: (query: any) => {
    return Task.findAll({ where: query, include: [{
      model: User,
      attributes: {
        exclude: [
          'password',
          'email',
          'role',
          'username',
          'superuserId',
          'departmentId',
          'createdAt',
          'updatedAt',
        ],
      }
    },
    {
      model: Department,
      attributes: {
        exclude: [
          'SuperUserId',
          'createdAt',
          'updatedAt',
        ],
      }
    }],
    attributes: {
      exclude: [
        'deadline',
        'urgencyLevel',
        'UserId',
        'DepartmentId',
        'createdAt',
        'updatedAt'
      ]
    }});
  },

  updateTask: (query: any, updateValue: any) => {
    return Task.update(updateValue, { where: query });
  },

  deleteTask: (query: any) => {
    return Task.destroy({ where: query});
  }
}
