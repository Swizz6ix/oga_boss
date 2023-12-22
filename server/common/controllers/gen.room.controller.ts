import { Request, Response } from "express";
import { genRoomCrud } from "../models/general.room.js";

export const genRoomController = {
  addChat: (req: Request, res: Response) => {
    const payload = req.body;
    genRoomCrud.postMessage(Object.assign(payload))
      .then((msg) => {
        return res.status(201).json({
          status: true,
          msg: msg.toJSON(), 
        });
      })
      .catch((err) => {
        return res.status(500).json({
          status: false,
          error: err,
        });
      });
  },
  getMsg: (req: Request, res: Response) => {
    const {
      params: { msgId }
    } = req;
    genRoomCrud.getMessage({ id: msgId })
      .then((msg) => {
        return res.status(200).json({
          status: true,
          msg: msg?.toJSON(),
        });
      })
      .catch((err) => {
        return res.status(500).json({
          status: false,
          error: err,
        });
      });
  },
  deleteMsg: (req: Request, res: Response) => {
    const {
      params: { id: msgId }
    } = req;
    genRoomCrud.deleteMessage({ id: msgId })
      .then((numberOfMsgDeleted) => {
        return res.status(200).json({
          status: true,
          msg: { numberOfEntriesDeleted: numberOfMsgDeleted },
        });
      })
      .catch((err) => {
        return res.status(500).json({
          status: false,
          error: err,
        });
      });
  }
}
