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
export const userRoutes = Router();
userRoutes.get('/all', [authenticated.authSession, permission.has(role)], userController.getAllUsers);
userRoutes.get('/:userId', [authenticated.authSession], userController.getUser);
userRoutes.get('/:userId/tasks', [authenticated.authSession], userController.getTasks);
userRoutes.get('/:userId/countTasks', [authenticated.authSession], userController.getTasksCount);
userRoutes.get('/:userId/reports', [authenticated.authSession], userController.getReports);
userRoutes.get('/:userId/countReports', [authenticated.authSession], userController.getReportsCount);
userRoutes.get('/:userId/chats', [authenticated.authSession], userController.getChats);
userRoutes.get('/:userId/countChats', [authenticated.authSession], userController.getChatsCount);
userRoutes.post('/signup', [
    // authenticated.check, permission.has(role), 
    schemaValidator.verify(userPayload)
], createUser);
userRoutes.post('/login', [schemaValidator.verify(userLoginPayload)], userAuth.login);
userRoutes.patch('/update/:userId', [authenticated.authSession, permission.has(role),
    schemaValidator.verify(userUpdatePayload)], userController.updateUser);
userRoutes.delete('/:userId', [authenticated.authSession, permission.has(role)], userController.deleteUser);
//# sourceMappingURL=user.routes.js.map