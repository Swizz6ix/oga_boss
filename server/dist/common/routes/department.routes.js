import { Router } from 'express';
import { departmentController } from '../controllers/department.controller.js';
import { schemaValidator } from '../middlewares/schema.validation.middleware.js';
import { departmentPayload } from '../schemas/department.payload.js';
import { authenticated } from '../middlewares/isAuthenticated.middleware.js';
import { permission } from '../middlewares/check.permission.middleware.js';
import { configs } from '../../config.js';
const role = configs.roles.ADMIN;
const access = configs.vacation.TRUE;
export const departmentRoutes = Router();
/**
 *@swagger
 * components:
 *  schemas:
 *   department:
 *    type: object
 *    properties:
 *     departmentId:
 *      type: string
 *      description: The auto-generated id of the department
 *     department:
 *      type: string
 *      description: The name of the department
 *     description:
 *      type: string
 *      description: Explains the purpose of the department to be created
 *     superuserId:
 *      type: string
 *      description: The super admin under which the department is to be created
 *    required:
 *     - department
 *    example:
 *     department: 'Design'
 *     description: 'Handles the design of components, web pages and other graphics'
 *     superuserId: 'b62898dd-088c-453d-b0c5-1bea96b296a6'
 *
 *    definitions:
 *     deptSuccessful:
 *      type: object
 *      example:
 *       status: true
 *       department:
 *        departmentId: 'db9d6015-d555-4ab9-a2d2-b1b5ba3ba8fb'
 *        department: 'Design'
 *        description: 'Handles the design of components, web pages and other graphics'
 *        superuserId: 'b62898dd-088c-453d-b0c5-1bea96b296a6'
 *        updatedAt: '2024-01-30T22:27:42.814Z'
 *        createdAt: '2024-01-30T22:27:42.814Z'
 *
 *     loginError:
 *      type: object
 *      properties:
 *       status: boolean
 *       error: string
 *      example:
 *       status: false
 *       error: 'Pls, login a valid user'
 *
 *     delete:
 *      type: object
 *      properties:
 *       status: boolean
 *       data: object
 *      example:
 *       status: true
 *       data:
 *        numberOfEntriesDeleted: 1
 */
/**
 *@swagger
 * tags:
 *  name: department
 *  description: The department endpoints. A department can only exist with a superuser and must be created by a superuser(company)
 * /department/add:
 *  post:
 *   summary: Creates a new department
 *   tags: [department]
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/components/schemas/department'
 *   responses:
 *    201:
 *     description: user created successfully
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/department/definitions/deptSuccessful'
 *    401:
 *     description: Unauthorized
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/department/definitions/loginError'
 *    500:
 *     description: Some server error
 *
 * /department/{departmentId}:
 *  get:
 *   summary: returns the instance of the department with the departmentId
 *   tags: [department]
 *   parameters:
 *    - in: path
 *      name: departmentId
 *      schema:
 *       type: string
 *       example: 'db9d6015-d555-4ab9-a2d2-b1b5ba3ba8fb'
 *      required: true
 *      description: The department Id of the particular department to be retrieved
 *   responses:
 *    200:
 *     description: request successful
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/department/definitions/deptSuccessful'
 *    401:
 *     description: Unauthorized
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/department/definitions/loginError'
 *    500:
 *     description: some server error
 *
 * /department/all:
 *  get:
 *   summary: returns all departments that exist within a superuser (company)
 *   tags: [department]
 *   responses:
 *    200:
 *     description: request successful
 *     content:
 *      application/json:
 *       schema:
 *        type: object
 *        properties:
 *         status: boolean
 *         data: array
 *        example:
 *         status: true
 *         departments:
 *          - departmentId: 'db9d6015-d555-4ab9-a2d2-b1b5ba3ba8fb'
 *            department: 'Design'
 *            description: 'Handles the design of components, web pages and other graphics'
 *            superuserId: 'b62898dd-088c-453d-b0c5-1bea96b296a6'
 *    401:
 *     description: Unauthorized
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/department/definitions/loginError'
 *    500:
 *     description: some server error
 *
 * /department/update/{departmentId}:
 *  patch:
 *   summary: returns the updated instance of the department with the departmentId
 *   tags: [department]
 *   parameters:
 *    - in: path
 *      name: departmentId
 *      schema:
 *       type: string
 *       example: 'db9d6015-d555-4ab9-a2d2-b1b5ba3ba8fb'
 *      required: true
 *      description: The department Id of the department to be updated
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/components/schemas/department'
 *   responses:
 *    200:
 *     description: request successful
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/department/definitions/deptSuccessful'
 *    401:
 *     description: Unauthorized
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/department/definitions/loginError'
 *    500:
 *     description: some server error
 *
 * /department/delete/{departmentId}:
 *  delete:
 *   summary: Deletes the department with the department id
 *   tags: [department]
 *   parameters:
 *    - in: path
 *      name: departmentId
 *      schema:
 *       type: string
 *       example: 'bdf5a675-fb63-43bd-b5dd-ab017f07dacb'
 *      required: true
 *      description: The department's id to be deleted
 *   responses:
 *    200:
 *     description: request successful
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/department/definitions/delete'
 *    401:
 *     description: Unauthorized
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/department/definitions/loginError'
 *    500:
 *     description: some server error
 */
departmentRoutes.get('/all', [authenticated.authSession, permission.userActivity(access)], departmentController.getAllDept);
departmentRoutes.get('/:deptId', [authenticated.authSession, permission.userActivity(access)], departmentController.getDept);
departmentRoutes.post('/add', [authenticated.authSession, permission.has(role), permission.userActivity(access),
    schemaValidator.verify(departmentPayload)], departmentController.addDepartment);
departmentRoutes.patch('/update/:deptId', [authenticated.authSession, permission.has(role), permission.userActivity(access),
    schemaValidator.verify(departmentPayload)], departmentController.updateDept);
departmentRoutes.delete('/delete/:deptId', [authenticated.authSession, permission.has(role)], departmentController.deleteDept);
//# sourceMappingURL=department.routes.js.map