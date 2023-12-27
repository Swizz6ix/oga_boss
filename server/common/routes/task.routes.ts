import { Router } from 'express';
import { taskController } from '../controllers/task.controller.js';
import { schemaValidator } from '../middlewares/schema.validation.middleware.js';
import { taskPayload } from '../schemas/task.payload.js';
import { taskUpdatePayload } from '../schemas/task.update.payload.js';
import { permission } from '../middlewares/check.permission.middleware.js';
import { configs } from '../../config.js';
import { authenticated } from '../middlewares/isAuthenticated.middleware.js';

const role = configs.roles.ADMIN;
export const taskRoutes = Router();

taskRoutes.get('/all',
  [authenticated.check], taskController.getAllTasks);

taskRoutes.get('/:taskId',
  [authenticated.check], taskController.getTask);

taskRoutes.post('/createTask', 
  [authenticated.check, permission.has(role), 
    schemaValidator.verify(taskPayload)], taskController.newTask);

taskRoutes.patch('/update/:taskId',
  [authenticated.check, permission.has(role),
    schemaValidator.verify(taskUpdatePayload)], taskController.updateTask);

taskRoutes.delete('/:taskId',
  [authenticated.check, permission.has(role)], taskController.deleteTask);
