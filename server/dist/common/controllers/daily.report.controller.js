var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { dailyRptCrud } from "../models/daily.report.js";
import { user } from "../middlewares/user.middleware.js";
import { logging } from "../../engine/logging.js";
export const dailyReport = {
    addReport: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const superuserId = yield user._user_id(req.user.userId);
        const log = logging.userLogs(String(superuserId));
        const payload = req.body;
        dailyRptCrud.newReport(Object.assign(payload))
            .then((report) => {
            log.info(`Report ${report.reportId} was just created by user ${req.user.userId}`);
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
    }),
    getReport: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const superuserId = yield user._user_id(req.user.userId);
        const log = logging.userLogs(String(superuserId));
        const { params: { reportId } } = req;
        dailyRptCrud.findReport({ reportId: reportId })
            .then((report) => {
            log.info(`Report ${reportId} was retrieved by user ${req.user.userId}`);
            return res.status(200).json({
                status: true,
                data: report === null || report === void 0 ? void 0 : report.toJSON(),
            });
        })
            .catch((err) => {
            log.error(new Error(err));
            return res.status(500).json({
                status: false,
                error: err,
            });
        });
    }),
    getAllReport: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { user: { userId } } = req;
        // Get all reports that exist only within a particular superuser
        const superuserId = yield user._user_id(userId);
        const log = logging.userLogs(String(superuserId));
        dailyRptCrud.findAllReport({ superuserId: superuserId })
            .then((reports) => {
            log.info(`All reports retrieved by user ${req.user.userId}`);
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
    }),
    deleteReport: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { params: { reportId } } = req;
        const report = yield dailyRptCrud.findReport({ reportId: reportId });
        const log = logging.userLogs(String(report === null || report === void 0 ? void 0 : report.superuserId));
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
    })
};
//# sourceMappingURL=daily.report.controller.js.map