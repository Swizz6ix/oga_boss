import { superUserCrud } from '../models/super.user.js';
import { userCrud } from '../models/user.js';
import { authLogger } from '../../engine/logging.js';
export const permission = {
    has: (role) => {
        return (req, res, next) => {
            const { user: { userId }, } = req;
            superUserCrud.findUser({ superuserId: userId })
                .then((user) => {
                const supRole = user === null || user === void 0 ? void 0 : user.role;
                // if user does not exist return forbidden error
                if (!user) {
                    try {
                        userCrud.findUser({ userId: userId })
                            .then((user) => {
                            if (!user) {
                                authLogger.warn(`User ${userId} is  not a valid user.`);
                                return res.status(403).json({
                                    status: false,
                                    error: 'Invalid access credentials, please login again'
                                });
                            }
                            // Throw forbidden error, if user does not posses the required role
                            const userRole = user.role;
                            if (userRole !== role) {
                                authLogger.warn(`User: ${user.userId} must be an ${role} to access endpoint`);
                                return res.status(403).json({
                                    status: false,
                                    error: `You need to be an ${role} to access this endpoint.`
                                });
                            }
                            ;
                            authLogger.info(`User: ${user.userId} accessed the endpoint as an ${role}`);
                            next();
                        });
                    }
                    catch (error) {
                        authLogger.error(new Error('An uncaught error'));
                        res.status(403).json({
                            status: false,
                            error: error,
                        });
                    }
                }
                else {
                    // Throw forbidden error, if user does not posses the required role
                    if (supRole !== role) {
                        authLogger.warn(`User: ${user.superuserId} must be an ${role} to access endpoint`);
                        return res.status(403).json({
                            status: false,
                            error: `You need to be a ${role} to access this endpoint.`
                        });
                    }
                    ;
                    authLogger.info(`User: ${user.superuserId} accessed the endpoint as an ${role}`);
                    next();
                }
            })
                .catch((err) => {
                authLogger.error(new Error('An uncaught error'));
                return res.status(400).json({
                    status: false,
                    error: err,
                });
            });
        };
    },
};
//# sourceMappingURL=check.permission.middleware.js.map