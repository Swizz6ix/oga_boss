import { userCrud } from '../models/user.js';
import { auth } from './auth.js';
import { logging } from '../../engine/logging.js';
import { user } from '../middlewares/user.middleware.js';
export const userAuth = {
    login: (req, res, next) => {
        const { username, password } = req.body;
        const genLog = logging.userLogs('user-service');
        userCrud.findUser({ username })
            .then((user) => {
            const logger = logging.userLogs(String(user === null || user === void 0 ? void 0 : user.superuserId));
            // If user is not found return error
            if (!user) {
                genLog.error(new Error(`Could not find any user with username: ${username}`));
                return res.status(401).json({
                    status: false,
                    error: {
                        message: `username and password did not match`,
                    },
                });
            }
            const isSecured = auth.encryptPassword(password);
            // return error, if the provided password does not match with the secured password.
            if (user.password !== isSecured) {
                logger.error(new Error(`User: ${user.username} couldn't provide a valid password`));
                return res.status(401).json({
                    status: false,
                    error: {
                        message: `username and password did not match.`
                    },
                });
            }
            // Generate an Access Token for the user
            const _token = auth.token(user.username, user.userId);
            req.session.regenerate((err) => {
                if (err) {
                    genLog.error(new Error(err));
                    return next(err);
                }
                ;
                req.session.token = _token;
                req.session.save((err) => {
                    if (err) {
                        genLog.error(new Error(err));
                        return next(err);
                    }
                    ;
                    logger.alert(`user: ${user.userId} just signed in`);
                    return res.status(200).json({
                        status: true,
                        user: user.toJSON(),
                    });
                });
            });
        })
            .catch((err) => {
            genLog.error(new Error(err));
            return res.status(500).json({
                status: false,
                error: err,
            });
        });
    },
    logout: (req, res, next) => {
        const loginId = user._user_id(req.user.userId);
        const genLog = logging.userLogs('user-service');
        req.session.destroy((err) => {
            if (err) {
                genLog.error(new Error(err));
                return next(err);
            }
            ;
            loginId.then((id) => {
                const log = logging.userLogs(String(id));
                log.alert(`user: ${req.user.userId} just logged out`);
            })
                .catch((err) => {
                genLog.error(new Error(err));
                return res.status(401).json({
                    status: false,
                    error: err,
                });
            });
            return res.status(200).json({
                status: true,
                message: 'You have successfully logged out',
            });
        });
    }
};
//# sourceMappingURL=user.login.controller.js.map