import { dailyRptCrud } from "../models/daily.report.js";
export const dailyReport = {
    addReport: (req, res) => {
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
    getReport: (req, res) => {
        const { params: { reportId } } = req;
        dailyRptCrud.findReport({ id: reportId })
            .then((report) => {
            return res.status(200).json({
                status: true,
                data: report === null || report === void 0 ? void 0 : report.toJSON(),
            });
        })
            .catch((err) => {
            return res.status(500).json({
                status: false,
                error: err,
            });
        });
    },
    deleteReport: (req, res) => {
        const { params: { id: reportId } } = req;
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
};
//# sourceMappingURL=daily.report.controller.js.map