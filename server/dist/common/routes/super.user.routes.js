import { Router } from 'express';
import { superUserController } from '../controllers/super.user.controller.js';
import { signup } from '../auth/super.user.signup.controller.js';
import { superAuth } from '../auth/super.user.login.controller.js';
import { schemaValidator } from '../middlewares/schema.validation.middleware.js';
import { superUserPayload } from '../schemas/super.user.payload.js';
import { superUserUpdate } from '../schemas/super.user.update.payload.js';
import { superUserLogin } from '../schemas/super.user.login.js';
import { authenticated } from '../middlewares/isAuthenticated.middleware.js';
import { permission } from '../middlewares/check.permission.middleware.js';
import { configs } from '../../config.js';
export const superUserRoutes = Router();
const role = configs.roles.ADMIN;
const access = configs.vacation.TRUE;
/**
 *@swagger
 * components:
 *  schemas:
 *   superuser:
 *    type: object
 *    properties:
 *     superuserId:
 *      type: string
 *      description: The auto-generated id of the user
 *     firstName:
 *      type: string
 *      description: The first name of the user
 *     lastName:
 *      type: string
 *      description: The last name of the user
 *     username:
 *      type: string
 *      description: The username of the user
 *     email:
 *      type: string
 *      description: The email of the user
 *     password:
 *      type: string
 *      description: The password of the user
 *     role:
 *      type: string
 *      description: Indicates the role of a user, if a user has administrative privileges
 *     company:
 *      type: string
 *      description: The name of the company which the super admin is associated with.
 *    required:
 *     - company
 *     - username
 *     - email
 *     - password
 *     - firstName
 *     - lastName
 *    example:
 *     firstName: 'Basil'
 *     lastName: 'charles'
 *     email: 'charlesbasil@gmail.com'
 *     username: 'emmasil'
 *     password: '12345'
 *     company: 'The Imprint'
 *
 *    definitions:
 *     superuserLogin:
 *      type: object
 *      properties:
 *       username: string
 *       password: string
 *      example:
 *       username: 'emmasil'
 *       password: '12345'
 *
 *     successful:
 *      type: object
 *      example:
 *       status: true
 *       user:
 *        superuserId: 'b62898dd-088c-453d-b0c5-1bea96b296a6'
 *        firstName: 'Basil'
 *        lastName: 'charles'
 *        email: 'charlesbasil@gmail.com'
 *        username: 'emmasil'
 *        password: '5994471abb01112afcc18159f6ee74b4f511b998062bv59b3caf5a9c173cacfc6'
 *        company: 'The Imprint'
 *        role: 'admin'
 *        updatedAt: '2024-01-30T20:02:46.486Z'
 *        createdAt: '2024-01-30T20:02:46.486Z'
 *
 *     successfulLogin:
 *      type: object
 *      example:
 *       status: true
 *       user:
 *        superuserId: 'b62898dd-088c-453d-b0c5-1bea96b296a6'
 *        firstName: 'Basil'
 *        lastName: 'charles'
 *        email: 'charlesbasil@gmail.com'
 *        username: 'emmasil'
 *        password: '5994471abb01112afcc18159f6ee74b4f511b998062bv59b3caf5a9c173cacfc6'
 *        company: 'The Imprint'
 *        role: 'admin'
 *        updatedAt: '2024-01-30T20:02:46.486Z'
 *        createdAt: '2024-01-30T20:02:46.486Z'
 *        users:
 *         - userId: 'df4693e7-a6e3-44a1-87a1-b454d56f1e4b'
 *           email: 'basilemmanuel@gmail.com'
 *           password: '5994471abb01112afcc18159f6cc74b4f511b99806da59b3caf5a9c173cacfc5'
 *           username: 'emmasil'
 *           hod: null
 *           role: 'user'
 *           vacation: false
 *           position: 'UX/UI designer'
 *           firstName: 'Basil'
 *           lastName: 'Emmanuel'
 *           superuserId: 'b62898dd-088c-453d-b0c5-1bea96b296a6'
 *           departmentId: 'db9d6015-d555-4ab9-a2d2-b1b5ba3ba8fb'
 *           SuperUser:
 *            superuserId: 'b62898dd-088c-453d-b0c5-1bea96b296a6'
 *            company: 'The Imprint'
 *            email: 'charlesbasil@gmail.com'
 *            firstName: 'Basil'
 *            lastName: charles'
 *           Department:
 *            departmentId: 'db9d6015-d555-4ab9-a2d2-b1b5ba3ba8fb'
 *            department: 'Design'
 *            description: 'Handles the design of components, logs, web pages and other graphics'
 *            superuserId: 'b62898dd-088c-453d-b0c5-1bea96b296a6'
 *
 *     unauthorized:
 *      type: object
 *      properties:
 *       status: boolean
 *       error: object
 *      example:
 *       status: false
 *       error:
 *        message: 'Pls login a valid user'
 */
