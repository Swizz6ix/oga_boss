import { Router } from 'express';
import { userController } from '../controllers/user.controller.js';
import { schemaValidator } from '../middlewares/schema.validation.middleware.js';
import { userUpdatePayload } from '../schemas/user.update.payload.js';
import { userPayload } from '../schemas/user.payload.js';
import { permission } from '../middlewares/check.permission.middleware.js';
import { configs } from '../../config.js';
import { createUser } from '../auth/user.register.controller.js';
import { userAuth } from '../auth/user.login.controller.js';
import { userLoginPayload } from '../schemas/user.login.payload.js';
import { authenticated } from '../middlewares/isAuthenticated.middleware.js';
const role = configs.roles.ADMIN;
const access = configs.vacation.TRUE;
export const userRoutes = Router();
/**
 *@swagger
 * components:
 *  schemas:
 *   user:
 *    type: object
 *    properties:
 *     userId:
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
 *     hod:
 *      type: string
 *      description: Indicate if a user is a Head Of Department
 *     role:
 *      type: string
 *      description: Indicates the role of a user, if a user has administrative privileges
 *     vacation:
 *      type: boolean
 *      description: Indicates if a user is blocked or on a vacation, it has a default value
 *     position:
 *      type: string
 *      description: Describes the current position the user currently holds at the company.
 *     departmentId:
 *      type: string
 *      description: The department in the company which the user is assigned to
 *     superuserId:
 *      type: string
 *      description: The super admin of the company, under which the user was created.
 *    required:
 *     - username
 *     - email
 *     - password
 *     - position
 *     - firstName
 *     - lastName
 *    example:
 *     firstName: 'Basil'
 *     lastName: 'Emmanuel'
 *     email: 'basilemmanuel@gmail.com'
 *     position: 'UX/UI designer'
 *     username: 'emmasil'
 *     password: "12345"
 *     departmentId: 'db9d6015-d555-4ab9-a2d2-b1b5ba3ba8fb'
 *     superuserId: 'b62898dd-088c-453d-b0c5-1bea96b296a6'
 *
 *    definitions:
 *     forbidden:
 *      type: object
 *      properties:
 *       status:
 *        type: boolean
 *        example: false
 *       error:
 *        type: string
 *        example: 'You do not have the required permission to perform this operation.'
 *
 *     successfulUser:
 *      type: object
 *      example:
 *       status: true
 *       user:
 *        userId: 'df4693e7-a6e3-44a1-87a1-b454d56f1e4b'
 *        vacation: true,
 *        firstName: 'Basil'
 *        lastName: 'Emmanuel'
 *        email: 'basilemmanuel@gmail.com'
 *        position: 'UX/UI designer'
 *        username: 'emmasil'
 *        password: '5994471abb01112afcc18159f6ee74b4f511b998062bv59b3caf5a9c173cacfc6'
 *        departmentId: 'db9d6015-d555-4ab9-a2d2-b1b5ba3ba8fb'
 *        superuserId: 'b62898dd-088c-453d-b0c5-1bea96b296a6'
 *        role: 'user'
 *        updatedAt: '2024-01-30T20:02:46.486Z'
 *        createdAt: '2024-01-30T20:02:46.486Z'
 *
 *     login:
 *      type: object
 *      properties:
 *       username: string
 *       password: string
 *      example:
 *       username: 'emmasil'
 *       password: '12345'
 *
 *     loginSuccessful:
 *      type: object
 *      properties:
 *       status: boolean
 *       data: object
 *      example:
 *       status: true
 *       data:
 *        userId: 'df4693e7-a6e3-44a1-87a1-b454d56f1e4b'
 *        email: 'basilemmanuel@gmail.com'
 *        password: '5994471abb01112afcc18159f6cc74b4f511b99806da59b3caf5a9c173cacfc5'
 *        username: 'emmasil'
 *        hod: null
 *        role: 'user'
 *        vacation: false
 *        position: 'UX/UI designer'
 *        firstName: 'Basil'
 *        lastName: 'Emmanuel'
 *        superuserId: 'b62898dd-088c-453d-b0c5-1bea96b296a6'
 *        departmentId: 'db9d6015-d555-4ab9-a2d2-b1b5ba3ba8fb'
 *        SuperUser:
 *         superuserId: 'b62898dd-088c-453d-b0c5-1bea96b296a6'
 *         company: 'The Imprint'
 *         email: 'charlesbasil@gmail.com'
 *         firstName: 'Basil'
 *         lastName: charles'
 *        Department:
 *         departmentId: 'db9d6015-d555-4ab9-a2d2-b1b5ba3ba8fb'
 *         department: 'Design'
 *         description: 'Handles the design of components, logs, web pages and other graphics'
 *         superuserId: 'b62898dd-088c-453d-b0c5-1bea96b296a6'
 *        tasks:
 *         - taskId: '558740cb-fcd7-4293-a1c9-b324ffa55d8d'
 *           urgencyLevel: 'normal'
 *           progress: 'inprogress'
 *           title: 'Landing Page'
 *           description: 'Design the landing page of the Oga Boss management system'
 *           deadline: '2024-02-13T23:00:00.000Z'
 *           userId: 'df4693e7-a6e3-44a1-87a1-b454d56f1e4b'
 *           departmentId: 'db9d6015-d555-4ab9-a2d2-b1b5ba3ba8fb'
 *           superuserId: 'b62898dd-088c-453d-b0c5-1bea96b296a6'
 *           updatedAt: '2024-01-30T22:27:42.814Z'
 *           createdAt: '2024-01-30T22:27:42.814Z'
 *        reports:
 *         - reportId: 'fb0860cc-6630-43cf-a232-5d7df756b27f'
 *           report: 'Today I completed the design of the landing page'
 *           userId: 'df4693e7-a6e3-44a1-87a1-b454d56f1e4b'
 *           superuserId: 'b62898dd-088c-453d-b0c5-1bea96b296a6'
 *           updatedAt: '2024-01-30T22:27:42.814Z'
 *           createdAt: '2024-01-30T22:27:42.814Z'
 *        chat: []
 *
 *     allUser:
 *      type: object
 *      properties:
 *       status:
 *        type: boolean
 *        example: true
 *       user:
 *        type: array
 *        example:
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
 *           tasks:
 *            - taskId: '558740cb-fcd7-4293-a1c9-b324ffa55d8d'
 *              urgencyLevel: 'normal'
 *              progress: 'inprogress'
 *              title: 'Landing Page'
 *              description: 'Design the landing page of the Oga Boss management system'
 *              deadline: '2024-02-13T23:00:00.000Z'
 *              userId: 'df4693e7-a6e3-44a1-87a1-b454d56f1e4b'
 *              departmentId: 'db9d6015-d555-4ab9-a2d2-b1b5ba3ba8fb'
 *              superuserId: 'b62898dd-088c-453d-b0c5-1bea96b296a6'
 *              updatedAt: '2024-01-30T22:27:42.814Z'
 *              createdAt: '2024-01-30T22:27:42.814Z'
 *           reports:
 *            - reportId: 'fb0860cc-6630-43cf-a232-5d7df756b27f'
 *              report: 'Today I completed the design of the landing page'
 *              userId: 'df4693e7-a6e3-44a1-87a1-b454d56f1e4b'
 *              superuserId: 'b62898dd-088c-453d-b0c5-1bea96b296a6'
 *              updatedAt: '2024-01-30T22:27:42.814Z'
 *              createdAt: '2024-01-30T22:27:42.814Z'
 *           chat: []
 */
