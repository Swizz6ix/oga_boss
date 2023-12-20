import { Router } from 'express';
import { superUserController } from '../controllers/super.user.controller';
import { signup } from '../auth/super.user.signup.controller';
import { login } from '../auth/super.user.login.controller';
export const superUserRoutes = Router();
superUserRoutes.get('/:userId', superUserController.getUser);
superUserRoutes.post('/signup', signup);
superUserRoutes.post('/login', login);
superUserRoutes.patch('/update/:userId', superUserController.updateUser);
superUserRoutes.delete('/:userId', superUserController.deleteUser);
//# sourceMappingURL=super.user.routes.js.map