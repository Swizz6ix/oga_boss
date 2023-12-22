import { Router } from 'express';
import { genRoomController } from '../controllers/gen.room.controller.js';
import { schemaValidator } from '../middlewares/schema.validation.middleware.js';
import { genRoomPayload } from '../schemas/gen.room.payload.js';

export const genRoomRoutes = Router();

genRoomRoutes.get('/all', genRoomController.getAllMsg);
genRoomRoutes.get('/:msgId', genRoomController.getMsg);
genRoomRoutes.post('/addMsg',
  [schemaValidator.verify(genRoomPayload)], genRoomController.addChat);
genRoomRoutes.delete('/:msgId', genRoomController.deleteMsg);
