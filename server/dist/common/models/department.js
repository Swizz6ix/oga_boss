import { DataTypes, Model } from "sequelize";
import { User } from "./user.js";
import { Task } from "./task.js";
const departmentModel = {
    departmentId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    department: {
        type: DataTypes.STRING(128),
        allowNull: false,
        unique: true,
    },
};
export class Department extends Model {
}
;
export const departmentCrud = {
    initialize: (sequelize) => {
        Department.init(departmentModel, { tableName: 'department', sequelize });
    },
    addDept: (dept) => {
        return Department.create(dept);
    },
    findDept: (query) => {
        return Department.findOne({ where: query,
            include: [{
                    model: User,
                    attributes: {
                        exclude: [
                            'password',
                            'email',
                            'userName',
                            'SuperUserId',
                            'DepartmentId',
                            'createdAt',
                            'updatedAt'
                        ],
                    }
                },
                {
                    model: Task,
                    attributes: {
                        exclude: [
                            'UserId',
                            'DepartmentId',
                            'deadline',
                            'urgencyLevel',
                            'createdAt',
                            'updatedAt'
                        ]
                    }
                }],
            attributes: {
                exclude: [
                    'SuperUserId',
                    'createdAt',
                    'updatedAt'
                ]
            }
        });
    },
    findAllDept: (query) => {
        return Department.findAll({ where: query,
            include: [{
                    model: User,
                    attributes: {
                        exclude: [
                            'password',
                            'email',
                            'userName',
                            'SuperUserId',
                            'DepartmentId',
                            'createdAt',
                            'updatedAt'
                        ],
                    }
                },
                {
                    model: Task,
                    attributes: {
                        exclude: [
                            'UserId',
                            'DepartmentId',
                            'deadline',
                            'urgencyLevel',
                            'createdAt',
                            'updatedAt'
                        ]
                    }
                }],
            attributes: {
                exclude: [
                    'SuperUserId',
                    'createdAt',
                    'updatedAt'
                ]
            }
        });
    },
    updateDept: (query, updateValue) => {
        return Department.update(updateValue, { where: query });
    },
    deleteDept: (query) => {
        return Department.destroy({ where: query });
    },
};
//# sourceMappingURL=department.js.map