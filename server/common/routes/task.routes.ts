import { Router } from 'express';
import { taskController } from '../controllers/task.controller.js';
import { schemaValidator } from '../middlewares/schema.validation.middleware.js';
import { taskPayload } from '../schemas/task.payload.js';
import { taskUpdatePayload } from '../schemas/task.update.payload.js';
import { permission } from '../middlewares/check.permission.middleware.js';
import { configs } from '../../config.js';
import { authenticated } from '../middlewares/isAuthenticated.middleware.js';

const role = configs.roles.ADMIN;
const access = configs.vacation.TRUE
export const taskRoutes = Router();

/**
 *@swagger
 * components:
 *  schemas:
 *   task:
 *    type: object
 *    properties:
 *     taskId:
 *      type: string
 *      description: The auto-generated id of the Task
 *     title:
 *      type: string
 *      description: The name of the of the task to be created
 *     description:
 *      type: string
 *      description: The description and requirements of the task to be carried out
 *     deadline:
 *      type: string
 *      description: Describes the deadline set for the task to completed
 *     urgencyLevel:
 *      type: string
 *      description: Describes the urgency level of the task
 *     progress:
 *      type: string
 *      description: Describes the progress made so far in the task
 *     departmentId:
 *      type: string
 *      description: The department in the company in which the task is to be created
 *     userId:
 *      type: string
 *      description: The user which the task was assigned to.
 *     superuserId:
 *      type: string
 *      description: The super admin of the company, that created the department under which the task is to be created.
 *    required:
 *     - title
 *     - description
 *     - deadline
 *    example:
 *     title: 'Landing Page'
 *     description: 'Design the landing page of the Oga Boss management system'
 *     deadline: 'feb 14, 2024 12:00 AM'
 *     userId: 'df4693e7-a6e3-44a1-87a1-b454d56f1e4b'
 *     departmentId: 'db9d6015-d555-4ab9-a2d2-b1b5ba3ba8fb'
 *     superuserId: 'b62898dd-088c-453d-b0c5-1bea96b296a6'
 * 
 *    definitions:
 *     taskSuccessful:
 *      type: object
 *      example:
 *       status: true
 *       task:
 *        taskId: '558740cb-fcd7-4293-a1c9-b324ffa55d8d'
 *        urgencyLevel: 'normal'
 *        progress: 'inprogress'
 *        title: 'Landing Page'
 *        description: 'Design the landing page of the Oga Boss management system'
 *        deadline: '2024-02-13T23:00:00.000Z'
 *        userId: 'df4693e7-a6e3-44a1-87a1-b454d56f1e4b'
 *        departmentId: 'db9d6015-d555-4ab9-a2d2-b1b5ba3ba8fb'
 *        superuserId: 'b62898dd-088c-453d-b0c5-1bea96b296a6'
 *        updatedAt: '2024-01-30T22:27:42.814Z'
 *        createdAt: '2024-01-30T22:27:42.814Z'
 * 
 *     allTasks:
 *      type: object
 *      properties:
 *       status: boolean
 *       data: array
 *      example:
 *       status: true
 *       tasks:
 *        - taskId: '558740cb-fcd7-4293-a1c9-b324ffa55d8d'
 *          urgencyLevel: 'normal'
 *          progress: 'inprogress'
 *          title: 'Landing Page'
 *          description: 'Design the landing page of the Oga Boss management system'
 *          deadline: '2024-02-13T23:00:00.000Z'
 *          userId: 'df4693e7-a6e3-44a1-87a1-b454d56f1e4b'
 *          departmentId: 'db9d6015-d555-4ab9-a2d2-b1b5ba3ba8fb'
 *          superuserId: 'b62898dd-088c-453d-b0c5-1bea96b296a6'
 *          updatedAt: '2024-01-30T22:27:42.814Z'
 *          createdAt: '2024-01-30T22:27:42.814Z'
 *          User:
 *           userId: 'df4693e7-a6e3-44a1-87a1-b454d56f1e4b'
 *           email: 'basilemmanuel@gmail.com'
 *           position: 'UX/UI designer'
 *           firstName: 'Basil'
 *           lastName: 'Emmanuel'
 *           superuserId: 'b62898dd-088c-453d-b0c5-1bea96b296a6'
 *           departmentId: 'db9d6015-d555-4ab9-a2d2-b1b5ba3ba8fb'
 *          Department:
 *           departmentId: 'db9d6015-d555-4ab9-a2d2-b1b5ba3ba8fb'
 *           department: 'Design'
 *           description: 'Handles the design of components, logs, web pages and other graphics'
 *           superuserId: 'b62898dd-088c-453d-b0c5-1bea96b296a6'
 */

