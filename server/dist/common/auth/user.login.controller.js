import { userCrud } from '../models/user.js';
import { auth } from './auth.js';
import { userLogger } from '../../engine/logging.js';
export const userAuth = {
    login: (req, res, next) => {
        const { username, password } = req.body;
        userCrud.findUser({ username })
            .then((user) => {
            // If user is not found return error
            if (!user) {
                userLogger.error(new Error(`Could not find any user with username: ${username}`));
                return res.status(400).json({
                    status: false,
                    error: {
                        message: `Could not find any user with username: ${username}`,
                    },
                });
            }
            const isSecured = auth.encryptPassword(password);
            // return error, if the provided password does not match with the secured password.
            if (user.password !== isSecured) {
                userLogger.error(new Error(`User: ${user.username} couldn't provide a valid password`));
                return res.status(400).json({
                    status: false,
                    error: {
                        message: `provided username and password did not match`
                    },
                });
            }
            // Generate an Access Token for the user
            const _token = auth.token(user.username, user.userId);
            req.session.regenerate((err) => {
                if (err) {
                    userLogger.error(new Error(err));
                    return next(err);
                }
                ;
                req.session.token = _token;
                req.session.save((err) => {
                    if (err) {
                        userLogger.error(new Error(err));
                        return next(err);
                    }
                    ;
                    userLogger.alert(`user: ${user.userId} just signed in`);
                    return res.status(200).json({
                        status: true,
                        user: user.toJSON(),
                    });
                });
            });
        })
            .catch((err) => {
            userLogger.error(new Error(err));
            return res.status(500).json({
                status: false,
                error: err,
            });
        });
    },
    logout: (req, res, next) => {
        req.session.destroy((err) => {
            if (err) {
                userLogger.error(new Error(err));
                return next(err);
            }
            ;
            userLogger.alert(`user: ${req.user.userId} just logged out`);
            return res.status(200).json({
                status: true,
                message: 'You have successfully logged out',
            });
        });
    }
};
//# sourceMappingURL=user.login.controller.js.map