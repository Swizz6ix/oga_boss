import { Router } from 'express';
import { chatRoomController } from '../controllers/chat.room.controller.js';
import { schemaValidator } from '../middlewares/schema.validation.middleware.js';
import { genRoomPayload } from '../schemas/chat.room.payload.js';
import { authenticated } from '../middlewares/isAuthenticated.middleware.js';
import { permission } from '../middlewares/check.permission.middleware.js';
import { configs } from '../../config.js';

export const chatRoomRoutes = Router();
const access = configs.vacation.TRUE;

chatRoomRoutes.get('/all',
  [authenticated.authSession, permission.userActivity(access)], chatRoomController.getAllMsg);

chatRoomRoutes.get('/:chatId',
  [authenticated.authSession, permission.userActivity(access)], chatRoomController.getMsg);

chatRoomRoutes.post('/chat', [authenticated.authSession, permission.userActivity(access),
  schemaValidator.verify(genRoomPayload)], chatRoomController.addChat);

chatRoomRoutes.delete('/:chatId', [authenticated.authSession], chatRoomController.deleteMsg);
