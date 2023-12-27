import express from 'express';
// import { cors } from 'cors';
import { Sequelize } from 'sequelize';
import { configs } from './config.js';
import { User, userCrud } from './common/models/user.js';
import { Task, taskCrud } from './common/models/task.js';
import { userRoutes } from './common/routes/user.routes.js';
import { taskRoutes } from './common/routes/task.routes.js';
import { SuperUser, superUserCrud } from './common/models/super.user.js';
import { superUserRoutes } from './common/routes/super.user.routes.js';
import { Department, departmentCrud } from './common/models/department.js';
import { departmentRoutes } from './common/routes/department.routes.js';
import { dailyReportRoutes } from './common/routes/daily.report.routes.js';
import { GenRoom, genRoomCrud } from './common/models/general.room.js';
import { DailyRpt, dailyRptCrud } from './common/models/daily.report.js';
import { genRoomRoutes } from './common/routes/gen.room.routes.js';
const port = configs.db_connections.port;
// Initialize Express app
const expressApp = () => {
    const app = express();
    // app.use(cors())
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use('/user', userRoutes);
    app.use('/task', taskRoutes);
    app.use('/superuser', superUserRoutes);
    app.use('/department', departmentRoutes);
    app.use('/report', dailyReportRoutes);
    app.use('/room', genRoomRoutes);
    app.get('/', (req, res) => {
        res.send('Hi!, welcome to OGA BOSS');
    });
    app.listen(port, () => {
        console.log(`[SERVER]: Server is up and running at http://localhost:${port}`);
    });
};
// Define database authentication
export const sequelize = new Sequelize((configs.db_connections.db_name), (configs.db_connections.db_user), (configs.db_connections.db_password), { dialect: configs.db_connections.dialect });
userCrud.initialize(sequelize);
taskCrud.initialize(sequelize);
superUserCrud.initialize(sequelize);
departmentCrud.initialize(sequelize);
dailyRptCrud.initialize(sequelize);
genRoomCrud.initialize(sequelize);
// Creating Model Association
SuperUser.hasMany(User, { foreignKey: { allowNull: false } });
User.belongsTo(SuperUser);
User.hasMany(Task, { foreignKey: { allowNull: false } });
Task.belongsTo(User);
SuperUser.hasMany(Task, { foreignKey: { allowNull: false } });
Task.belongsTo(SuperUser);
Department.hasMany(User, { foreignKey: { allowNull: false } });
User.belongsTo(Department);
SuperUser.hasMany(Department, { foreignKey: { allowNull: false } });
Department.belongsTo(SuperUser);
User.hasMany(GenRoom, { foreignKey: { allowNull: true } });
GenRoom.belongsTo(User);
SuperUser.hasMany(GenRoom);
GenRoom.belongsTo(SuperUser);
User.hasMany(DailyRpt, { foreignKey: { allowNull: false } });
DailyRpt.belongsTo(User);
SuperUser.hasMany(DailyRpt, { foreignKey: { allowNull: false } });
DailyRpt.belongsTo(SuperUser);
Department.hasMany(Task, { foreignKey: { allowNull: false } });
Task.belongsTo(Department);
// Authenticate the database credentials and connect to the database
sequelize
    .authenticate()
    .then(() => {
    console.log('Connection has been established successfully');
})
    .catch((err) => {
    console.log(`Unable to connect to the database: ${err}`);
});
// Sync the database and create tables if it does not exist
sequelize
    .sync()
    .then(() => {
    expressApp();
    console.log('database Initialized');
})
    .catch((err) => {
    console.log(`Sequelize Initialization threw an error: ${err}`);
});
//# sourceMappingURL=index.js.map