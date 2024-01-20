import { Router } from 'express';
import { userController } from '../controllers/user.controller.js';
import { schemaValidator } from '../middlewares/schema.validation.middleware.js';
import { userUpdatePayload } from '../schemas/user.update.payload.js';
import { userPayload } from '../schemas/user.payload.js';
import { permission } from '../middlewares/check.permission.middleware.js';
import { configs } from '../../config.js';
import { createUser } from '../auth/user.register.controller.js';
import { userAuth } from '../auth/user.login.controller.js';
import { userLoginPayload } from '../schemas/user.login.payload.js';
import { authenticated } from '../middlewares/isAuthenticated.middleware.js';
const role = configs.roles.ADMIN;
const access = configs.vacation.TRUE;
export const userRoutes = Router();
userRoutes.get('/all', [authenticated.authSession, permission.has(role),
    permission.userActivity(access)], userController.getAllUsers);
userRoutes.get('/:userId', [authenticated.authSession, permission.userActivity(access)], userController.getUser);
userRoutes.get('/:userId/tasks', [authenticated.authSession, permission.userActivity(access)], userController.getTasks);
userRoutes.get('/:userId/countTasks', [authenticated.authSession, permission.userActivity(access)], userController.getTasksCount);
userRoutes.get('/:userId/reports', [authenticated.authSession, permission.userActivity(access)], userController.getReports);
userRoutes.get('/:userId/countReports', [authenticated.authSession, permission.userActivity(access)], userController.getReportsCount);
userRoutes.get('/:userId/chats', [authenticated.authSession, permission.userActivity(access)], userController.getChats);
userRoutes.get('/:userId/countChats', [authenticated.authSession, permission.userActivity(access)], userController.getChatsCount);
userRoutes.post('/signup', [schemaValidator.verify(userPayload)], createUser);
userRoutes.post('/login', [schemaValidator.verify(userLoginPayload)], userAuth.login);
userRoutes.patch('/update/:userId', [authenticated.authSession, permission.has(role), permission.userActivity(access),
    schemaValidator.verify(userUpdatePayload)], userController.updateUser);
userRoutes.delete('/:userId', [authenticated.authSession, permission.has(role)], userController.deleteUser);
//# sourceMappingURL=user.routes.js.map