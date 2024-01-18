import { Request, Response } from "express";
import { loggerCrud } from "../models/logger.js";

export const logController = {
  getAllLogs: (req: Request, res: Response) => {
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

  getLog: (req: Request, res: Response) => {
    const {
      params: { logId },
    } = req;
    loggerCrud.getLog({ id: logId })
      .then((log) => {
        return res.status(200).json({
          status: true,
          data: log?.toJSON(),
        });
      })
      .catch((err) => {
        return res.status(500).json({
          status: false,
          error: err,
        });
      });
  },

  deleteLogs: (req: Request, res: Response) => {
    const {
      params: { logId },
    } = req;
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
}
