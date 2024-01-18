import pkg from "jsonwebtoken";
import { configs } from "../../config.js";
import { user as service } from "./user.middleware.js";
import { logging } from "../../engine/logging.js";
export const authenticated = {
    authSession: (req, res, next) => {
        var _a;
        if (!req.session.token) {
            logging.authLogger.warn(new Error(`Unknown User tried to access ${req.originalUrl}`));
            return res.status(401).json({
                status: false,
                error: `Pls login a valid user`,
            });
        }
        const _token = (_a = req.session.token) !== null && _a !== void 0 ? _a : ""; // returns the right side if value is null or undefined
        const { verify } = pkg;
        verify(_token, configs.jwtSecret, (err, user) => {
            if (err) {
                logging.authLogger.error(new Error(err));
                return res.status(403).json({
                    status: false,
                    error: 'User cannot be verified, pls login again',
                });
            }
            ;
            const serviceId = service._user_id(user.userId);
            serviceId
                .then((id) => {
                const log = logging.userLogs(String(id));
                log.info(`User: ${user.userId} just got authenticated`);
            });
            // authLogger.info(`User: ${user.userId} verified to access the endpoint ${req.originalUrl}`);
            req.user = user;
        });
        next();
    }
};
//# sourceMappingURL=isAuthenticated.middleware.js.map