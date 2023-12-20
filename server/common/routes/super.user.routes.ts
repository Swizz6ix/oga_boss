import { Router } from 'express';
import { superUserController } from '../controllers/super.user.controller.js';
import { signup } from '../auth/super.user.signup.controller.js';
import { login } from '../auth/super.user.login.controller.js';
import { schemaValidator } from '../middlewares/schema.validation.middleware.js';
import { superUserPayload } from '../schemas/super.user.payload.js';
import { superUserUpdate } from '../schemas/super.user.update.payload.js';
import { superUserLogin } from '../schemas/super.user.login.js';

export const superUserRoutes = Router();

superUserRoutes.get('/:userId', superUserController.getUser);
superUserRoutes.post('/signup', [schemaValidator.verify(superUserPayload)], signup);
superUserRoutes.post('/login', [schemaValidator.verify(superUserLogin)], login);
superUserRoutes.patch('/update/:userId',
  [schemaValidator.verify(superUserUpdate)], superUserController.updateUser);
superUserRoutes.delete('/:userId', superUserController.deleteUser);
