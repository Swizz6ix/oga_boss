import { loggerCrud } from "../models/logger.js";
export const logController = {
    getAllLogs: (req, res) => {
        loggerCrud.getAllLogs(req.query)
            .then((logs) => {
            return res.status(200).json({
                status: true,
                data: logs,
            });
        })
            .catch((err) => {
            return res.status(500).json({
                status: false,
                error: err,
            });
        });
    },
    getLog: (req, res) => {
        const { params: { logId }, } = req;
        loggerCrud.getLog({ id: logId })
            .then((log) => {
            return res.status(200).json({
                status: true,
                data: log === null || log === void 0 ? void 0 : log.toJSON(),
            });
        })
            .catch((err) => {
            return res.status(500).json({
                status: false,
                error: err,
            });
        });
    },
    deleteLogs: (req, res) => {
        const { params: { logId }, } = req;
        loggerCrud.deleteLog({ id: logId })
            .then((numberOfLogsDeleted) => {
            return res.status(200).json({
                status: true,
                data: { numberOfLogsEntriesDeleted: numberOfLogsDeleted },
            });
        })
            .catch((err) => {
            return res.status(500).json({
                status: false,
                error: err,
            });
        });
    },
};
//# sourceMappingURL=logs.controller.js.map