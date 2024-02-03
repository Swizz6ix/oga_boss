import { Router } from 'express';
import { dailyReport } from '../controllers/daily.report.controller.js';
import { schemaValidator } from '../middlewares/schema.validation.middleware.js';
import { dailyReportPayload } from '../schemas/daily.report.payload.js';
import { authenticated } from '../middlewares/isAuthenticated.middleware.js';
import { permission } from '../middlewares/check.permission.middleware.js';
import { configs } from '../../config.js';
export const dailyReportRoutes = Router();
const role = configs.roles.ADMIN;
const access = configs.vacation.TRUE;
/**
 *@swagger
 * components:
 *  schemas:
 *   report:
 *    type: object
 *    properties:
 *     reportId:
 *      type: string
 *      description: The auto-generated id of the report
 *     report:
 *      type: string
 *      description: The body of the daily report as presented by the user
 *     userId:
 *      type: string
 *      description: The user who is writing the report.
 *     superuserId:
 *      type: string
 *      description: The super admin of the company, associated with the user writing the report.
 *    required:
 *     - report
 *    example:
 *     report: 'Today I completed the design of the landing page'
 *     userId: 'df4693e7-a6e3-44a1-87a1-b454d56f1e4b'
 *     superuserId: 'b62898dd-088c-453d-b0c5-1bea96b296a6'
 *
 *    definitions:
 *     reportSuccessful:
 *      type: object
 *      example:
 *       status: true
 *       task:
 *        reportId: 'fb0860cc-6630-43cf-a232-5d7df756b27f'
 *        report: 'Today I completed the design of the landing page'
 *        progress: 'inprogress'
 *        userId: 'df4693e7-a6e3-44a1-87a1-b454d56f1e4b'
 *        superuserId: 'b62898dd-088c-453d-b0c5-1bea96b296a6'
 *        updatedAt: '2024-01-30T22:27:42.814Z'
 *        createdAt: '2024-01-30T22:27:42.814Z'
 *
 *     allReports:
 *      type: object
 *      properties:
 *       status: boolean
 *       reports: array
 *      example:
 *       status: true
 *       data:
 *        - reportId: 'fb0860cc-6630-43cf-a232-5d7df756b27f'
 *          report: 'Today I completed the design of the landing page'
 *          userId: 'df4693e7-a6e3-44a1-87a1-b454d56f1e4b'
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
 */
/**
 *@swagger
 * tags:
 *  name: report
 *  description: The report endpoints. Every user is mandated to send a daily report to the superuser(company) that they are associated with.
 * /report/add:
 *  post:
 *   summary: Create a new report
 *   tags: [report]
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/components/schemas/report'
 *   responses:
 *    201:
 *     description: user created successfully
 *     content:
 *      application/json:
 *       schema:
 *        $ref: "#/components/schemas/report/definitions/reportSuccessful"
 *    401:
 *     description: Unauthorized
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/superuser/definitions/unauthorized'
 *    500:
 *     description: Some server error
 *
 * /report/{reportId}:
 *  get:
 *   summary: returns the instance of the report with the reportId
 *   tags: [report]
 *   parameters:
 *    - in: path
 *      name: reportId
 *      schema:
 *       type: string
 *       example: 'fb0860cc-6630-43cf-a232-5d7df756b27f'
 *      required: true
 *      description: The report Id of the particular report to be retrieved
 *   responses:
 *    200:
 *     description: request successful
 *     content:
 *      application/json:
 *       schema:
 *        type: object
 *        properties:
 *         status: boolean
 *         reports: array
 *        example:
 *         status: true
 *         data:
 *          reportId: 'fb0860cc-6630-43cf-a232-5d7df756b27f'
 *          report: 'Today I completed the design of the landing page'
 *          userId: 'df4693e7-a6e3-44a1-87a1-b454d56f1e4b'
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
 * /report/all:
 *  get:
 *   summary: returns all reports that exist within a superuser (company)
 *   tags: [report]
 *   responses:
 *    200:
 *     description: returns all reports existing under a super admin server(company).
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/report/definitions/allReports'
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
 * /report/delete/{reportId}:
 *  delete:
 *   summary: Deletes the report with the report id
 *   tags: [report]
 *   parameters:
 *    - in: path
 *      name: reportId
 *      schema:
 *       type: string
 *      required: true
 *      description: The report's id to be deleted
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
 *    403:
 *     description: user not found
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/user/definitions/forbidden'
 *    500:
 *     description: some server error
 */
dailyReportRoutes.get('/all', [authenticated.authSession, permission.has(role), permission.userActivity(access)], dailyReport.getAllReport);
dailyReportRoutes.get('/:reportId', [authenticated.authSession, permission.userActivity(access)], dailyReport.getReport);
dailyReportRoutes.post('/add', [authenticated.authSession, permission.userActivity(access), schemaValidator.verify(dailyReportPayload)], dailyReport.addReport);
dailyReportRoutes.delete('/delete/:reportId', [authenticated.authSession, permission.has(role)], dailyReport.deleteReport);
//# sourceMappingURL=daily.report.routes.js.map