import { Request, Response } from "express";
import { dailyRptCrud } from "../models/daily.report.js";
import { user } from "../middlewares/user.middleware.js";
import { logging } from "../../engine/logging.js";

export const dailyReport = {
  addReport: async (req: Request, res: Response) => {
    const superuserId = await user._user_id(req.user.userId);
    const log = logging.userLogs(String(superuserId));
    const payload = req.body;
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
    const superuserId = await user._user_id(req.user.userId);
    const log = logging.userLogs(String(superuserId))
    const {
      params: { reportId }
    } = req;
    dailyRptCrud.findReport({ reportId: reportId })
      .then((report) => {
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
    const {
      params: { reportId }
    } = req;
    const report = await dailyRptCrud.findReport({ reportId: reportId });
    const log = logging.userLogs(String(report?.superuserId));
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
