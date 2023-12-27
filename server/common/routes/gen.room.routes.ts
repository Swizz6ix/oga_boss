import { Router } from 'express';
import { genRoomController } from '../controllers/gen.room.controller.js';
import { schemaValidator } from '../middlewares/schema.validation.middleware.js';
import { genRoomPayload } from '../schemas/gen.room.payload.js';
import { authenticated } from '../middlewares/isAuthenticated.middleware.js';

export const genRoomRoutes = Router();

genRoomRoutes.get('/all', [authenticated.check], genRoomController.getAllMsg);

genRoomRoutes.get('/:msgId', [authenticated.check], genRoomController.getMsg);

genRoomRoutes.post('/addMsg',
  [authenticated.check, schemaValidator.verify(genRoomPayload)], genRoomController.addChat);

genRoomRoutes.delete('/:msgId', [authenticated.check], genRoomController.deleteMsg);
