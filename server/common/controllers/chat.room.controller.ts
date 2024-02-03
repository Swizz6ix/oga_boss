import { Request, Response } from "express";
import { chatRoomCrud } from "../models/chat.room.js";
import { logging } from "../../engine/logging.js";
import { user } from "../middlewares/user.middleware.js";

export const chatRoomController = {
  addChat: async (req: Request, res: Response) => {
    const reqId = req.user.userId;
    const reqUser = await user._user_id(reqId);
    const log = logging.userLogs(String(reqUser));
    const payload = req.body;
    if (reqUser !== payload.superuserId) {
      log.warn(`User ${reqId} tried chat on ${payload.superuserId} server`)
      return res.status(403).json({
        status: false,
        error: `cannot chat here`
      });
    }
    chatRoomCrud.postMessage(Object.assign(payload))
      .then((msg) => {
        log.info(`User ${reqId} just posted a chat ${msg.messageId}`);
        return res.status(201).json({
          status: true,
          msg: msg.toJSON(), 
        });
      })
      .catch((err) => {
        log.error(new Error(err));
        return res.status(500).json({
          status: false,
          error: err,
        });
      });
  },

  getMsg: async (req: Request, res: Response) => {
    const reqId = req.user.userId;
    const reqUser = await user._user_id(String(reqId));
    const {
      params: { messageId }
    } = req;
    console.log('see', messageId)
    chatRoomCrud.getMessage({ messageId: messageId })
      .then((msg) => {
        logging.controllerLogger.info(`msg ${messageId} retrieved by user ${req.user.userId}`);
        if (reqUser !== msg?.superuserId) {
          return res.status(403).json({
            status: false,
            error: `You don't have the required permission to perform this operation`
          })
        }
        return res.status(200).json({
          status: true,
          msg: msg?.toJSON(),
        });
      })
      .catch((err) => {
        logging.controllerLogger.error(new Error(err));
        return res.status(500).json({
          status: false,
          error: err,
        });
      });
  },

  getAllMsg: (req: Request, res: Response) => {
    chatRoomCrud.getAllMessages(req.query)
    .then((msg) => {
      logging.controllerLogger.info(`All messages retrieved by user ${req.user.userId}`);
      return res.status(200).json({
        status: true,
        data: msg,
      });
    })
    .catch((err) => {
      logging.controllerLogger.error(new Error(err));
      return res.status(500).json({
        status: false,
        error: err,
      });
    });
  },

  deleteMsg: (req: Request, res: Response) => {
    const {
      params: { msgId }
    } = req;
    chatRoomCrud.deleteMessage({ id: msgId })
      .then((numberOfMsgDeleted) => {
        logging.controllerLogger.warn(`msg ${msgId} was deleted by user ${req.user.userId}`);
        return res.status(200).json({
          status: true,
          msg: { numberOfEntriesDeleted: numberOfMsgDeleted },
        });
      })
      .catch((err) => {
        logging.controllerLogger.error(new Error(err));
        return res.status(500).json({
          status: false,
          error: err,
        });
      });
  }
}
