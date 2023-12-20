import { superUserCrud } from "../models/super.user.js";
import { encryptPassword, token } from "./auth.js";
export const login = (req, res) => {
    const { username, password } = req.body;
    superUserCrud.findUser({ username })
        .then((user) => {
        // If user is not found return error
        if (!user) {
            return res.status(500).json({
                status: false,
                error: {
                    message: `Could not find any user with username: ${username}`,
                },
            });
        }
        const isSecured = encryptPassword(password);
        // return error, if the payload does not match with the secured password
        if (user.password !== isSecured) {
            return res.status(400).json({
                status: false,
                error: {
                    message: 'Provided username and password did not match'
                },
            });
        }
        // Generate an Access Token for the user
        const _token = token(user.username, user.id);
        return res.status(200).json({
            status: true,
            data: {
                user: user === null || user === void 0 ? void 0 : user.toJSON(),
                token: _token,
            },
        });
    })
        .catch((err) => {
        return res.status(500).json({
            statue: false,
            error: err,
        });
    });
};
//# sourceMappingURL=super.user.login.controller.js.map