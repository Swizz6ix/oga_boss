import { Request, Response } from "express";
import { chatRoomCrud } from "../models/chat.room.js";

export const chatRoomController = {
  addChat: (req: Request, res: Response) => {
    const payload = req.body;
    chatRoomCrud.postMessage(Object.assign(payload))
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
    chatRoomCrud.getMessage({ id: msgId })
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
  getAllMsg: (req: Request, res: Response) => {
    chatRoomCrud.getAllMessages(req.query)
    .then((msg) => {
      return res.status(200).json({
        status: true,
        data: msg,
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
      params: { msgId }
    } = req;
    chatRoomCrud.deleteMessage({ id: msgId })
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
