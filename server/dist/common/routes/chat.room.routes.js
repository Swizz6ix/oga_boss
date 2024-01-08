import { Router } from 'express';
import { chatRoomController } from '../controllers/chat.room.controller.js';
import { schemaValidator } from '../middlewares/schema.validation.middleware.js';
import { genRoomPayload } from '../schemas/chat.room.payload.js';
import { authenticated } from '../middlewares/isAuthenticated.middleware.js';
export const chatRoomRoutes = Router();
chatRoomRoutes.get('/all', [authenticated.authSession], chatRoomController.getAllMsg);
chatRoomRoutes.get('/:chatId', [authenticated.authSession], chatRoomController.getMsg);
chatRoomRoutes.post('/chat', [authenticated.authSession, schemaValidator.verify(genRoomPayload)], chatRoomController.addChat);
chatRoomRoutes.delete('/:chatId', [authenticated.authSession], chatRoomController.deleteMsg);
//# sourceMappingURL=chat.room.routes.js.map