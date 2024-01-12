import { superUserCrud } from '../models/super.user.js';
import { controllerLogger } from '../../engine/logging.js';
export const superUserController = {
    getUser: (req, res) => {
        const reqId = req.user.userId;
        const { params: { userId } } = req;
        if (reqId !== userId) {
            controllerLogger.warn(`User: ${reqId} tried to access endpoint associated with User ${userId}`);
            return res.status(500).json({
                status: false,
                error: `This endpoint is above the pay grad of user ${reqId}`
            });
        }
        superUserCrud.findUser({ superuserId: userId })
            .then((user) => {
            controllerLogger.info(`Superuser ${user === null || user === void 0 ? void 0 : user.superuserId} retrieved by ${reqId}`);
            return res.status(200).json({
                status: true,
                data: user === null || user === void 0 ? void 0 : user.toJSON(),
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
    getUsers: (req, res) => {
        const { params: { userId } } = req;
        superUserCrud.findUser({ superuserId: userId })
            .then((user) => {
            user === null || user === void 0 ? void 0 : user.getUsers().then((users) => {
                controllerLogger.info(`All users in the server ${user.superuserId} retrieved by User ${req.user.userId}`);
                return res.status(200).json({
                    status: true,
                    users: users,
                });
            }).catch((err) => {
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
    getUsersCount: (req, res) => {
        const { params: { userId } } = req;
        superUserCrud.findUser({ superuserId: userId })
            .then((user) => {
            user === null || user === void 0 ? void 0 : user.countUsers().then((users) => {
                controllerLogger.info(`Total number of users in server ${user.superuserId} retrieved by ${req.user.userId}`);
                return res.status(200).json({
                    status: true,
                    totalNumberOfUsers: users,
                });
            }).catch((err) => {
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
    getDepartments: (req, res) => {
        const { params: { userId } } = req;
        superUserCrud.findUser({ superuserId: userId })
            .then((user) => {
            user === null || user === void 0 ? void 0 : user.getDepartments().then((dept) => {
                controllerLogger.info(`All departments in server ${user.superuserId} retrieved by user ${req.user.userId}`);
                return res.status(200).json({
                    status: true,
                    dept: dept,
                });
            }).catch((err) => {
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
    getDepartMentsCount: (req, res) => {
        const reqId = req.user.userId;
        const { params: { userId } } = req;
        superUserCrud.findUser({ superuserId: userId })
            .then((user) => {
            user === null || user === void 0 ? void 0 : user.countDepartments().then((departments) => {
                controllerLogger.info(`Total number of Departments in server ${user.superuserId} retrieved by ${reqId}`);
                return res.status(200).json({
                    status: true,
                    totalNumberOfDepartments: departments,
                });
            }).catch((err) => {
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
    getTasks: (req, res) => {
        const { params: { userId } } = req;
        superUserCrud.findUser({ superuserId: userId })
            .then((user) => {
            user === null || user === void 0 ? void 0 : user.getTasks().then((tasks) => {
                controllerLogger.info(`All tasks in server ${user.superuserId} retrieved by User ${req.user.userId}`);
                return res.status(200).json({
                    status: true,
                    tasks: tasks,
                });
            }).catch((err) => {
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
    getTasksCount: (req, res) => {
        const { params: { userId } } = req;
        superUserCrud.findUser({ superuserId: userId })
            .then((user) => {
            user === null || user === void 0 ? void 0 : user.countTasks().then((tasks) => {
                controllerLogger.info(`Total number of tasks in server ${user.superuserId} retrieved by ${req.user.userId}`);
                return res.status(200).json({
                    status: true,
                    totalNumberOfTasks: tasks,
                });
            }).catch((err) => {
                controllerLogger.error(new Error(err));
                return res.status(200).json({
                    status: true,
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
    updateUser: (req, res) => {
        const reqId = req.user.userId;
        const { params: { userId }, body: payload, } = req;
        if (reqId !== userId) {
            controllerLogger.warn(`User ${reqId} tried to access endpoint associated with User: ${userId}`);
            return res.status(500).json({
                status: false,
                error: `This endpoint is above the pay grad of user ${reqId}`
            });
        }
        // If the payload doesn't have any keys, return error
        if (!Object.keys(payload).length) {
            controllerLogger.error(new Error('No update provided'));
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
            controllerLogger.info(`Update on Superuser ${user === null || user === void 0 ? void 0 : user.superuserId} performed by ${reqId}`);
            return res.status(200).json({
                status: true,
                data: user === null || user === void 0 ? void 0 : user.toJSON(),
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
    deleteUser: (req, res) => {
        const reqId = req.user.userId;
        const { params: { userId } } = req;
        if (reqId !== userId) {
            controllerLogger.warn(`User ${reqId} tried to delete User ${userId}`);
            return res.status(500).json({
                status: false,
                error: `This endpoint is above the pay grad of user ${reqId}`,
            });
        }
        superUserCrud.deleteUser({ superuserId: userId })
            .then((numberOfUsersDeleted) => {
            controllerLogger.info(`Superuser ${userId} was deleted by User ${reqId}`);
            return res.status(200).json({
                status: true,
                data: { numberOfEntriesDeleted: numberOfUsersDeleted },
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
};
//# sourceMappingURL=super.user.controller.js.map