import pkg from "jsonwebtoken";
import { configs } from "../../config.js";
import { authLogger } from "../../engine/logging.js";
export const authenticated = {
    authSession: (req, res, next) => {
        var _a;
        if (!req.session.token) {
            authLogger.warn(new Error('session token does not exist'));
            return res.status(401).json({
                status: false,
                error: `Pls login a valid user`,
            });
        }
        const _token = (_a = req.session.token) !== null && _a !== void 0 ? _a : ""; // returns the right side if value is null or undefined
        const { verify } = pkg;
        verify(_token, configs.jwtSecret, (err, user) => {
            if (err) {
                authLogger.error(new Error(err));
                return res.status(403).json({
                    status: false,
                    error: 'User cannot be verified, pls login again',
                });
            }
            authLogger.info(`User: ${user.userId} verified`);
            req.user = user;
        });
        next();
    }
};
//# sourceMappingURL=isAuthenticated.middleware.js.map