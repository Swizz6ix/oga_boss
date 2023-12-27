import { Router } from 'express';
import { userController } from '../controllers/user.controller.js';
import { schemaValidator } from '../middlewares/schema.validation.middleware.js';
import { userUpdatePayload } from '../schemas/user.update.payload.js';
import { userPayload } from '../schemas/user.payload.js';
import { permission } from '../middlewares/check.permission.middleware.js';
import { configs } from '../../config.js';
import { createUser } from '../auth/user.register.controller.js';
import { login } from '../auth/user.login.controller.js';
import { userLoginPayload } from '../schemas/user.login.payload.js';
import { authenticated } from '../middlewares/isAuthenticated.middleware.js';


const role = configs.roles.ADMIN;
export const userRoutes = Router();

userRoutes.get('/all',
  [authenticated.check, permission.has(role)], userController.getAllUsers);

userRoutes.get('/:userId',
  [authenticated.check], userController.getUser);

userRoutes.get('/:userId/tasks', [authenticated.check], userController.getTasks);

userRoutes.get('/:userId/countTasks', [authenticated.check], userController.getTasksCount);

userRoutes.get('/:userId/reports', [authenticated.check], userController.getReports);

userRoutes.get('/:userId/countReports', [authenticated.check], userController.getReportsCount);

userRoutes.get('/:userId/chats', [authenticated.check], userController.getChats);

userRoutes.get('/:userId/countChats', [authenticated.check], userController.getChatsCount);

userRoutes.post('/signup',
  [ authenticated.check, permission.has(role), schemaValidator.verify(userPayload)], createUser);

userRoutes.post('/login',
  [schemaValidator.verify(userLoginPayload)], login);

userRoutes.patch('/update/:userId',
  [authenticated.check, permission.has(role),
    schemaValidator.verify(userUpdatePayload)], userController.updateUser);

userRoutes.delete('/:userId',
  [authenticated.check, permission.has(role)], userController.deleteUser);
