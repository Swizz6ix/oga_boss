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
    description: {
        type: DataTypes.STRING(1024),
        allowNull: false
    }
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
                            'role',
                            'hod',
                            'vacation',
                            'password',
                            'email',
                            'userName',
                            'createdAt',
                            'updatedAt'
                        ],
                    }
                },
                {
                    model: Task,
                    attributes: {
                        exclude: [
                            'deadline',
                            'urgencyLevel',
                            'createdAt',
                            'updatedAt'
                        ]
                    }
                }],
            attributes: {
                exclude: [
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
                            'hod',
                            'role',
                            'vacation',
                            'password',
                            'userName',
                            'createdAt',
                            'updatedAt'
                        ],
                    }
                },
                {
                    model: Task,
                    attributes: {
                        exclude: [
                            'deadline',
                            'urgencyLevel',
                            'createdAt',
                            'updatedAt'
                        ]
                    }
                }],
            attributes: {
                exclude: [
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