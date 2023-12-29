import { DataTypes, Model } from "sequelize";
import { configs } from "../../config.js";
import { User } from "./user.js";
import { Department } from "./department.js";
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
            } });
    },
    findAllTasks: (query) => {
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
            } });
    },
    updateTask: (query, updateValue) => {
        return Task.update(updateValue, { where: query });
    },
    deleteTask: (query) => {
        return Task.destroy({ where: query });
    }
};
//# sourceMappingURL=task.js.map