/**
 *@swagger
 * tags:
 *  name: user
 *  description: The user endpoints
 * /user/signup:
 *  post:
 *   summary: Create a new user
 *   tags: [user]
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/components/schemas/user'
 *   responses:
 *    201:
 *     description: user created successfully
 *     content:
 *      application/json:
 *       schema:
 *        $ref: "#/components/schemas/user/definitions/successfulUser"
 *    500:
 *     description: Some server error
 *
 * /user/login:
 *  post:
 *   summary: Login already existing user
 *   tags: [user]
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/components/schemas/user/definitions/login'
 *   responses:
 *    200:
 *     description: user created successfully
 *     content:
 *      application/json:
 *       schema:
 *        $ref: "#/components/schemas/user/definitions/loginSuccessful"
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
 * /user/{userId}:
 *  get:
 *   summary: returns the instance of the user with the userId
 *   tags: [user]
 *   parameters:
 *    - in: path
 *      name: userId
 *      schema:
 *       type: string
 *       example: 'df4693e7-a6e3-44a1-87a1-b454d56f1e4b'
 *      required: true
 *      description: The user Id of the user to be retrieved
 *   responses:
 *    200:
 *     description: request successful
 *     content:
 *      application/json:
 *       schema:
 *        $ref: "#/components/schemas/user/definitions/loginSuccessful"
 *    401:
 *     description: Unauthorized
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/department/definitions/loginError'
 *    500:
 *     description: some server error
 *     content:
 *      application/json:
 *       schema:
 *        type: Object
 *        properties:
 *         status: boolean
 *         error: string
 *        example:
 *         status: false
 *         error: 'User df4693e7-a6e3-44a1-87a1-b454d56f1e4b cannot access information, contact an admin.'
 *
 * /user/{userId}/tasks:
 *  get:
 *   summary: returns all tasks associated with the user Id
 *   tags: [user, task]
 *   parameters:
 *    - in: path
 *      name: userId
 *      schema:
 *       type: string
 *       example: 'df4693e7-a6e3-44a1-87a1-b454d56f1e4b'
 *      required: true
 *      description: The user Id of the user whose tasks are to be retrieved
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
 *        $ref: '#/components/schemas/department/definitions/loginError'
 *    500:
 *     description: some server error
 *
 * /user/{userId}/countTasks:
 *  get:
 *   summary: returns total number of tasks associated with the user Id
 *   tags: [user, task]
 *   parameters:
 *    - in: path
 *      name: userId
 *      schema:
 *       type: string
 *       example: 'df4693e7-a6e3-44a1-87a1-b454d56f1e4b'
 *      required: true
 *      description: The user Id of the user whose tasks are to be counted
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
 *        $ref: '#/components/schemas/department/definitions/loginError'
 *    500:
 *     description: some server error
 *
 * /user/{userId}/reports:
 *  get:
 *   summary: returns all daily reports associated with the user Id
 *   tags: [user, report]
 *   parameters:
 *    - in: path
 *      name: userId
 *      schema:
 *       type: string
 *       example: 'df4693e7-a6e3-44a1-87a1-b454d56f1e4b'
 *      required: true
 *      description: The user Id of the user whose reports are to be retrieved
 *   responses:
 *    200:
 *     description: request successful
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/report/definitions/allReports'
 *    401:
 *     description: Unauthorized
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/department/definitions/loginError'
 *    500:
 *     description: some server error
 *
 * /user/{userId}/countReports:
 *  get:
 *   summary: returns total number of reports associated with the user Id
 *   tags: [user, report]
 *   parameters:
 *    - in: path
 *      name: userId
 *      schema:
 *       type: string
 *       example: 'df4693e7-a6e3-44a1-87a1-b454d56f1e4b'
 *      required: true
 *      description: The user Id of the user whose reports are to be counted
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
 *         totalNumberOfReports: 1
 *    401:
 *     description: Unauthorized
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/department/definitions/loginError'
 *    500:
 *     description: some server error
 *
 * /user/{userId}/chats:
 *  get:
 *   summary: returns all messages associated with the user Id
 *   tags: [user, room]
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
 *         $ref: '#/components/schemas/user'
 *    401:
 *     description: Unauthorized
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/department/definitions/loginError'
 *    500:
 *     description: some server error
 *
 * /user/{userId}/countChats:
 *  get:
 *   summary: returns total number of messages associated with the user Id
 *   tags: [user, room]
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
 *         $ref: '#/components/schemas/user'
 *    401:
 *     description: Unauthorized
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/department/definitions/loginError'
 *    500:
 *     description: some server error
 *
 * /user/all:
 *  get:
 *   summary: Array of all Users
 *   tags: [user]
 *   responses:
 *    200:
 *     description: returns all users existing under a super admin server(company).
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/user/definitions/allUser'
 *    401:
 *     description: Unauthorized
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/department/definitions/loginError'
 *    403:
 *     description: Forbidden
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/user/definitions/forbidden'
 *
 *
 * /user/update/{userId}:
 *  patch:
 *   summary: returns the updated instance of the user with the userId
 *   tags: [user]
 *   parameters:
 *    - in: path
 *      name: userId
 *      schema:
 *       type: string
 *       example: 'df4693e7-a6e3-44a1-87a1-b454d56f1e4b'
 *      required: true
 *      description: The user Id of the user to be updated
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       type: object
 *       properties:
 *        hod: string
 *        role: string
 *        password: string
 *        username: string
 *        position: string
 *        vacation: boolean
 *       example:
 *        vacation: false
 *   responses:
 *    200:
 *     description: request successful
 *     content:
 *      application/json:
 *       schema:
 *        $ref: "#/components/schemas/user/definitions/loginSuccessful"
 *    401:
 *     description: Unauthorized
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/department/definitions/loginError'
 *    500:
 *     description: some server error
 *
 * /user/delete/{userId}:
 *  delete:
 *   summary: Deletes the user with the user id
 *   tags: [user]
 *   parameters:
 *    - in: path
 *      name: userId
 *      schema:
 *       type: string
 *      required: true
 *      description: The user's id to be deleted
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
 *    500:
 *     description: some server error
 *
 * /logout:
 *  get:
 *   summary: logs out any logged in user
 *   tags: [user, superuser]
 *   responses:
 *    200:
 *     description: request successful
 *     content:
 *      application/json:
 *       schema:
 *        type: array
 *        example:
 *         status: true
 *         message: 'You have successfully logged out'
 *
 *    401:
 *     description: Unauthorized
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/superuser/definitions/unauthorized'
 *    500:
 *     description: some server error
 *
 */
