import { DataTypes, Model } from "sequelize";
const departmentModel = {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
    },
    name: {
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
        return Department.findOne({ where: query });
    },
    updateDept: (query, updateValue) => {
        return Department.update(updateValue, { where: query });
    },
    deleteDept: (query) => {
        return Department.destroy({ where: query });
    },
};
//# sourceMappingURL=department.js.map