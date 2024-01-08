import { superUserCrud } from "../models/super.user.js";
import { auth } from "./auth.js";
export const superAuth = {
    login: (req, res, next) => {
        const { username, password } = req.body;
        superUserCrud.findUser({ username })
            .then((user) => {
            // If user is not found return error
            if (!user) {
                return res.status(400).json({
                    status: false,
                    error: {
                        message: `Could not find any user with username: ${username}`,
                    },
                });
            }
            const isSecured = auth.encryptPassword(password);
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
            const _token = auth.token(user.username, user.superuserId);
            req.session.regenerate((err) => {
                if (err)
                    return next(err);
                req.session.token = _token;
                req.session.save((err) => {
                    if (err)
                        return next(err);
                    return res.status(200).json({
                        status: true,
                        user: user.toJSON(),
                    });
                });
            });
        })
            .catch((err) => {
            return res.status(500).json({
                statue: false,
                error: err,
            });
        });
    }
};
//# sourceMappingURL=super.user.login.controller.js.map