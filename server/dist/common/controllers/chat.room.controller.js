import { chatRoomCrud } from "../models/chat.room.js";
import { logging } from "../../engine/logging.js";
export const chatRoomController = {
    addChat: (req, res) => {
        const payload = req.body;
        chatRoomCrud.postMessage(Object.assign(payload))
            .then((msg) => {
            logging.controllerLogger.info(`User ${req.user.userId} just posted a chat ${msg.messageId}`);
            return res.status(201).json({
                status: true,
                msg: msg.toJSON(),
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
    getMsg: (req, res) => {
        const { params: { msgId } } = req;
        chatRoomCrud.getMessage({ id: msgId })
            .then((msg) => {
            logging.controllerLogger.info(`msg ${msgId} retrieved by user ${req.user.userId}`);
            return res.status(200).json({
                status: true,
                msg: msg === null || msg === void 0 ? void 0 : msg.toJSON(),
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
    getAllMsg: (req, res) => {
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
    deleteMsg: (req, res) => {
        const { params: { msgId } } = req;
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
};
//# sourceMappingURL=chat.room.controller.js.map