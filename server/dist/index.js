import express from 'express';
import session from 'express-session';
import helmet from 'helmet';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { configs } from './config.js';
import { userRoutes } from './common/routes/user.routes.js';
import { taskRoutes } from './common/routes/task.routes.js';
import { superUserRoutes } from './common/routes/super.user.routes.js';
import { departmentRoutes } from './common/routes/department.routes.js';
import { dailyReportRoutes } from './common/routes/daily.report.routes.js';
import { chatRoomRoutes } from './common/routes/chat.room.routes.js';
import { engine } from './engine/db.js';
import { redisStore } from './engine/redis.js';
import { authenticated } from './common/middlewares/isAuthenticated.middleware.js';
import { userAuth } from './common/auth/user.login.controller.js';
import { logging, morganMiddleware } from './engine/logging.js';
import { logRoutes } from './common/routes/log.routes.js';
const port = configs.db_connections.port;
const expire = configs.sessionExpire;
const app = express();
const server = createServer(app);
export const io = new Server(server);
const sessionMiddleware = session({
    store: redisStore,
    secret: process.env.SESSION_SECRET,
    name: process.env.SESSION_NAME,
    cookie: {
        maxAge: configs.maxAge,
        httpOnly: true,
        signed: true,
        expires: expire
    },
    saveUninitialized: true,
    resave: false,
});
// Initialize Express app
export const expressApp = () => {
    app.disable('x-powered-by'); // disabled to reduce fingerprinting
    app.use(helmet());
    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(morganMiddleware);
    app.use(cookieParser());
    app.use(sessionMiddleware);
    app.use('/user', userRoutes);
    app.use('/task', taskRoutes);
    app.use('/superuser', superUserRoutes);
    app.use('/department', departmentRoutes);
    app.use('/report', dailyReportRoutes);
    app.use('/room', chatRoomRoutes);
    app.use('/logs', logRoutes);
    app.get('/logout', [authenticated.authSession], userAuth.logout);
    app.get('/', (req, res) => {
        res.send('Hi!, welcome to OGA BOSS');
    });
    io.engine.use(sessionMiddleware);
    server.listen(port, () => {
        console.log(`[SERVER]: Server is up and running at http://localhost:${port}`);
        logging.engineLogger.info(`[SERVER]: Server is up and running at http://localhost:${port}`);
    });
};
engine.db();
//# sourceMappingURL=index.js.map