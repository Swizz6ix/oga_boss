import { Router } from 'express';
import { taskController } from '../controllers/task.controller.js';
import { schemaValidator } from '../middlewares/schema.validation.middleware.js';
import { taskPayload } from '../schemas/task.payload.js';
import { taskUpdatePayload } from '../schemas/task.update.payload.js';
import { permission } from '../middlewares/check.permission.middleware.js';
import { configs } from '../../config.js';

const role = configs.roles.ADMIN;
export const taskRoutes = Router();
taskRoutes.get('/all', [permission.has(role)], taskController.getAllTasks);
taskRoutes.get('/:taskId', [permission.has(role)], taskController.getTask);
taskRoutes.post('/createTask', [schemaValidator.verify(taskPayload), permission.has(role)], taskController.newTask);
taskRoutes.patch('/update/:taskId', [schemaValidator.verify(taskUpdatePayload), permission.has(role)], taskController.updateTask);
taskRoutes.delete('/:taskId', [permission.has(role)], taskController.deleteTask);
