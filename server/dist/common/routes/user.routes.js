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
userRoutes.get('/all', [authenticated.check, permission.has(role)], userController.getAllUsers);
userRoutes.get('/:userId', [authenticated.check, permission.has(role)], userController.getUser);
userRoutes.post('/signup', [schemaValidator.verify(userPayload),
    // permission.has(role)
], createUser);
userRoutes.post('/login', [schemaValidator.verify(userLoginPayload)], login);
userRoutes.patch('/update/:userId', [permission.has(role), authenticated.check,
    schemaValidator.verify(userUpdatePayload)], userController.updateUser);
userRoutes.delete('/:userId', [authenticated.check, permission.has(role)], userController.deleteUser);
//# sourceMappingURL=user.routes.js.map