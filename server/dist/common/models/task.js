import { DataTypes, Model } from "sequelize";
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
};
class Task extends Model {
}
export const taskCrud = {
    initialize: (sequelize) => {
        Task.init(taskModel, { tableName: 'tasks', sequelize });
    },
    createTask: (task) => {
        return Task.create(task);
    },
    findTask: (query) => {
        return Task.findOne({ where: query });
    },
    findAllTasks: (query) => {
        return Task.findAll({ where: query });
    },
    updateTask: (query, updateValue) => {
        return Task.update(updateValue, { where: query });
    },
    deleteTask: (query) => {
        return Task.destroy({ where: query });
    }
};
//# sourceMappingURL=task.js.map