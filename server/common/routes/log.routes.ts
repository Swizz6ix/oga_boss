import { Router } from "express";
import { logController } from "../controllers/logs.controller.js";
import { authenticated } from "../middlewares/isAuthenticated.middleware.js";

export const logRoutes = Router();

/**
 *@swagger
 * components:
 *  schemas:
 *   logs:
 *    type: object
 *    properties:
 *     logId:
 *      type: number
 *      description: The auto-generated id of the log
 *     level:
 *      type: string
 *      description: Describes the log level
 *     source:
 *      type: string
 *      description: Describes the source of the log
 *     metadata:
 *      type: string
 *      description: Describes the metadata of the log
 *     time:
 *      type: string
 *      description: Describes the timestamp of the log
 *    example:
 *     logId: 8053
 *     level: 'error'
 *     source: '\tUser a4c5182f-7801-4a95-90e8-d2c3c68c5ad6 tried read the report f57249d3-9125-4444-9ca0-411d1820ab5f of User a4c5182f-7801-4a95-90e8-d2c3c68c5ad6'
 *     metadata: '{\"service\":\"6308a111-bbb2-4a9f-a421-2b1a3648316b\",\"id\":\"12345\",\"timestamp\":\"2024-01-20 06:18:12.264 PM\"}'
 *     time: '2024-01-20T18:18:12.000Z'
 */

/**
 *@swagger
 * tags:
 *  name: logs
 *  description: -The logs endpoints. Logs all events associated with the superuser(company).
 * 
 * /logs/{logId}:
 *  get:
 *   summary: returns an instance of log with the logId
 *   tags: [logs, superuser]
 *   parameters:
 *    - in: path
 *      name: logId
 *      schema:
 *       type: integer
 *       example: 2912
 *      required: true
 *      description: The log Id of the particular log to be retrieved
 *   responses:
 *    200:
 *     description: request successful
 *     content:
 *      application/json:
 *       schema:
 *        type: object
 *        properties:
 *         status: boolean
 *         data: object
 *        example:
 *         status: true
 *         data:
 *          logId: 2912
 *          level: 'warn'
 *          source: '\tUser: df4693e7-a6e3-44a1-87a1-b454d56f1e4b tried to access the endpoint /user/delete/5f273f95-5c9e-4aaa-a3f0-db7a1147dce9'
 *          metadata: '{\"service\":\"b62898dd-088c-453d-b0c5-1bea96b296a6\",\"app\":\"oga_boss\",\"timestamp\":\"2024-02-01 01:36:48.843 AM\"}'
 *          time: '2024-02-01T01:36:49.000Z'
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
 * /logs/all/{level}:
 *  get:
 *   summary: returns all logs associated with the level within the superuser(company).
 *   tags: [logs, superuser]
 *   parameters:
 *    - in: path
 *      name: level
 *      schema:
 *       type: string
 *       example: warn
 *      required: true
 *      description: The level of the logs to be retrieved
 *   responses:
 *    200:
 *     description: request successful
 *     content:
 *      application/json:
 *       schema:
 *        type: object
 *        properties:
 *         status: boolean
 *         data: object
 *        example:
 *         status: true
 *         data:
 *          - logId: 1476
 *            level: 'warn'
 *            source: '\tDepartment bdf5a675-fb63-43bd-b5dd-ab017f07dacb was deleted by user b62898dd-088c-453d-b0c5-1bea96b296a6'
 *            metadata: '{\"service\":\"b62898dd-088c-453d-b0c5-1bea96b296a6\",\"app\":\"oga_boss\",\"timestamp\":\"2024-01-31 10:40:33.871 PM\"}'
 *            time: '2024-01-31T22:40:34.000Z'
 *          - logId: 1873
 *            level: 'warn'
 *            source: '\tUser df4693e7-a6e3-44a1-87a1-b454d56f1e4b tried to access url: /user/df4693e7-a6e3-44a1-87a1-b454d56f1e4b'
 *            metadata: '{\"service\":\"b62898dd-088c-453d-b0c5-1bea96b296a6\",\"app\":\"oga_boss\",\"timestamp\":\"2024-01-31 11:37:43.843 PM\"}'
 *            time: '2024-01-31T23:37:44.000Z'
 *          - logId: 1918
 *            level: 'warn'
 *            source: '\tUser df4693e7-a6e3-44a1-87a1-b454d56f1e4b tried to access url: /user/df4693e7-a6e3-44a1-87a1-b454d56f1e4b'
 *            metadata: '{\"service\":\"b62898dd-088c-453d-b0c5-1bea96b296a6\",\"app\":\"oga_boss\",\"timestamp\":\"2024-01-31 11:43:24.279 PM\"}'
 *            time: '2024-01-31T23:43:24.000Z'
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
 * /logs/all:
 *  get:
 *   summary: returns all logs that exist within a superuser (company)
 *   tags: [logs, superuser]
 *   responses:
 *    200:
 *     description: returns all logs existing under a super admin server(company).
 *     content:
 *      application/json:
 *       schema:
 *        type: object
 *        properties:
 *         status: boolean
 *         data: array
 *        example:
 *         status: true
 *         data:
 *          - logId: 562
 *            level: 'alert'
 *            source: '\tSuperuser b62898dd-088c-453d-b0c5-1bea96b296a6 has just been created.'
 *            metadata: '{\"service\":\"b62898dd-088c-453d-b0c5-1bea96b296a6\",\"app\":\"oga_boss\",\"timestamp\":\"2024-01-30 09:02:48.038 PM\"}'
 *            time: '2024-01-30T21:02:48.000Z'
 *          - logId: 711
 *            level: 'info'
 *            source: '\tUser: b62898dd-088c-453d-b0c5-1bea96b296a6 accessed the endpoint /superuser/wwee as an admin'
 *            metadata: '{\"service\":\"b62898dd-088c-453d-b0c5-1bea96b296a6\",\"app\":\"oga_boss\",\"timestamp\":\"2024-01-30 11:07:08.786 PM\"}'
 *            time: '2024-01-30T23:07:09.000Z'
 *          - logId: 1918
 *            level: 'warn'
 *            source: '\tUser df4693e7-a6e3-44a1-87a1-b454d56f1e4b tried to access url: /user/df4693e7-a6e3-44a1-87a1-b454d56f1e4b'
 *            metadata: '{\"service\":\"b62898dd-088c-453d-b0c5-1bea96b296a6\",\"app\":\"oga_boss\",\"timestamp\":\"2024-01-31 11:43:24.279 PM\"}'
 *            time: '2024-01-31T23:43:24.000Z'
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
 */

logRoutes.get('/all', [authenticated.authSession], logController.getAllLogs);
logRoutes.get('/all/:level', [authenticated.authSession], logController.getAllLevels);
logRoutes.get('/:logId', [authenticated.authSession], logController.getLog);
// logRoutes.delete('/delete/:logId', [authenticated.authSession], logController.deleteLogs);
