import { superUserCrud } from '../models/super.user.js';
export const superUserController = {
    getUser: (req, res) => {
        const reqId = req.user.userId;
        const { params: { userId } } = req;
        if (reqId !== userId) {
            return res.status(500).json({
                status: false,
                error: `This endpoint is above the pay grad of user ${reqId}`
            });
        }
        superUserCrud.findUser({ id: userId })
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
    },
    getUsers: (req, res) => {
        const { params: { userId } } = req;
        superUserCrud.findUser({ id: userId })
            .then((user) => {
            user === null || user === void 0 ? void 0 : user.getUsers().then((users) => {
                return res.status(200).json({
                    status: true,
                    users: users,
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
    },
    getUsersCount: (req, res) => {
        const { params: { userId } } = req;
        superUserCrud.findUser({ id: userId })
            .then((user) => {
            user === null || user === void 0 ? void 0 : user.countUsers().then((users) => {
                return res.status(200).json({
                    status: true,
                    totalNumberOfUsers: users,
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
    },
    getDepartments: (req, res) => {
        const { params: { userId } } = req;
        superUserCrud.findUser({ id: userId })
            .then((user) => {
            user === null || user === void 0 ? void 0 : user.getDepartments().then((dept) => {
                return res.status(200).json({
                    status: true,
                    dept: dept,
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
    },
    getDepartMentsCount: (req, res) => {
        const { params: { userId } } = req;
        superUserCrud.findUser({ id: userId })
            .then((user) => {
            user === null || user === void 0 ? void 0 : user.countDepartments().then((departments) => {
                return res.status(200).json({
                    status: true,
                    totalNumberOfDepartments: departments,
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
    },
    getTasks: (req, res) => {
        const { params: { userId } } = req;
        superUserCrud.findUser({ id: userId })
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
    },
    getTasksCount: (req, res) => {
        const { params: { userId } } = req;
        superUserCrud.findUser({ id: userId })
            .then((user) => {
            user === null || user === void 0 ? void 0 : user.countTasks().then((tasks) => {
                return res.status(200).json({
                    status: true,
                    totalNumberOfTasks: tasks,
                });
            }).catch((err) => {
                return res.status(200).json({
                    status: true,
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
        const reqId = req.user.userId;
        const { params: { userId }, body: payload, } = req;
        if (reqId !== userId) {
            return res.status(500).json({
                status: false,
                error: `This endpoint is above the pay grad of user ${reqId}`
            });
        }
        // If the payload doesn't have any keys, return error
        if (!Object.keys(payload).length) {
            return res.status(400).json({
                status: false,
                error: {
                    message: 'Body is empty, hence cannot update the user',
                },
            });
        }
        superUserCrud.updateUser({ id: userId }, payload)
            .then(() => {
            return superUserCrud.findUser({ id: userId });
        })
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
    },
    deleteUser: (req, res) => {
        const reqId = req.user.userId;
        const { params: { id: userId } } = req;
        if (reqId !== userId) {
            return res.status(500).json({
                status: false,
                error: `This endpoint is above the pay grad of user ${reqId}`
            });
        }
        superUserCrud.deleteUser({ id: userId })
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
    },
};
//# sourceMappingURL=super.user.controller.js.map