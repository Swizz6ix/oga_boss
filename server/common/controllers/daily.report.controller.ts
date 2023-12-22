import { Request, Response } from "express";
import { dailyRptCrud } from "../models/daily.report.js";

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

  getAllReport: (req: Request, res: Response) => {
    dailyRptCrud.findAllReport(req.query)
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
