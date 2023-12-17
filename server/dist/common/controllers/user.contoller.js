import { userCrud } from "../models/user";
export const userController = {
    addUser: (req, res) => {
        const payload = req.body;
        userCrud.createUser(Object.assign(payload))
            .then((user) => {
            return res.status(201).json({
                user: user.toJSON(),
            });
        })
            .catch((err) => {
            return res.status(500).json({
                status: false,
                error: err,
            });
        });
    },
    getUser: (req, res) => {
        const { params: { userId } } = req;
        userCrud.findUser({ id: userId })
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
    getAllUser: (req, res) => {
        userCrud.findAllUsers(req.query)
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
        userCrud.updateUser({ id: userId }, payload)
            .then(() => {
            return userCrud.findUser({ id: userId });
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
        userCrud.deleteUser({ id: userId })
            .then((numberOfUserDeleted) => {
            return res.status(200).json({
                status: true,
                data: { numberOfEntriesDeleted: numberOfUserDeleted },
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
//# sourceMappingURL=user.contoller.js.map