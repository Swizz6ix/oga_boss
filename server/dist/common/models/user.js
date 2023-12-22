import { DataTypes, Model } from 'sequelize';
import { configs } from '../../config.js';
import { Task } from './task.js';
import { Department } from './department.js';
import { GenRoom } from './general.room.js';
import { DailyRpt } from './daily.report.js';
// The user's schema
const userModel = {
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        unique: true,
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
    userName: {
        type: DataTypes.STRING(128),
        allowNull: false,
        unique: true,
    },
    // department: {
    //   type: DataTypes.STRING(128),
    //   allowNull: false,
    //   defaultValue: configs.department.UNASSIGNED
    // },
    hod: {
        type: DataTypes.STRING(128),
        allowNull: true,
        defaultValue: configs.hod.NO
    },
    role: {
        type: DataTypes.STRING(128),
        allowNull: false,
        defaultValue: configs.roles.USER
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
export class User extends Model {
}
export const userCrud = {
    initialize: (sequelize) => {
        User.init(userModel, { tableName: 'users', sequelize });
    },
    createUser: (user) => {
        return User.create(user);
    },
    findUser: (query) => {
        return User.findOne({ where: query, include: [Department, Task, DailyRpt, GenRoom] });
    },
    findAllUsers: (query) => {
        return User.findAll({ where: query, include: [Department, Task, DailyRpt, GenRoom]
            // include: [Task, SuperUser, Department ] 
        });
    },
    updateUser: (query, updateValue) => {
        return User.update(updateValue, { where: query });
    },
    deleteUser: (query) => {
        return User.destroy({ where: query });
    },
};
//# sourceMappingURL=user.js.map