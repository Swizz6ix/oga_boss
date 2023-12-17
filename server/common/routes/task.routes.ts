import { Router } from 'express';
import { taskController } from '../controllers/task.controller.js';
import { schemaValidator } from '../middlewares/schema.validation.middleware.js';
import { taskPayload } from '../schemas/task.payload.js';
import { taskUpdatePayload } from '../schemas/task.update.payload.js';


export const taskRoutes = Router();
taskRoutes.get('/tasks', taskController.getAllTasks);
taskRoutes.get('/:taskId', taskController.getTask);
taskRoutes.post('/createTask', [schemaValidator.verify(taskPayload)], taskController.newTask);
taskRoutes.patch('/update/:taskId', [schemaValidator.verify(taskUpdatePayload)], taskController.updateTask);
taskRoutes.delete('/:taskId', taskController.deleteTask);
