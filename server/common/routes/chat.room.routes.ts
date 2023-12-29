import { Router } from 'express';
import { chatRoomController } from '../controllers/chat.room.controller.js';
import { schemaValidator } from '../middlewares/schema.validation.middleware.js';
import { genRoomPayload } from '../schemas/chat.room.payload.js';
import { authenticated } from '../middlewares/isAuthenticated.middleware.js';

export const chatRoomRoutes = Router();

chatRoomRoutes.get('/all', [authenticated.check], chatRoomController.getAllMsg);

chatRoomRoutes.get('/:chatId', [authenticated.check], chatRoomController.getMsg);

chatRoomRoutes.post('/chat',
  [authenticated.check, schemaValidator.verify(genRoomPayload)], chatRoomController.addChat);

chatRoomRoutes.delete('/:chatId', [authenticated.check], chatRoomController.deleteMsg);
