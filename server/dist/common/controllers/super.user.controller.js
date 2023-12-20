import { superUserCrud } from "../models/super.user";
export const superUserController = {
    getUser: (req, res) => {
        const { params: { userId } } = req;
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
    updateUser: (req, res) => {
        const { params: { userId }, body: payload, } = req;
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
        const { params: { id: userId } } = req;
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