import { DataTypes, Model } from 'sequelize';
import { configs } from '../../config.js';
import { Task } from './task.js';
import { SuperUser } from './super.user.js';
import { Department } from './department.js';
import { ChatRoom } from './chat.room.js';
import { DailyRpt } from './daily.report.js';
// The user's schema
const userModel = {
    userId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
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
    username: {
        type: DataTypes.STRING(128),
        allowNull: false,
        unique: true,
    },
    hod: {
        type: DataTypes.STRING(128),
        allowNull: true,
    },
    role: {
        type: DataTypes.STRING(128),
        allowNull: false,
        defaultValue: configs.roles.USER,
    },
    vacation: {
        type: DataTypes.BOOLEAN,
        defaultValue: configs.vacation.TRUE,
    },
    position: {
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
        return User.findOne({
            where: query,
            include: [{
                    model: SuperUser,
                    attributes: {
                        exclude: [
                            'password',
                            'username',
                            'createdAt',
                            'updatedAt',
                            'role',
                        ],
                    },
                },
                {
                    model: Department,
                    attributes: {
                        exclude: [
                            'createdAt',
                            'updatedAt',
                        ],
                    },
                },
                { model: Task },
                { model: DailyRpt },
                { model: ChatRoom }
            ],
            attributes: {
                exclude: [
                    'createdAt',
                    'updatedAt'
                ]
            }
        });
    },
    findAllUsers: (query) => {
        return User.findAll({ where: query,
            include: [
                {
                    model: SuperUser,
                    attributes: {
                        exclude: [
                            'createdAt',
                            'updatedAt'
                        ]
                    }
                },
                {
                    model: Department,
                    attributes: {
                        exclude: [
                            'createdAt',
                            'updatedAt'
                        ]
                    }
                },
                {
                    model: Task,
                    attributes: {
                        exclude: [
                            'createdAt',
                            'updatedAt'
                        ]
                    }
                },
                {
                    model: DailyRpt,
                    attributes: {
                        exclude: [
                            'createdAt',
                            'updatedAt'
                        ]
                    }
                },
                {
                    model: ChatRoom,
                    attributes: {
                        exclude: [
                            'createdAt',
                            'updatedAt'
                        ]
                    }
                },
            ],
            attributes: {
                exclude: [
                    'password',
                    'createdAt',
                    'updatedAt'
                ]
            }
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