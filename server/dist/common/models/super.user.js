import { DataTypes, Model, } from 'sequelize';
import { User } from './user.js';
const superUserModel = {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
    },
    company: {
        type: DataTypes.STRING(128),
        allowNull: false,
        unique: true,
    },
    email: {
        type: DataTypes.STRING(128),
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING(128),
        allowNull: false,
    },
    username: {
        type: DataTypes.STRING(128),
        allowNull: false,
        unique: true,
    },
    firstName: {
        type: DataTypes.STRING(128),
        allowNull: false,
    },
    lastName: {
        type: DataTypes.STRING(128),
        allowNull: false,
    },
};
export class SuperUser extends Model {
}
export const superUserCrud = {
    initialize: (sequelize) => {
        SuperUser.init(superUserModel, { tableName: 'super_user', sequelize });
    },
    register: (superUser) => {
        return SuperUser.create(superUser);
    },
    findUser: (query) => {
        return SuperUser.findOne({ where: query, include: { model: User } });
    },
    updateUser: (query, updateValue) => {
        return SuperUser.update(updateValue, { where: query });
    },
    deleteUser: (query) => {
        return SuperUser.destroy({ where: query });
    },
};
//# sourceMappingURL=super.user.js.map