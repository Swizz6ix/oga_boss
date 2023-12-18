import { DataTypes, Model } from "sequelize";
import { configs } from "../../config.js";
import { User } from "./user.js";
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
};
export class Task extends Model {
}
export const taskCrud = {
    initialize: (sequelize) => {
        Task.init(taskModel, { tableName: 'tasks', sequelize });
    },
    createTask: (task) => {
        return Task.create(task, { include: User, required: true });
    },
    findTask: (query) => {
        return Task.findOne({ where: query, include: { model: User } });
    },
    findAllTasks: (query) => {
        return Task.findAll({ where: query, include: { model: User } });
    },
    updateTask: (query, updateValue) => {
        return Task.update(updateValue, { where: query });
    },
    deleteTask: (query) => {
        return Task.destroy({ where: query });
    }
};
//# sourceMappingURL=task.js.map