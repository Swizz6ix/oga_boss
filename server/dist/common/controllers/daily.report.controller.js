import { dailyRptCrud } from "../models/daily.report.js";
import { user } from "../middlewares/user.middleware.js";
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
        dailyRptCrud.findReport({ reportId: reportId })
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
    getAllReport: (req, res) => {
        const { user: { userId } } = req;
        user._user_id(userId)
            .then((id) => {
            dailyRptCrud.findAllReport({ superuserId: id })
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
    deleteReport: (req, res) => {
        const { params: { reportId } } = req;
        dailyRptCrud.deleteReport({ reportId: reportId })
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