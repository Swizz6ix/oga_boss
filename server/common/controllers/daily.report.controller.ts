import { Request, Response } from "express";
import { dailyRptCrud } from "../models/daily.report.js";
import { user } from "../middlewares/user.middleware.js";
import { logging } from "../../engine/logging.js";
import { configs } from "../../config.js";
import { userCrud } from "../models/user.js";

const role = configs.roles.ADMIN;

export const dailyReport = {
  /**
   * 
   * @param req 
   * @param res 
   */
  addReport: async (req: Request, res: Response) => {
    const reqId = req.user.userId;
    const superuserId = await user._user_id(reqId);
    const log = logging.userLogs(String(superuserId));
    const payload = req.body;
    const _userId = payload.userId;
    const _superuserId = payload.superuserId

    if (reqId !== _userId) {
      log.error(`User ${reqId} tried write a report for user ${_userId}`)
      return res.status(500).json({
        status: false,
        error: `cannot write report for user ${_userId}`,
      });
    }

    if (superuserId !== _superuserId) {
      log.error(`User ${reqId} provided an unknown superuser ${_superuserId}`);
      return res.status(500).json({
        status: false,
        error: `Unknown superuser ${_superuserId} provided`,
      });
    }
    dailyRptCrud.newReport(Object.assign(payload))
      .then((report) => {
          log.info(
            `Report ${report.reportId} was just created by user ${req.user.userId}`);

        return res.status(201).json({
          status: true,
          dept: report.toJSON(),
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

  getReport: async (req: Request, res: Response) => {
    const reqId = req.user.userId;
    const superuserId = await user._user_id(reqId);
    const log = logging.userLogs(String(superuserId));
    const _user = await userCrud.findUser({ userId: reqId });
    const {
      params: { reportId }
    } = req;
    dailyRptCrud.findReport({ reportId: reportId })
      .then((report) => {
        if (superuserId !== report?.superuserId) {
          log.error(
            `User ${reqId} tried to access User ${report?.userId} report entry ${reportId}`
          );
          return res.status(403).json({
            status: false,
            error: `User ${reqId} do not have the required permission to perform this operation`,
          })
        }
        if ( reqId !== superuserId) {
          if (_user?.role !== role) {
            log.error(`User ${reqId} tried read the report ${reportId} of User ${report.userId}`);
            return res.status(403).json({
              status: false,
              error: `User ${reqId} does not have the required permission to perform this operation.`
            })
          }
        }
        log.info(`Report ${reportId} was retrieved by user ${req.user.userId}`)
        return res.status(200).json({
          status: true,
          data: report?.toJSON(),
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

  getAllReport: async (req: Request, res: Response) => {
    const {
      user: { userId }
    } = req;

    // Get all reports that exist only within a particular superuser
    const superuserId = await user._user_id(userId);
    const log = logging.userLogs(String(superuserId));
    dailyRptCrud.findAllReport({ superuserId: superuserId })
      .then((reports) => {
        log.info(`All reports retrieved by user ${req.user.userId}`)
        return res.status(200).json({
          status: true,
          reports: reports,
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

  deleteReport: async (req: Request, res: Response) => {
    const reqId = req.user.userId;
    const {
      params: { reportId }
    } = req;
    const report = await dailyRptCrud.findReport({ reportId: reportId });
    const log = logging.userLogs(String(report?.superuserId));

    // Only the superuser who created the task can deleted it.
    if (reqId !== report?.superuserId) {
      log.warn(`User ${reqId} tried to delete report ${reportId}.`);
      return res.status(500).json({
        status: false,
        error: `User ${reqId} does have the required permission to perform this operation.`,
      });
    }
    dailyRptCrud.deleteReport({ reportId: reportId })
      .then((numberOfReportsDeleted) => {
        log.warn(`Report: ${reportId} was deleted by user ${req.user.userId}`);
        return res.status(200).json({
          status: true,
          data: { numberOfEntriesDeleted: numberOfReportsDeleted },
        });
      })
      .catch((err) => {
        log.error(new Error(err));
        return res.status(500).json({
          status: false,
          error: err,
        });
      });
  }
}
