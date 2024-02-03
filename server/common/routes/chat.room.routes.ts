import { Router } from 'express';
import { chatRoomController } from '../controllers/chat.room.controller.js';
import { schemaValidator } from '../middlewares/schema.validation.middleware.js';
import { genRoomPayload } from '../schemas/chat.room.payload.js';
import { authenticated } from '../middlewares/isAuthenticated.middleware.js';
import { permission } from '../middlewares/check.permission.middleware.js';
import { configs } from '../../config.js';

export const chatRoomRoutes = Router();
const access = configs.vacation.TRUE;

/**
 *@swagger
 * components:
 *  schemas:
 *   Chat:
 *    type: object
 *    properties:
 *     messageId:
 *      type: string
 *      description: The auto-generated id of the message
 *     message:
 *      type: string
 *      description: The body of the message
 *     userId:
 *      type: string
 *      description: The user who sent the message.
 *     superuserId:
 *      type: string
 *      description: The super admin of the company, associated withe the user who sent the message.
 *    required:
 *     - message
 *    example:
 *     message: 'Hello, pls who is working on the hone page of the Oga Boss management system'
 *     userId: '8e8052ba-d855-4895-945a-4f45ce237b79'
 *     departmentId: '026354a1-dbff-4023-b16b-d9297678d82d'
 *     superuserId: '6308a111-bbb2-4a9f-a421-2b1a3648316b'
 */

/**
 *@swagger
 * tags:
 *  name: room
 *  description: The room endpoints. Every user is eligible to sent a chat message to te room existing within their superuser(company).
 * /room/chat:
 *  post:
 *   summary: post a new message in the room
 *   tags: [room]
 *   requestBody:
 *    required: true
 *    content: 
 *     application/json:
 *      schema:
 *       $ref: '#/components/schemas/room'
 *   responses:
 *    201:
 *     description: user created successfully
 *     content: 
 *      application/json:
 *       schema:
 *        $ref: "#/components/schemas/room"
 *    500:
 *     description: Some server error
 * 
 * /room/{messageId}:
 *  get:
 *   summary: returns the instance of the chat with the messageId
 *   tags: [room]
 *   parameters:
 *    - in: path
 *      name: messageId
 *      schema:
 *       type: string
 *      required: true
 *      description: The message Id of the particular message to be retrieved
 *   responses:
 *    200:
 *     description: request successful
 *     content:
 *      application/json:
 *       schemas:
 *        type: array
 *        items:
 *         $ref: '#/components/schemas/room'
 *    500:
 *     description: some server error
 * 
 * /room/all:
 *  get:
 *   summary: returns all messages that exist within a superuser(company).
 *   tags: [room]
 *   responses:
 *    200:
 *     description: returns all reports existing under a super admin server(company).
 *     content:
 *      application/json:
 *       schema:
 *        type: array
 *        items:
 *         $ref: '#/components/schema/room'
 * 
 * /room/delete/{messageId}:
 *  delete:
 *   summary: Deletes the message with the message id
 *   tags: [room]
 *   parameters:
 *    - in: path
 *      name: messageId
 *      schema:
 *       type: string
 *      required: true
 *      description: The message's id to be deleted
 *   responses:
 *    200:
 *     description: request successful
 *    404:
 *     description: message not found
 *    500:
 *     description: some server error
 */

chatRoomRoutes.get('/all',
  [authenticated.authSession, permission.userActivity(access)], chatRoomController.getAllMsg);

chatRoomRoutes.get('/:messageId',
  [authenticated.authSession, permission.userActivity(access)], chatRoomController.getMsg);

chatRoomRoutes.post('/chat', [authenticated.authSession, permission.userActivity(access),
  schemaValidator.verify(genRoomPayload)], chatRoomController.addChat);

chatRoomRoutes.delete('/:messageId', [authenticated.authSession], chatRoomController.deleteMsg);