userRoutes.get('/all', [authenticated.authSession, permission.has(role),
    permission.userActivity(access)], userController.getAllUsers);
userRoutes.get('/:userId', [authenticated.authSession, permission.userActivity(access)], userController.getUser);
userRoutes.get('/:userId/tasks', [authenticated.authSession, permission.userActivity(access)], userController.getTasks);
userRoutes.get('/:userId/countTasks', [authenticated.authSession, permission.userActivity(access)], userController.getTasksCount);
userRoutes.get('/:userId/reports', [authenticated.authSession, permission.userActivity(access)], userController.getReports);
userRoutes.get('/:userId/countReports', [authenticated.authSession, permission.userActivity(access)], userController.getReportsCount);
userRoutes.get('/:userId/chats', [authenticated.authSession, permission.userActivity(access)], userController.getChats);
userRoutes.get('/:userId/countChats', [authenticated.authSession, permission.userActivity(access)], userController.getChatsCount);
userRoutes.post('/signup', [schemaValidator.verify(userPayload)], createUser);
userRoutes.post('/login', [schemaValidator.verify(userLoginPayload)], userAuth.login);
userRoutes.patch('/update/:userId', [authenticated.authSession, permission.has(role), permission.userActivity(access),
    schemaValidator.verify(userUpdatePayload)], userController.updateUser);
userRoutes.delete('/delete/:userId', [authenticated.authSession, permission.has(role)], userController.deleteUser);
//# sourceMappingURL=user.routes.js.map