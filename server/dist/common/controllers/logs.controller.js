var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { loggerCrud } from "../models/logger.js";
import { Op } from "sequelize";
import { superUserCrud } from "../models/super.user.js";
import { user } from "../middlewares/user.middleware.js";
import { logging } from "../../engine/logging.js";
export const logController = {
    getAllLogs: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const reqId = req.user.userId;
        const _user = yield user._user_id(reqId);
        const _superuserId = yield superUserCrud.findUser({ superuserId: reqId });
        const log = logging.userLogs(String(_user));
        if (reqId !== (_superuserId === null || _superuserId === void 0 ? void 0 : _superuserId.superuserId)) {
            log.warn(`User ${reqId} tried to access all logs`);
            return res.status(403).json({
                status: false,
                error: 'You do not have the required permission to access this information',
            });
        }
        loggerCrud.getAllLogs({
            metadata: {
                [Op.substring]: reqId
            }
        })
            .then((logs) => {
            log.info(`superuser ${reqId} accessed all logs`);
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
    }),
    getAllLevels: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const reqId = req.user.userId;
        const _userId = yield user._user_id(reqId);
        const _superuser = yield superUserCrud.findUser({ superuserId: reqId });
        const log = logging.userLogs(String(_userId));
        if (reqId !== (_superuser === null || _superuser === void 0 ? void 0 : _superuser.superuserId)) {
            log.warn(`User ${reqId} tried to access all logs`);
            return res.status(403).json({
                status: false,
                error: `You do not have the required permission to access this information`
            });
        }
        const { params: { level } } = req;
        loggerCrud.getAllLogs({
            metadata: {
                [Op.substring]: reqId
            },
            level: level
        })
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
        });
    }),
    getLog: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const reqId = req.user.userId;
        const _user = yield user._user_id(reqId);
        const _superuser = yield superUserCrud.findUser({ superuserId: reqId });
        const log = logging.userLogs(String(_user));
        const { params: { logId }, } = req;
        if (reqId !== (_superuser === null || _superuser === void 0 ? void 0 : _superuser.superuserId)) {
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
                data: logs === null || logs === void 0 ? void 0 : logs.toJSON(),
            });
        })
            .catch((err) => {
            return res.status(500).json({
                status: false,
                error: err,
            });
        });
    }),
    deleteLogs: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const reqId = req.user.userId;
        console.log('we', reqId);
        const _user = yield user._user_id(reqId);
        const _superuser = yield superUserCrud.findUser({ superuserId: reqId });
        const log = logging.userLogs(String(_user));
        const { params: { logId }, } = req;
        if (reqId !== (_superuser === null || _superuser === void 0 ? void 0 : _superuser.superuserId)) {
            log.warn(`User ${reqId} tried to delete log ${logId}`);
            return res.status(403).json({
                status: false,
                error: `You don't have the required permission to complete this operation`
            });
        }
        console.log('see', logId, reqId);
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
    }),
};
//# sourceMappingURL=logs.controller.js.map