import express, { Express, Request, Response } from 'express';
// import { cors } from 'cors';
import { configs } from './config.js';
import { userRoutes } from './common/routes/user.routes.js';
import { taskRoutes } from './common/routes/task.routes.js';
import { superUserRoutes } from './common/routes/super.user.routes.js';
import { departmentRoutes } from './common/routes/department.routes.js';
import { dailyReportRoutes } from './common/routes/daily.report.routes.js';
import { chatRoomRoutes } from './common/routes/chat.room.routes.js';
import { engine } from './engine/db.js';


const port = configs.db_connections.port

// Initialize Express app
export const expressApp = () => {
  const app: Express = express();
  // app.use(cors())
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use('/user', userRoutes);
  app.use('/task', taskRoutes);
  app.use('/superuser', superUserRoutes);
  app.use('/department', departmentRoutes);
  app.use('/report', dailyReportRoutes);
  app.use('/room', chatRoomRoutes);
  app.get('/', (req: Request, res: Response ) => {
    res.send('Hi!, welcome to OGA BOSS')
  });
  app.listen(port, () => {
    console.log(`[SERVER]: Server is up and running at http://localhost:${port}`);
  });
}

engine.db();
