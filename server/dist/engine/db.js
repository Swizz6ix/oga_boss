import { Sequelize as Db } from "sequelize";
import { configs } from "../config.js";
import { SuperUser, superUserCrud } from "../common/models/super.user.js";
import { User, userCrud } from "../common/models/user.js";
import { Task, taskCrud } from "../common/models/task.js";
import { Department, departmentCrud } from "../common/models/department.js";
import { DailyRpt, dailyRptCrud } from "../common/models/daily.report.js";
import { ChatRoom, chatRoomCrud } from "../common/models/chat.room.js";
import { expressApp } from "../index.js";
// Define database authentication
export const connectDb = new Db((configs.db_connections.db_name), (configs.db_connections.db_user), (configs.db_connections.db_password), { dialect: configs.db_connections.dialect });
export const engine = {
    db: () => {
        userCrud.initialize(connectDb);
        taskCrud.initialize(connectDb);
        superUserCrud.initialize(connectDb);
        departmentCrud.initialize(connectDb);
        dailyRptCrud.initialize(connectDb);
        chatRoomCrud.initialize(connectDb);
        // Creating Model Association
        SuperUser.hasMany(User, {
            foreignKey: {
                name: 'superuserId',
                allowNull: false,
            }
        });
        User.belongsTo(SuperUser, {
            foreignKey: {
                name: 'superuserId',
            },
        });
        User.hasMany(Task, {
            foreignKey: {
                name: 'userId',
                allowNull: false,
            }
        });
        Task.belongsTo(User, {
            foreignKey: {
                name: 'userId',
            },
        });
        SuperUser.hasMany(Task, {
            foreignKey: {
                name: 'superuserId',
                allowNull: false,
            }
        });
        Task.belongsTo(SuperUser, {
            foreignKey: {
                name: 'superuserId',
            },
        });
        Department.hasMany(User, {
            foreignKey: {
                name: 'departmentId',
                allowNull: false,
            }
        });
        User.belongsTo(Department, {
            foreignKey: {
                name: 'departmentId',
            },
        });
        SuperUser.hasMany(Department, {
            foreignKey: {
                name: 'superuserId',
                allowNull: false
            }
        });
        Department.belongsTo(SuperUser, {
            foreignKey: {
                name: 'superuserId',
            },
        });
        User.hasMany(ChatRoom, {
            foreignKey: {
                name: 'messageId',
                allowNull: false,
            },
            constraints: false,
            scope: {
                messageFrom: 'user',
            },
        });
        ChatRoom.belongsTo(User, {
            foreignKey: {
                name: 'messageId',
            },
            constraints: false,
        });
        SuperUser.hasMany(ChatRoom, {
            foreignKey: {
                name: 'messageId',
                allowNull: false,
            },
            constraints: false,
            scope: {
                messageFrom: 'superUser'
            }
        });
        ChatRoom.belongsTo(SuperUser, {
            foreignKey: {
                name: 'messageId',
            },
        });
        User.hasMany(DailyRpt, {
            foreignKey: {
                name: 'userId',
                allowNull: false
            }
        });
        DailyRpt.belongsTo(User, {
            foreignKey: {
                name: 'userId',
            },
        });
        SuperUser.hasMany(DailyRpt, {
            foreignKey: {
                name: 'superuserId',
                allowNull: false
            },
        });
        DailyRpt.belongsTo(SuperUser, {
            foreignKey: {
                name: 'superuserId',
            },
        });
        Department.hasMany(Task, {
            foreignKey: {
                name: 'departmentId',
                allowNull: false
            }
        });
        Task.belongsTo(Department, {
            foreignKey: {
                name: 'departmentId',
            },
        });
        // Authenticate the database credentials and connect to the database
        connectDb
            .authenticate()
            .then(() => {
            console.log('Connection has been established successfully');
        })
            .catch((err) => {
            console.log(`Unable to connect to the database: ${err}`);
        });
        // Sync the database and create tables if it does not exist
        connectDb
            .sync()
            .then(() => {
            expressApp();
            console.log('database Initialized');
        })
            .catch((err) => {
            console.log(`Sequelize Initialization threw an error: ${err}`);
        });
    },
};
//# sourceMappingURL=db.js.map