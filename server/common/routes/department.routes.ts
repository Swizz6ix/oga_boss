import { Router } from 'express';
import { departmentController } from '../controllers/department.controller.js';
import { schemaValidator } from '../middlewares/schema.validation.middleware.js';
import { departmentPayload } from '../schemas/department.payload.js';
import { authenticated } from '../middlewares/isAuthenticated.middleware.js';
import { permission } from '../middlewares/check.permission.middleware.js';
import { configs } from '../../config.js';

const role = configs.roles.ADMIN;
export const departmentRoutes = Router();

departmentRoutes.get('/all', [authenticated.check], departmentController.getAllDept);

departmentRoutes.get('/:deptId', [authenticated.check], departmentController.getDept);

departmentRoutes.post('/add',
  [authenticated.check, permission.has(role),
    schemaValidator.verify(departmentPayload)], departmentController.addDepartment);

departmentRoutes.patch('/update/:deptId',
  [authenticated.check, permission.has(role),
    schemaValidator.verify(departmentPayload)], departmentController.updateDept);

departmentRoutes.delete('/:deptId',
[authenticated.check, permission.has(role)], departmentController.deleteDept);
