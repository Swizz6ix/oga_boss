import { DataTypes, Model, } from 'sequelize';
import { configs } from '../../config.js';
const superUserModel = {
    superuserId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
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
    role: {
        type: DataTypes.STRING(128),
        defaultValue: configs.roles.ADMIN,
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
        return SuperUser.findOne({ where: query,
            // include: { model: User } 
        });
    },
    updateUser: (query, updateValue) => {
        return SuperUser.update(updateValue, { where: query });
    },
    deleteUser: (query) => {
        return SuperUser.destroy({ where: query });
    },
};
//# sourceMappingURL=super.user.js.map