/**
 *@swagger
 * tags:
 *  name: superuser
 *  description: The superuser(company) endpoints
 * /superuser/signup:
 *  post:
 *   summary: Create a new super admin user
 *   tags: [superuser]
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/components/schemas/superuser'
 *   responses:
 *    201:
 *     description: user created successfully
 *     content:
 *      application/json:
 *       schema:
 *        $ref: "#/components/schemas/superuser/definitions/successful"
 *    400:
 *     description: Bad Request
 *    500:
 *     description: Some server error
 *
 * /superuser/login:
 *  post:
 *   summary: Login already existing super admin user
 *   tags: [superuser]
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/components/schemas/superuser/definitions/superuserLogin'
 *   responses:
 *    200:
 *     description: request successful
 *     content:
 *      application/json:
 *       schema:
 *        $ref: "#/components/schemas/superuser/definitions/successfulLogin"
 *    400:
 *     description: Bad Request
 *    401:
 *     description: Unauthorized
 *     content:
 *      application/json:
 *       schema:
 *        type: object
 *        properties:
 *         status: boolean
 *         error: object
 *        example:
 *         status: false
 *         error:
 *          message: 'username and password did not match'
 *    500:
 *     description: Some server error
 *
 * /superuser/{userId}:
 *  get:
 *   summary: returns the instance of the super admin user with the userId
 *   tags: [superuser]
 *   parameters:
 *    - in: path
 *      name: userId
 *      schema:
 *       type: string
 *       example: 'b62898dd-088c-453d-b0c5-1bea96b296a6'
 *      required: true
 *      description: The user Id of the super admin user to be retrieved
 *   responses:
 *    200:
 *     description: request successful
 *     content:
 *      application/json:
 *       schema:
 *        $ref: "#/components/schemas/superuser/definitions/successfulLogin"
 *    401:
 *     description: Unauthorized
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/superuser/definitions/unauthorized'
 *    500:
 *     description: some server error
 *
 * /superuser/{userId}/users:
 *  get:
 *   summary: returns all users associated with the superuser Id (company)
 *   tags: [superuser, user]
 *   parameters:
 *    - in: path
 *      name: userId
 *      schema:
 *       type: string
 *       example: 'b62898dd-088c-453d-b0c5-1bea96b296a6'
 *      required: true
 *      description: The user Id of the super admin user whose tasks are to be retrieved
 *   responses:
 *    200:
 *     description: request successful
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/user/definitions/allUser'
 *    401:
 *     description: Unauthorized
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/superuser/definitions/unauthorized'
 *    403:
 *     description: Unauthorized
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/user/definitions/forbidden'
 *    500:
 *     description: some server error
 *
 * /superuser/{userId}/totalUsers:
 *  get:
 *   summary: returns total number of users associated with the superuser Id (company)
 *   tags: [superuser, user]
 *   parameters:
 *    - in: path
 *      name: userId
 *      schema:
 *       type: string
 *       example: 'b62898dd-088c-453d-b0c5-1bea96b296a6'
 *      required: true
 *      description: The super admin user Id of the user whose tasks are to be counted
 *   responses:
 *    200:
 *     description: request successful
 *     content:
 *      application/json:
 *       schema:
 *        type: object
 *        properties:
 *         status: boolean
 *         totalNumberOfUsers: string
 *        example:
 *         status: true
 *         totalNumberOfUsers: 2
 *    401:
 *     description: Unauthorized
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/superuser/definitions/unauthorized'
 *    403:
 *     description: Unauthorized
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/user/definitions/forbidden'
 *    500:
 *     description: some server error
 *
 * /superuser/{userId}/tasks:
 *  get:
 *   summary: returns all tasks associated with the superuser Id across all users existing within the superuser server(company)
 *   tags: [superuser, task]
 *   parameters:
 *    - in: path
 *      name: userId
 *      schema:
 *       type: string
 *       example: 'b62898dd-088c-453d-b0c5-1bea96b296a6'
 *      required: true
 *      description: The user Id of the super admin user whose tasks are to be retrieved
 *   responses:
 *    200:
 *     description: request successful
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/task/definitions/allTasks'
 *    401:
 *     description: Unauthorized
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/superuser/definitions/unauthorized'
 *    403:
 *     description: user not found
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/user/definitions/forbidden'
 *    500:
 *     description: some server error
 *
 * /superuser/{userId}/totalTasks:
 *  get:
 *   summary: returns total number of tasks associated with the superuser Id across all users existing within the superuser server(company)
 *   tags: [superuser, task]
 *   parameters:
 *    - in: path
 *      name: userId
 *      schema:
 *       type: string
 *       example: 'b62898dd-088c-453d-b0c5-1bea96b296a6'
 *      required: true
 *      description: The super admin user Id of the user whose tasks are to be counted
 *   responses:
 *    200:
 *     description: request successful
 *     content:
 *      application/json:
 *       schema:
 *        type: object
 *        properties:
 *         status: boolean
 *         totalNumberOfDepartment: integer
 *        example:
 *         status: true
 *         totalNumberOfTasks: 1
 *    401:
 *     description: Unauthorized
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/superuser/definitions/unauthorized'
 *    403:
 *     description: user not found
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/user/definitions/forbidden'
 *    500:
 *     description: some server error
 *
 * /superuser/{userId}/departments:
 *  get:
 *   summary: returns all department associated with the super admin user Id (that's departments within the company)
 *   tags: [superuser, department]
 *   parameters:
 *    - in: path
 *      name: userId
 *      schema:
 *       type: string
 *       example: 'b62898dd-088c-453d-b0c5-1bea96b296a6'
 *      required: true
 *      description: The super admin user Id whose departments are to be retrieved
 *   responses:
 *    200:
 *     description: request successful
 *     content:
 *      application/json:
 *       schema:
 *        type: object
 *        properties:
 *         status: boolean
 *         dept: array
 *        example:
 *         status: true
 *         dept:
 *          departmentId: 'db9d6015-d555-4ab9-a2d2-b1b5ba3ba8fb'
 *          department: 'Design'
 *          description: 'Handles the design of components, logs, web pages and other graphics'
 *          createdAt: '2024-01-30T22:27:42.000Z'
 *          updatedAt: '2024-01-31T21:21:41.000Z'
 *          superuserId: 'b62898dd-088c-453d-b0c5-1bea96b296a6'
 *    401:
 *     description: Unauthorized
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/superuser/definitions/unauthorized'
 *    500:
 *     description: some server error
 *
 * /superuser/{userId}/totalDepartments:
 *  get:
 *   summary: returns total number of departments associated with the superuser Id across all users existing within the superuser server(company)
 *   tags: [superuser, department]
 *   parameters:
 *    - in: path
 *      name: userId
 *      schema:
 *       type: string
 *       example: 'b62898dd-088c-453d-b0c5-1bea96b296a6'
 *      required: true
 *      description: The superuser Id whose departments are to be counted
 *   responses:
 *    200:
 *     description: request successful
 *     content:
 *      application/json:
 *       schema:
 *        type: object
 *        properties:
 *         status: boolean
 *         totalNumberOfDepartment: integer
 *        example:
 *         status: true
 *         totalNumberOfDepartment: 1
 *    401:
 *     description: Unauthorized
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/superuser/definitions/unauthorized'
 *    500:
 *     description: some server error
 *
 * /superuser/{userId}/chats:
 *  get:
 *   summary: returns all messages sent by the super admin user
 *   tags: [superuser, room]
 *   parameters:
 *    - in: path
 *      name: userId
 *      schema:
 *       type: string
 *      required: true
 *      description: The user Id of the user whose messages are to be retrieved
 *   responses:
 *    200:
 *     description: request successful
 *     content:
 *      application/json:
 *       schemas:
 *        type: array
 *        items:
 *         $ref: '#/components/schemas/superuser'
 *    401:
 *     description: Unauthorized
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/superuser/definitions/unauthorized'
 *    404:
 *     description: not found
 *    500:
 *     description: some server error
 *
 * /superuser/{userId}/countChats:
 *  get:
 *   summary: returns total number of messages sent by the superuser with the Id
 *   tags: [superuser, room]
 *   parameters:
 *    - in: path
 *      name: userId
 *      schema:
 *       type: string
 *      required: true
 *      description: The superuser Id whose messages are to be retrieved
 *   responses:
 *    200:
 *     description: request successful
 *     content:
 *      application/json:
 *       schemas:
 *        type: array
 *        items:
 *         $ref: '#/components/schemas/superuser'
 *    401:
 *     description: Unauthorized
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/superuser/definitions/unauthorized'
 *    404:
 *     description: not found
 *    500:
 *     description: some server error
 *
 * /superuser/update/{userId}:
 *  patch:
 *   summary: returns the updated instance of the superuser associated with the userId
 *   tags: [superuser]
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/components/schemas/superuser/definitions/superuserLogin'
 *   parameters:
 *    - in: path
 *      name: userId
 *      schema:
 *       type: string
 *      required: true
 *      description: The superuser Id of the company to be updated
 *   responses:
 *    200:
 *     description: request successful
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/superuser/definitions/successfulLogin'
 *    401:
 *     description: Unauthorized
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/superuser/definitions/unauthorized'
 *    500:
 *     description: some server error
 *
 * /superuser/delete/{userId}:
 *  delete:
 *   summary: Deletes the superuser (company) with the user id
 *   tags: [superuser]
 *   parameters:
 *    - in: path
 *      name: userId
 *      schema:
 *       type: string
 *      required: true
 *      description: The superuser's id (that's the company) to be deleted
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
 *        $ref: '#/components/schemas/superuser/definitions/unauthorized'
 *    404:
 *     description: not found
 *    500:
 *     description: some server error
 */