/**
 *@swagger
 * tags:
 *  name: task
 *  description: -The task endpoints. A task can only exist with a department and must be assigned to a user who exist within the same superuser(company)
 * /task/createTask:
 *  post:
 *   summary: Create a new task
 *   tags: [task]
 *   requestBody:
 *    required: true
 *    content: 
 *     application/json:
 *      schema:
 *       $ref: '#/components/schemas/task'
 *   responses:
 *    201:
 *     description: user created successfully
 *     content: 
 *      application/json:
 *       schema:
 *        $ref: "#/components/schemas/task/definitions/taskSuccessful"
 *    400:
 *     description: Bad Request
 *    401:
 *     description: Unauthorized
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/department/definitions/loginError'
 *    500:
 *     description: Some server error
 * 
 * /task/{taskId}:
 *  get:
 *   summary: returns the instance of the task with the taskId
 *   tags: [task]
 *   parameters:
 *    - in: path
 *      name: taskId
 *      schema:
 *       type: string
 *       example: '558740cb-fcd7-4293-a1c9-b324ffa55d8d'
 *      required: true
 *      description: The task Id of the particular task to be retrieved
 *   responses:
 *    200:
 *     description: request successful
 *     content:
 *      application/json:
 *       schema:
 *        $ref: "#/components/schemas/task/definitions/taskSuccessful"
 *    401:
 *     description: Unauthorized
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/department/definitions/loginError'
 *    500:
 *     description: some server error
 * 
 * /task/all:
 *  get:
 *   summary: returns all tasks that exist within a superuser (company)
 *   tags: [task]
 *   responses:
 *    200:
 *     description: returns all tasks existing under a super admin server(company).
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/task/definitions/allTasks'
 * 
 *    401:
 *     description: Unauthorized
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/department/definitions/loginError'
 *    500:
 *     description: some server error
 *
 * /task/update/{taskId}:
 *  patch:
 *   summary: returns the updated instance of the task with the taskId
 *   tags: [task]
 *   parameters:
 *    - in: path
 *      name: taskId
 *      schema:
 *       type: string
 *       example: '558740cb-fcd7-4293-a1c9-b324ffa55d8d'
 *      required: true
 *      description: The task Id of the task to be updated
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       type: object
 *       example:
 *        title: 'Landing Page'
 *        description: 'Design the landing page of the Oga Boss management system'
 *        deadline: 'feb 14, 2024 12:00 AM'
 *        urgencyLevel: high
 *   responses:
 *    200:
 *     description: request successful
 *     content:
 *      application/json:
 *       schema:
 *        $ref: "#/components/schemas/task/definitions/taskSuccessful"
 *    401:
 *     description: Unauthorized
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/department/definitions/loginError'
 *    403:
 *     description: user not found
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/user/definitions/forbidden'
 *    500:
 *     description: some server error
 * 
 * /task/delete/{taskId}:
 *  delete:
 *   summary: Deletes the task with the task id
 *   tags: [task]
 *   parameters:
 *    - in: path
 *      name: taskId
 *      schema:
 *       type: string
 *      required: true
 *      description: The task's id to be deleted
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
 *    403:
 *     description: user not found
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/user/definitions/forbidden'
 *    404:
 *     description: task not found
 *    500:
 *     description: some server error
 */

taskRoutes.get('/all',
  [authenticated.authSession, permission.userActivity(access)], taskController.getAllTasks);

taskRoutes.get('/:taskId',
  [authenticated.authSession, permission.userActivity(access)], taskController.getTask);

taskRoutes.post('/createTask', 
  [authenticated.authSession, permission.has(role), permission.userActivity(access),
    schemaValidator.verify(taskPayload)], taskController.newTask);

taskRoutes.patch('/update/:taskId',
  [authenticated.authSession, permission.has(role), permission.userActivity(access),
    schemaValidator.verify(taskUpdatePayload)], taskController.updateTask);

taskRoutes.delete('/delete/:taskId',
  [authenticated.authSession, permission.has(role)], taskController.deleteTask);
