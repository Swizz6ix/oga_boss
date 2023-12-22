import { Router } from 'express';
import { departmentController } from '../controllers/department.controller.js';
import { schemaValidator } from '../middlewares/schema.validation.middleware.js';
import { departmentPayload } from '../schemas/department.payload.js';
export const departmentRoutes = Router();
departmentRoutes.get('/all', departmentController.getAllDept);
departmentRoutes.get('/:deptId', departmentController.getDept);
departmentRoutes.post('/add', [schemaValidator.verify(departmentPayload)], departmentController.addDepartment);
departmentRoutes.patch('/update/:deptId', schemaValidator.verify(departmentPayload), departmentController.updateDept);
departmentRoutes.delete('/:deptId', departmentController.deleteDept);
//# sourceMappingURL=department.routes.js.map