superUserRoutes.get('/:userId', [authenticated.authSession, permission.has(role)], superUserController.getUser);
superUserRoutes.get('/:userId/users', [authenticated.authSession, permission.has(role), permission.userActivity(access)], superUserController.getUsers);
superUserRoutes.get('/:userId/departments', [authenticated.authSession, permission.has(role), permission.userActivity(access)], superUserController.getDepartments);
superUserRoutes.get('/:userId/totalDepartments', [authenticated.authSession, permission.has(role), permission.userActivity(access)], superUserController.getDepartMentsCount);
superUserRoutes.get('/:userId/tasks', [authenticated.authSession, permission.has(role), permission.userActivity(access)], superUserController.getTasks);
superUserRoutes.get('/:userId/totalTasks', [authenticated.authSession, permission.has(role), permission.userActivity(access)], superUserController.getTasksCount);
superUserRoutes.get('/:userId/totalUsers', [authenticated.authSession, permission.has(role), permission.userActivity(access)], superUserController.getUsersCount);
superUserRoutes.post('/signup', [schemaValidator.verify(superUserPayload)], signup);
superUserRoutes.post('/login', [schemaValidator.verify(superUserLogin)], superAuth.login);
superUserRoutes.patch('/update/:userId', [authenticated.authSession, permission.has(role),
    schemaValidator.verify(superUserUpdate)], superUserController.updateUser);
superUserRoutes.delete('/delete/:userId', [authenticated.authSession, permission.has(role)], superUserController.deleteUser);
//# sourceMappingURL=super.user.routes.js.map