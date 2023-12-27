import { CreationOptional, DataTypes, ForeignKey, InferAttributes, InferCreationAttributes, Model, NonAttribute } from "sequelize";
import { configs } from "../../config.js";
import { User } from "./user.js";
import { Department } from "./department.js";

const taskModel = {
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    unique: true,
    primaryKey: true,
  },

  name: {
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

  department: {
    type: DataTypes.STRING(128),
    allowNul: false,
  },

  urgencyLevel: {
    type: DataTypes.STRING(128),
    allowNull: false,
    defaultValue: configs.urgencyLevel.NORMAL
  }
}

export class Task extends Model<InferAttributes<Task>, InferCreationAttributes<Task>> {
  declare id: CreationOptional<number>;
  declare name: string;
  declare description: string;
  declare deadline: Date;
  declare department: string;
  declare urgencyLevel: string;
  declare UserId: ForeignKey<User['id']>;
  declare User?: NonAttribute<User>;
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
          'userName',
          'SuperUserId',
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
          'userName',
          'SuperUserId',
          'DepartmentId',
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
