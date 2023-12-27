import { Request, Response } from "express";
import { dailyRptCrud } from "../models/daily.report.js";
import { user } from "../middlewares/user.middleware.js";

export const dailyReport = {
  addReport: (req: Request, res: Response) => {
    const payload = req.body;
    dailyRptCrud.newReport(Object.assign(payload))
      .then((report) => {
        return res.status(201).json({
          status: true,
          dept: report.toJSON(),
        });
      })
      .catch((err) => {
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
    dailyRptCrud.findReport({ id: reportId })
      .then((report) => {
        return res.status(200).json({
          status: true,
          data: report?.toJSON(),
        });
      })
      .catch((err) => {
        return res.status(500).json({
          status: false,
          error: err,
        });
      });
  },

  getAllReport: (req: any, res: Response) => {
    const {
      user: { userId }
    } = req;

    user._user_id(userId)
      .then((id) => {
        dailyRptCrud.findAllReport({ SuperUserId: id })
          .then((reports) => {
            return res.status(200).json({
              status: true,
              reports: reports,
            });
          })
          .catch((err) => {
            return res.status(500).json({
              status: false,
              error: err,
            });
          });
      })
      .catch((err) => {
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
    dailyRptCrud.deleteReport({ id: reportId })
      .then((numberOfReportsDeleted) => {
        return res.status(200).json({
          status: true,
          data: { numberOfEntriesDeleted: numberOfReportsDeleted },
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
