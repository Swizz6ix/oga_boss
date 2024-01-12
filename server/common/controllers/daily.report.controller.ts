import { Request, Response } from "express";
import { dailyRptCrud } from "../models/daily.report.js";
import { user } from "../middlewares/user.middleware.js";
import { controllerLogger } from "../../engine/logging.js";

export const dailyReport = {
  addReport: (req: Request, res: Response) => {
    const payload = req.body;
    dailyRptCrud.newReport(Object.assign(payload))
      .then((report) => {
        controllerLogger.info(
          `Report ${report.reportId} was just created by user ${req.user.userId}`
        );
        return res.status(201).json({
          status: true,
          dept: report.toJSON(),
        });
      })
      .catch((err) => {
        controllerLogger.error(new Error(err));
        return res.status(500).json({
          status: false,
          error: err,
        });
      });
  },

  getReport: (req: Request, res: Response) => {
    const {
      params: { reportId }
    } = req;
    dailyRptCrud.findReport({ reportId: reportId })
      .then((report) => {
        controllerLogger.info(`Report ${reportId} was retrieved by user ${req.user.userId}`);
        return res.status(200).json({
          status: true,
          data: report?.toJSON(),
        });
      })
      .catch((err) => {
        controllerLogger.error(new Error(err));
        return res.status(500).json({
          status: false,
          error: err,
        });
      });
  },

  getAllReport: (req: Request, res: Response) => {
    const {
      user: { userId }
    } = req;

    user._user_id(userId)
      .then((id) => {
        dailyRptCrud.findAllReport({ superuserId: id })
          .then((reports) => {
            controllerLogger.info(`All reports retrieved by user ${req.user.userId}`)
            return res.status(200).json({
              status: true,
              reports: reports,
            });
          })
          .catch((err) => {
            controllerLogger.error(new Error(err));
            return res.status(500).json({
              status: false,
              error: err,
            });
          });
      })
      .catch((err) => {
        controllerLogger.error(new Error(err));
        return res.status(500).json({
          status: false,
          error: err,
        });
      });
  },

  deleteReport: (req: Request, res: Response) => {
    const {
      params: { reportId }
    } = req;
    dailyRptCrud.deleteReport({ reportId: reportId })
      .then((numberOfReportsDeleted) => {
        controllerLogger.warn(`Report: ${reportId} was deleted by user ${req.user.userId}`);
        return res.status(200).json({
          status: true,
          data: { numberOfEntriesDeleted: numberOfReportsDeleted },
        });
      })
      .catch((err) => {
        controllerLogger.error(new Error(err));
        return res.status(500).json({
          status: false,
          error: err,
        });
      });
  }
}
