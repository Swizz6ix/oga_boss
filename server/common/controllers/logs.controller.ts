import { Request, Response } from "express";
import { loggerCrud } from "../models/logger.js";
import { Op } from "sequelize";
import { superUserCrud } from "../models/super.user.js";
import { user } from "../middlewares/user.middleware.js";
import { logging } from "../../engine/logging.js";

export const logController = {
  getAllLogs: async (req: Request, res: Response) => {
    const reqId = req.user.userId;
    const _user = await user._user_id(reqId);
    const _superuserId = await superUserCrud.findUser({ superuserId: reqId });
    const log = logging.userLogs(String(_user));
    if (reqId !== _superuserId?.superuserId) {
      log.warn(`User ${reqId} tried to access all logs`)
      return res.status(403).json({
        status: false,
        error: 'You do not have the required permission to access this information',
      });
    }
    loggerCrud.getAllLogs({
      metadata: {
        [Op.substring]: reqId
      }})
      .then((logs) => {
        log.info(`superuser ${reqId} accessed all logs`)
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

  getAllLevels: async (req: Request, res:Response) => {
    const reqId = req.user.userId;
    const _userId = await user._user_id(reqId);
    const _superuser = await superUserCrud.findUser({ superuserId: reqId });
    const log = logging.userLogs(String(_userId));
    if (reqId !== _superuser?.superuserId) {
      log.warn(`User ${reqId} tried to access all logs`)
      return res.status(403).json({
        status: false,
        error: `You do not have the required permission to access this information`
      });
    }
    const {
      params: { level }
    } = req
    loggerCrud.getAllLogs({
      metadata: {
        [Op.substring]: reqId
      },
      level: level})
      .then((logs) => {
        return res.status(200).json({
          status: true,
          data: logs
        });
      })
      .catch((err) => {
        return res.status(500).json({
          status: false,
          error: err
        });
      })
  },

  getLog: async (req: Request, res: Response) => {
    const reqId = req.user.userId;
    const _user = await user._user_id(reqId);
    const _superuser = await superUserCrud.findUser({ superuserId: reqId });
    const log = logging.userLogs(String(_user));
    const {
      params: { logId },
    } = req;
    if (reqId !== _superuser?.superuserId) {
      log.warn(`User ${reqId} tried to access log ${logId}`);
      return res.status(403).json({
        status: false,
        error: `You don not have the required permission to access this information`,
      });
    }
    loggerCrud.getLog({ logId: logId })
      .then((logs) => {
        log.info(`superuser ${reqId} accessed log ${logId}`);
        return res.status(200).json({
          status: true,
          data: logs?.toJSON(),
        });
      })
      .catch((err) => {
        return res.status(500).json({
          status: false,
          error: err,
        });
      });
  },

  deleteLogs: async (req: Request, res: Response) => {
    const reqId = req.user.userId;
    console.log('we', reqId)
    const _user = await user._user_id(reqId);
    const _superuser = await superUserCrud.findUser({ superuserId: reqId });
    const log = logging.userLogs(String(_user));
    const {
      params: { logId },
    } = req;
    if (reqId !== _superuser?.superuserId) {
      log.warn(`User ${reqId} tried to delete log ${logId}`);
      return res.status(403).json({
        status: false,
        error: `You don't have the required permission to complete this operation`
      })
    }
    console.log('see', logId, reqId)
    loggerCrud.deleteLog({ logId: logId })
      .then((numberOfLogsDeleted) => {
        log.info(`superuser ${reqId} just deleted log ${logId}`);
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
