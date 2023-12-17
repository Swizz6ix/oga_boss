import { DataTypes, Model } from "sequelize";
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
    userName: {
        type: DataTypes.STRING(128),
        allowNull: false,
        unique: true,
    },
    department: {
        type: DataTypes.STRING(128),
        allowNull: false,
    },
    hod: {
        type: DataTypes.STRING(128),
        allowNull: true,
    },
    role: {
        type: DataTypes.STRING(128),
        allowNull: false,
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
class User extends Model {
}
export const userCrud = {
    initialize: (sequelize) => {
        User.init(userModel, { tableName: 'users', sequelize });
    },
    createUser: (user) => {
        return User.create(user);
    },
    findUser: (query) => {
        return User.findOne({ where: query });
    },
    findAllUsers: (query) => {
        return User.findAll({ where: query });
    },
    updateUser: (query, updateValue) => {
        return User.update(updateValue, { where: query });
    },
    deleteUser: (query) => {
        return User.destroy({ where: query });
    }
};
//# sourceMappingURL=user.js.map