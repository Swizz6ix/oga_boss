var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { userCrud } from '../models/user.js';
import { user } from '../middlewares/user.middleware.js';
import { configs } from '../../config.js';
import { logging } from '../../engine/logging.js';
import { auth } from '../auth/auth.js';
const _role = configs.roles.ADMIN;
export const userController = {
    getUser: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const reqId = req.user.userId;
        const _superuserId = yield user._user_id(reqId);
        const { params: { userId } } = req;
        const _user = yield user._user_id(userId);
        const log = logging.userLogs(String(_user));
        user.userIdentify(reqId, _role, userId)
            .then((params) => {
            userCrud.findUser({ userId: params })
                .then((user) => {
                if (_superuserId !== (user === null || user === void 0 ? void 0 : user.superuserId)) {
                    log.warn(`User ${reqId} tried access User ${userId} information on url: ${req.originalUrl}`);
                    return res.status(500).json({
                        status: false,
                        error: `User ${reqId} doesn't have the required permission for this info.`
                    });
                }
                log.info(`User: ${user === null || user === void 0 ? void 0 : user.userId} retrieved by ${reqId}.`);
                return res.status(200).json({
                    status: true,
                    data: user === null || user === void 0 ? void 0 : user.toJSON(),
                });
            })
                .catch((err) => {
                log.error(new Error(`User ${reqId} tried access ${req.originalUrl}.!! ${err}`));
                return res.status(500).json({
                    status: false,
                    error: err,
                });
            });
        })
            .catch((err) => {
            log.error(new Error(`User ${reqId} tried access ${req.originalUrl}.!! ${err}`));
            return res.status(500).json({
                status: false,
                error: err,
            });
        });
    }),
    getAllUsers: (req, res) => {
        const { user: { userId } } = req;
        user._user_id(userId)
            .then((id) => {
            const log = logging.userLogs(String(id));
            userCrud.findAllUsers({ superuserId: id })
                .then((users) => {
                log.info(`All users in server ${id} retrieved by ${userId}`);
                return res.status(200).json({
                    status: true,
                    data: users,
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
            .catch((err) => {
            logging.controllerLogger.error(new Error(err));
            return res.status(500).json({
                status: false,
                error: err,
            });
        });
    },
    getTasks: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const reqId = req.user.userId;
        const { params: { userId } } = req;
        const _superuserId = yield user._user_id(reqId);
        const _superuserId_ = yield user._user_id(userId);
        const log = logging.userLogs(String(_superuserId_));
        if (_superuserId !== _superuserId_) {
            log.warn(`User ${reqId} tried to access user ${userId} tasks. Url: ${req.originalUrl} `);
            return res.status(500).json({
                status: false,
                error: `User ${reqId} does not have the required permission to perform this operation`,
            });
        }
        user.userIdentify(reqId, _role, userId)
            .then((params) => {
            userCrud.findUser({ userId: params })
                .then((user) => {
                user === null || user === void 0 ? void 0 : user.getTasks().then((tasks) => {
                    log.info(`All tasks accessed by ${reqId}`);
                    return res.status(200).json({
                        status: true,
                        tasks: tasks,
                    });
                }).catch((err) => {
                    log.error(new Error(err));
                    return res.status(500).json({
                        status: false,
                        error: err,
                    });
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
            .catch((err) => {
            log.error(new Error(err));
            return res.status(500).json({
                status: false,
                error: err,
            });
        });
    }),
    getTasksCount: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const reqId = req.user.userId;
        const { params: { userId } } = req;
        const _superuserId = yield user._user_id(reqId);
        const _superuserId_ = yield user._user_id(userId);
        const log = logging.userLogs(String(_superuserId_));
        if (_superuserId !== _superuserId_) {
            log.warn(`User ${reqId} tried to access user ${userId} tasks. Url: ${req.originalUrl} `);
            return res.status(500).json({
                status: false,
                error: `User ${reqId} does not have the required permission to perform this operation`,
            });
        }
        user.userIdentify(reqId, _role, userId)
            .then((params) => {
            userCrud.findUser({ userId: params })
                .then((user) => {
                user === null || user === void 0 ? void 0 : user.countTasks().then((tasks) => {
                    log.info(`Total number of all tasks accessed by ${reqId}`);
                    return res.status(200).json({
                        status: true,
                        totalNumberOfTasks: tasks,
                    });
                }).catch((err) => {
                    log.error(new Error(err));
                    return res.status(500).json({
                        status: false,
                        error: err,
                    });
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
            .catch((err) => {
            log.error(new Error(err));
            return res.status(500).json({
                status: false,
                error: err,
            });
        });
    }),
    getReports: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const reqId = req.user.userId;
        const { params: { userId } } = req;
        const _superuserId = yield user._user_id(reqId);
        const _superuserId_ = yield user._user_id(userId);
        const log = logging.userLogs(String(_superuserId_));
        if (_superuserId !== _superuserId_) {
            log.warn(`User ${reqId} tried to access user ${userId} tasks. Url: ${req.originalUrl} `);
            return res.status(500).json({
                status: false,
                error: `User ${reqId} does not have the required permission to perform this operation`,
            });
        }
        user.userIdentify(reqId, _role, userId)
            .then((params) => {
            userCrud.findUser({ userId: params })
                .then((user) => {
                user === null || user === void 0 ? void 0 : user.getDailyRpts().then((reports) => {
                    log.info(`All daily reports accessed by ${reqId}`);
                    return res.status(200).json({
                        status: true,
                        reports: reports,
                    });
                }).catch((err) => {
                    log.error(new Error(err));
                    return res.status(500).json({
                        status: false,
                        error: err,
                    });
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
            .catch((err) => {
            log.error(new Error(err));
            return res.status(500).json({
                status: false,
                error: err,
            });
        });
    }),
    getReportsCount: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const reqId = req.user.userId;
        const { params: { userId } } = req;
        const _superuserId = yield user._user_id(reqId);
        const _superuserId_ = yield user._user_id(userId);
        const log = logging.userLogs(String(_superuserId_));
        if (_superuserId !== _superuserId_) {
            log.warn(`User ${reqId} tried to access user ${userId} tasks. Url: ${req.originalUrl} `);
            return res.status(500).json({
                status: false,
                error: `User ${reqId} does not have the required permission to perform this operation`,
            });
        }
        user.userIdentify(reqId, _role, userId)
            .then((params) => {
            userCrud.findUser({ userId: params })
                .then((user) => {
                const log = logging.userLogs(String(user === null || user === void 0 ? void 0 : user.superuserId));
                user === null || user === void 0 ? void 0 : user.countDailyRpts().then((reports) => {
                    log.info(`total number of reports accessed by ${reqId}`);
                    return res.status(200).json({
                        status: true,
                        totalNumberOfReports: reports,
                    });
                }).catch((err) => {
                    log.error(new Error(err));
                    return res.status(500).json({
                        status: false,
                        error: err,
                    });
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
            .catch((err) => {
            log.error(new Error(err));
            return res.status(500).json({
                status: false,
                error: err,
            });
        });
    }),
    getChats: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const reqId = req.user.userId;
        const { params: { userId }, } = req;
        const _superuserId = yield user._user_id(reqId);
        const _superuserId_ = yield user._user_id(userId);
        const log = logging.userLogs(String(_superuserId_));
        if (_superuserId !== _superuserId_) {
            log.warn(`User ${reqId} tried to access user ${userId} tasks. Url: ${req.originalUrl} `);
            return res.status(500).json({
                status: false,
                error: `User ${reqId} does not have the required permission to perform this operation`,
            });
        }
        user.userIdentify(reqId, _role, userId)
            .then((params) => {
            userCrud.findUser({ userId: params })
                .then((user) => {
                const log = logging.userLogs(String(user === null || user === void 0 ? void 0 : user.superuserId));
                user === null || user === void 0 ? void 0 : user.getChatRooms().then((chats) => {
                    log.info(`all chats accessed by ${reqId}`);
                    return res.status(200).json({
                        status: true,
                        chats: chats,
                    });
                }).catch((err) => {
                    log.error(new Error(err));
                    return res.status(500).json({
                        status: false,
                        error: err,
                    });
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
            .catch((err) => {
            log.error(new Error(err));
            return res.status(500).json({
                status: false,
                error: err,
            });
        });
    }),
    getChatsCount: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const reqId = req.user.userId;
        const { params: { userId }, } = req;
        const _superuserId = yield user._user_id(reqId);
        const _superuserId_ = yield user._user_id(userId);
        const log = logging.userLogs(String(_superuserId_));
        if (_superuserId !== _superuserId_) {
            log.warn(`User ${reqId} tried to access user ${userId} tasks. Url: ${req.originalUrl} `);
            return res.status(500).json({
                status: false,
                error: `User ${reqId} does not have the required permission to perform this operation`,
            });
        }
        user.userIdentify(reqId, _role, userId)
            .then((params) => {
            userCrud.findUser({ userId: params })
                .then((user) => {
                const log = logging.userLogs(String(user === null || user === void 0 ? void 0 : user.superuserId));
                user === null || user === void 0 ? void 0 : user.countChatRooms().then((chats) => {
                    log.info(`Total number of chats accessed by ${reqId}`);
                    return res.status(200).json({
                        status: true,
                        totalNumberOfChats: chats,
                    });
                }).catch((err) => {
                    log.error(new Error(err));
                    return res.status(500).json({
                        status: false,
                        error: err,
                    });
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
            .catch((err) => {
            log.error(new Error(err));
            return res.status(500).json({
                status: false,
                error: err,
            });
        });
    }),
    updateUser: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const reqId = req.user.userId;
        const _superuserId = yield user._user_id(reqId);
        const { params: { userId }, body: payload } = req;
        const _user = yield userCrud.findUser({ userId: userId });
        const log = logging.userLogs(String(_user === null || _user === void 0 ? void 0 : _user.superuserId));
        if (_superuserId !== (_user === null || _user === void 0 ? void 0 : _user.superuserId)) {
            log.warn(`An unknown user ${reqId} tried to update user ${userId}`);
            return res.status(500).json({
                status: false,
                error: `User ${reqId} don't have the required permission to perform this operation.`,
            });
        }
        if (reqId === userId) {
            log.warn(`User ${reqId} tried to update his own information`);
            return res.status(500).json({
                status: false,
                error: `User ${reqId} don't have the required permission to perform this operation.`,
            });
        }
        // if the payload does not have any keys, return an error
        if (!Object.keys(payload).length) {
            log.error(new Error('No update provided'));
            return res.status(400).json({
                status: false,
                error: {
                    message: 'update provided',
                },
            });
        }
        let updateInfo;
        if (payload.password) {
            const securedPassword = auth.encryptPassword(payload.password);
            updateInfo = Object.assign(Object.assign({}, payload), { password: securedPassword });
        }
        else {
            updateInfo = payload;
        }
        userCrud.updateUser({ userId: userId }, updateInfo)
            .then(() => {
            return userCrud.findUser({ userId: userId });
        })
            .then((user) => {
            log.info(`update on User ${user === null || user === void 0 ? void 0 : user.userId} performed by ${req.user.userId}`);
            return res.status(200).json({
                status: true,
                data: user === null || user === void 0 ? void 0 : user.toJSON()
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
    deleteUser: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const reqId = req.user.userId;
        const { params: { userId } } = req;
        const _user = yield userCrud.findUser({ userId: userId });
        const log = logging.userLogs(String(_user === null || _user === void 0 ? void 0 : _user.superuserId));
        if (reqId !== (_user === null || _user === void 0 ? void 0 : _user.superuserId)) {
            log.warn(`User ${reqId} tried to delete User ${userId}.`);
            return res.status(500).json({
                status: false,
                error: `User ${reqId} does not have the required permission to perform this operation`,
            });
        }
        userCrud.deleteUser({ userId: userId })
            .then((numberOfUsersDeleted) => {
            log.warn(`User: ${userId} deleted by ${req.user.userId}`);
            return res.status(200).json({
                status: true,
                data: { numberOfEntriesDeleted: numberOfUsersDeleted },
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
//# sourceMappingURL=user.controller.js.map