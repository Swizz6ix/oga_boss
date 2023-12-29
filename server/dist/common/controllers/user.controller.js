import { userCrud } from '../models/user.js';
import { user } from '../middlewares/user.middleware.js';
import { configs } from '../../config.js';
const _role = configs.roles.ADMIN;
export const userController = {
    getUser: (req, res) => {
        const reqId = req.user.userId;
        const { params: { userId } } = req;
        user.userIdentify(reqId, _role, userId)
            .then((params) => {
            userCrud.findUser({ userId: params })
                .then((user) => {
                return res.status(200).json({
                    status: true,
                    data: user === null || user === void 0 ? void 0 : user.toJSON(),
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
    getAllUsers: (req, res) => {
        const { user: { userId } } = req;
        user._user_id(userId)
            .then((id) => {
            userCrud.findAllUsers({ superuserId: id })
                .then((users) => {
                return res.status(200).json({
                    status: true,
                    data: users,
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
    getTasks: (req, res) => {
        const reqId = req.user.userId;
        const { params: { userId } } = req;
        user.userIdentify(reqId, _role, userId)
            .then((params) => {
            userCrud.findUser({ userId: params })
                .then((user) => {
                user === null || user === void 0 ? void 0 : user.getTasks().then((tasks) => {
                    return res.status(200).json({
                        status: true,
                        tasks: tasks,
                    });
                }).catch((err) => {
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
        })
            .catch((err) => {
            return res.status(500).json({
                status: false,
                error: err,
            });
        });
    },
    getTasksCount: (req, res) => {
        const reqId = req.user.userId;
        const { params: { userId } } = req;
        user.userIdentify(reqId, _role, userId)
            .then((params) => {
            userCrud.findUser({ userId: params })
                .then((user) => {
                user === null || user === void 0 ? void 0 : user.countTasks().then((tasks) => {
                    return res.status(200).json({
                        status: true,
                        totalNumberOfTasks: tasks,
                    });
                }).catch((err) => {
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
        });
    },
    getReports: (req, res) => {
        const reqId = req.user.userId;
        const { params: { userId } } = req;
        user.userIdentify(reqId, _role, userId)
            .then((params) => {
            userCrud.findUser({ userId: params })
                .then((user) => {
                user === null || user === void 0 ? void 0 : user.getDailyRpts().then((reports) => {
                    return res.status(200).json({
                        status: true,
                        reports: reports,
                    });
                }).catch((err) => {
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
        });
    },
    getReportsCount: (req, res) => {
        const reqId = req.user.userId;
        const { params: { userId } } = req;
        user.userIdentify(reqId, _role, userId)
            .then((params) => {
            userCrud.findUser({ userId: params })
                .then((user) => {
                user === null || user === void 0 ? void 0 : user.countDailyRpts().then((reports) => {
                    return res.status(200).json({
                        status: true,
                        totalNumberOfReports: reports,
                    });
                }).catch((err) => {
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
        })
            .catch((err) => {
            return res.status(500).json({
                status: false,
                error: err,
            });
        });
    },
    getChats: (req, res) => {
        const reqId = req.user.userId;
        const { params: { userId }, } = req;
        user.userIdentify(reqId, _role, userId)
            .then((params) => {
            userCrud.findUser({ userId: params })
                .then((user) => {
                user === null || user === void 0 ? void 0 : user.getChatRooms().then((chats) => {
                    return res.status(200).json({
                        status: true,
                        chats: chats,
                    });
                }).catch((err) => {
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
        })
            .catch((err) => {
            return res.status(500).json({
                status: false,
                error: err,
            });
        });
    },
    getChatsCount: (req, res) => {
        const reqId = req.user.userId;
        const { params: { userId }, } = req;
        user.userIdentify(reqId, _role, userId)
            .then((params) => {
            userCrud.findUser({ userId: params })
                .then((user) => {
                user === null || user === void 0 ? void 0 : user.countChatRooms().then((chats) => {
                    return res.status(200).json({
                        status: true,
                        totalNumberOfChats: chats,
                    });
                }).catch((err) => {
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
        })
            .catch((err) => {
            return res.status(500).json({
                status: false,
                error: err,
            });
        });
    },
    updateUser: (req, res) => {
        const { params: { userId }, body: payload } = req;
        // if the payload does not have any keys, return an error
        if (!Object.keys(payload).length) {
            return res.status(400).json({
                status: false,
                error: {
                    message: 'Body is empty, hence cannot update the user',
                },
            });
        }
        userCrud.updateUser({ userId: userId }, payload)
            .then(() => {
            return userCrud.findUser({ userId: userId });
        })
            .then((user) => {
            return res.status(200).json({
                status: true,
                data: user === null || user === void 0 ? void 0 : user.toJSON()
            });
        })
            .catch((err) => {
            return res.status(500).json({
                status: false,
                error: err,
            });
        });
    },
    deleteUser: (req, res) => {
        const { params: { userId } } = req;
        userCrud.deleteUser({ userId: userId })
            .then((numberOfUsersDeleted) => {
            return res.status(200).json({
                status: true,
                data: { numberOfEntriesDeleted: numberOfUsersDeleted },
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
//# sourceMappingURL=user.controller.js.map