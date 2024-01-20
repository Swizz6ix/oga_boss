var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { superUserCrud } from '../models/super.user.js';
import { logging } from '../../engine/logging.js';
import { user } from '../middlewares/user.middleware.js';
export const superUserController = {
    getUser: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const reqId = req.user.userId;
        const { params: { userId } } = req;
        const log = logging.userLogs(userId);
        if (reqId !== userId) {
            log.warn(`User: ${reqId} tried to access endpoint associated with User ${userId}`);
            return res.status(500).json({
                status: false,
                error: `User ${reqId} does not have the required permission to perform this operation.`,
            });
        }
        superUserCrud.findUser({ superuserId: userId })
            .then((user) => {
            log.info(`Superuser ${user === null || user === void 0 ? void 0 : user.superuserId} retrieved by ${reqId}`);
            return res.status(200).json({
                status: true,
                data: user === null || user === void 0 ? void 0 : user.toJSON(),
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
    getUsers: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const reqId = req.user.userId;
        const { params: { userId } } = req;
        const _superuserId = yield user._user_id(reqId);
        const log = logging.userLogs(userId);
        if (_superuserId !== userId) {
            log.warn(`User: ${reqId} tried to retrieve all Users in ${userId}`);
            return res.status(500).json({
                status: false,
                error: `User ${reqId} does not have the required permission to perform this operation.`,
            });
        }
        superUserCrud.findUser({ superuserId: userId })
            .then((user) => {
            user === null || user === void 0 ? void 0 : user.getUsers().then((users) => {
                log.info(`All users in the server ${user.superuserId} retrieved by User ${req.user.userId}`);
                return res.status(200).json({
                    status: true,
                    users: users,
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
    }),
    getUsersCount: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const reqId = req.user.userId;
        const { params: { userId } } = req;
        const _superuserId = yield user._user_id(reqId);
        const log = logging.userLogs(userId);
        if (_superuserId !== userId) {
            log.warn(`User: ${reqId} tried to retrieve all Users in ${userId}`);
            return res.status(500).json({
                status: false,
                error: `User ${reqId} does not have the required permission to perform this operation.`,
            });
        }
        superUserCrud.findUser({ superuserId: userId })
            .then((user) => {
            user === null || user === void 0 ? void 0 : user.countUsers().then((users) => {
                log.info(`Total number of users in server ${user.superuserId} retrieved by ${req.user.userId}`);
                return res.status(200).json({
                    status: true,
                    totalNumberOfUsers: users,
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
    }),
    getDepartments: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const reqId = req.user.userId;
        const { params: { userId } } = req;
        const _superuserId = yield user._user_id(reqId);
        const log = logging.userLogs(userId);
        if (_superuserId !== userId) {
            log.warn(`User: ${reqId} tried to retrieve all Users in ${userId}`);
            return res.status(500).json({
                status: false,
                error: `User ${reqId} does not have the required permission to perform this operation.`,
            });
        }
        superUserCrud.findUser({ superuserId: userId })
            .then((user) => {
            user === null || user === void 0 ? void 0 : user.getDepartments().then((dept) => {
                log.info(`All departments in server ${user.superuserId} retrieved by user ${req.user.userId}`);
                return res.status(200).json({
                    status: true,
                    dept: dept,
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
    }),
    getDepartMentsCount: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const reqId = req.user.userId;
        const { params: { userId } } = req;
        const _superuserId = yield user._user_id(reqId);
        const log = logging.userLogs(userId);
        if (_superuserId !== userId) {
            log.warn(`User: ${reqId} tried to retrieve all Users in ${userId}`);
            return res.status(500).json({
                status: false,
                error: `User ${reqId} does not have the required permission to perform this operation.`,
            });
        }
        superUserCrud.findUser({ superuserId: userId })
            .then((user) => {
            user === null || user === void 0 ? void 0 : user.countDepartments().then((departments) => {
                log.info(`Total number of Departments in server ${user.superuserId} retrieved by ${reqId}`);
                return res.status(200).json({
                    status: true,
                    totalNumberOfDepartments: departments,
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
    }),
    getTasks: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const reqId = req.user.userId;
        const { params: { userId } } = req;
        const _superuserId = yield user._user_id(reqId);
        const log = logging.userLogs(userId);
        if (_superuserId !== userId) {
            log.warn(`User: ${reqId} tried to retrieve all Users in ${userId}`);
            return res.status(500).json({
                status: false,
                error: `User ${reqId} does not have the required permission to perform this operation.`,
            });
        }
        superUserCrud.findUser({ superuserId: userId })
            .then((user) => {
            user === null || user === void 0 ? void 0 : user.getTasks().then((tasks) => {
                log.info(`All tasks in server ${user.superuserId} retrieved by User ${req.user.userId}`);
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
    }),
    getTasksCount: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const reqId = req.user.userId;
        const { params: { userId } } = req;
        const _superuserId = yield user._user_id(reqId);
        const log = logging.userLogs(userId);
        if (_superuserId !== userId) {
            log.warn(`User: ${reqId} tried to retrieve all Users in ${userId}`);
            return res.status(500).json({
                status: false,
                error: `User ${reqId} does not have the required permission to perform this operation.`,
            });
        }
        superUserCrud.findUser({ superuserId: userId })
            .then((user) => {
            user === null || user === void 0 ? void 0 : user.countTasks().then((tasks) => {
                log.info(`Total number of tasks in server ${user.superuserId} retrieved by ${req.user.userId}`);
                return res.status(200).json({
                    status: true,
                    totalNumberOfTasks: tasks,
                });
            }).catch((err) => {
                log.error(new Error(err));
                return res.status(200).json({
                    status: true,
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
        const { params: { userId }, body: payload, } = req;
        const _user = yield superUserCrud.findUser({ superuserId: userId });
        const log = logging.userLogs(String(_user === null || _user === void 0 ? void 0 : _user.superuserId));
        if (reqId !== userId) {
            log.warn(`User ${reqId} tried to perform an update operation on User ${userId}.`);
            return res.status(500).json({
                status: false,
                error: `User ${reqId} does not have the required permission to perform this operation.`,
            });
        }
        // If the payload doesn't have any keys, return error
        if (!Object.keys(payload).length) {
            log.error(new Error('No update provided'));
            return res.status(400).json({
                status: false,
                error: {
                    message: 'Body is empty, hence cannot update the user',
                },
            });
        }
        superUserCrud.updateUser({ superuserId: userId }, payload)
            .then(() => {
            return superUserCrud.findUser({ superuserId: userId });
        })
            .then((user) => {
            log.info(`Update on Superuser ${user === null || user === void 0 ? void 0 : user.superuserId} performed by ${reqId}`);
            return res.status(200).json({
                status: true,
                data: user === null || user === void 0 ? void 0 : user.toJSON(),
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
        const _user = yield superUserCrud.findUser({ superuserId: userId });
        const log = logging.userLogs(String(_user === null || _user === void 0 ? void 0 : _user.superuserId));
        if (reqId !== userId) {
            log.warn(`User ${reqId} tried to delete User ${userId}`);
            return res.status(500).json({
                status: false,
                error: `This endpoint is above the pay grad of user ${reqId}`,
            });
        }
        superUserCrud.deleteUser({ superuserId: userId })
            .then((numberOfUsersDeleted) => {
            log.info(`Superuser ${userId} was deleted by User ${reqId}`);
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
    }),
};
//# sourceMappingURL=super.user.controller.js.map