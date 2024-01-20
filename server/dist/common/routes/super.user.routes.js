import { Router } from 'express';
import { superUserController } from '../controllers/super.user.controller.js';
import { signup } from '../auth/super.user.signup.controller.js';
import { superAuth } from '../auth/super.user.login.controller.js';
import { schemaValidator } from '../middlewares/schema.validation.middleware.js';
import { superUserPayload } from '../schemas/super.user.payload.js';
import { superUserUpdate } from '../schemas/super.user.update.payload.js';
import { superUserLogin } from '../schemas/super.user.login.js';
import { authenticated } from '../middlewares/isAuthenticated.middleware.js';
import { permission } from '../middlewares/check.permission.middleware.js';
import { configs } from '../../config.js';
export const superUserRoutes = Router();
const role = configs.roles.ADMIN;
const access = configs.vacation.TRUE;
superUserRoutes.get('/:userId', [authenticated.authSession, permission.has(role)], superUserController.getUser);
superUserRoutes.get('/:userId/users', [authenticated.authSession, permission.has(role), permission.userActivity(access)], superUserController.getUsers);
superUserRoutes.get('/:userId/departments', [authenticated.authSession, permission.has(role), permission.userActivity(access)], superUserController.getDepartments);
superUserRoutes.get('/:userId/totalDepartments', [authenticated.authSession, permission.has(role), permission.userActivity(access)], superUserController.getDepartMentsCount);
superUserRoutes.get('/:userId/tasks', [authenticated.authSession, permission.has(role), permission.userActivity(access)], superUserController.getTasks);
superUserRoutes.get('/:userId/totalTasks', [authenticated.authSession, permission.has(role), permission.userActivity(access)], superUserController.getTasksCount);
superUserRoutes.get('/:userId/totalUsers', [authenticated.authSession, permission.has(role), permission.userActivity(access)], superUserController.getUsersCount);
superUserRoutes.post('/signup', [schemaValidator.verify(superUserPayload)], signup);
superUserRoutes.post('/login', [schemaValidator.verify(superUserLogin)], superAuth.login);
superUserRoutes.patch('/update/:userId', [authenticated.authSession, permission.has(role),
    schemaValidator.verify(superUserUpdate)], superUserController.updateUser);
superUserRoutes.delete('/:userId', [authenticated.authSession, permission.has(role)], superUserController.deleteUser);
//# sourceMappingURL=super.user.routes.js.map