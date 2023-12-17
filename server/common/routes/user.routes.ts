import { Router } from 'express';
import { userController } from '../controllers/user.controller.js';
import { schemaValidator } from '../middlewares/schema.validation.middleware.js';
import { userUpdatePayload } from '../schemas/user.update.payload.js';
import { userPayload } from '../schemas/user.payload.js';


export const userRoutes = Router();
userRoutes.get('/users', userController.getAllUsers);
userRoutes.get('/:userId', userController.getUser);
userRoutes.post('/signup', [ schemaValidator.verify(userPayload)], userController.addUser)
userRoutes.patch('/update/:userId', [ schemaValidator.verify(userUpdatePayload) ], userController.updateUser);
userRoutes.delete('/:userId', userController.deleteUser);
