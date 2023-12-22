import { genRoomCrud } from "../models/general.room.js";
export const genRoomController = {
    addChat: (req, res) => {
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
    getMsg: (req, res) => {
        const { params: { msgId } } = req;
        genRoomCrud.getMessage({ id: msgId })
            .then((msg) => {
            return res.status(200).json({
                status: true,
                msg: msg === null || msg === void 0 ? void 0 : msg.toJSON(),
            });
        })
            .catch((err) => {
            return res.status(500).json({
                status: false,
                error: err,
            });
        });
    },
    deleteMsg: (req, res) => {
        const { params: { id: msgId } } = req;
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
};
//# sourceMappingURL=gen.room.controller.js.map