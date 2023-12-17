import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from "sequelize";

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

  duration: {
    type: DataTypes.DATE,
    allowNull: false,
  },

  department: {
    type: DataTypes.STRING(128),
    allowNul: false,
  },

  urgencyLevel: {
    type: DataTypes.STRING(128),
    allowNull: false
  }
}

class Task extends Model<InferAttributes<Task>, InferCreationAttributes<Task>> {
  declare id: CreationOptional<number>;
  declare name: string;
  declare description: string;
  declare duration: Date;
  declare department: string;
  declare urgencyLevel: string;
}

export const taskCrud = {
  initialize: (sequelize: any) => {
    Task.init(taskModel, { tableName: 'tasks', sequelize });
  },

  createTask: (task: any) => {
    return Task.create(task);
  },

  findTask: (query: any) => {
    return Task.findOne({ where: query});
  },

  findAllTasks: (query: any) => {
    return Task.findAll({ where: query });
  },

  updateTask: (query: any, updateValue: any) => {
    return Task.update(updateValue, { where: query });
  },

  deleteTask: (query: any) => {
    return Task.destroy({ where: query});
  }
}
