import { Router } from 'express';
import { userController } from '../controllers/user.controller.js';
import { schemaValidator } from '../middlewares/schema.validation.middleware.js';
import { userUpdatePayload } from '../schemas/user.update.payload.js';
import { userPayload } from '../schemas/user.payload.js';
import { permission } from '../middlewares/check.permission.middleware.js';
import { configs } from '../../config.js';
const role = configs.roles.ADMIN;
export const userRoutes = Router();
userRoutes.get('/all', [permission.has(role)], userController.getAllUsers);
userRoutes.get('/:userId', [permission.has(role)], userController.getUser);
userRoutes.post('/signup', [schemaValidator.verify(userPayload), permission.has(role)], userController.addUser);
userRoutes.patch('/update/:userId', [schemaValidator.verify(userUpdatePayload), permission.has(role)], userController.updateUser);
userRoutes.delete('/:userId', [permission.has(role)], userController.deleteUser);
//# sourceMappingURL=user.routes.js.map