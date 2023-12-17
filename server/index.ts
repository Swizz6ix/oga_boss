import express, { Express, Request, Response } from 'express';
import { Sequelize } from 'sequelize';
import { configs } from './config.js';
import { userCrud } from './common/models/user.js';
import { taskCrud } from './common/models/task.js';
import { userRoutes } from './common/routes/user.routes.js';
import { taskRoutes } from './common/routes/task.routes.js';

const port = configs.db_connections.port

// Initialize Express app
const expressApp = () => {
  const app: Express = express();
  // app.use(cors())
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use('/user', userRoutes);
  app.use('/task', taskRoutes);
  app.get('/', (req: Request, res: Response ) => {
    res.send('Hi!, welcome to OGA BOSS')
  });
  app.listen(port, () => {
    console.log(`[SERVER]: Server is up and running at http://localhost:${port}`);
  });
}

// Define database authentication
export const sequelize = new Sequelize(
  (configs.db_connections.db_name),
  (configs.db_connections.db_user),
  (configs.db_connections.db_password),
  { dialect: configs.db_connections.dialect }
);

userCrud.initialize(sequelize);
taskCrud.initialize(sequelize);

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
    console.log('database Initialized')
  })
  .catch((err) => {
    console.log(`Sequelize Initialization threw an error: ${err}`);
  });
