var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { superUserCrud } from '../models/super.user.js';
import { userCrud } from '../models/user.js';
import { logging } from '../../engine/logging.js';
import { user as _user } from './user.middleware.js';
export const permission = {
    has: (role) => {
        return (req, res, next) => {
            const { user: { userId }, } = req;
            superUserCrud.findUser({ superuserId: userId })
                .then((user) => {
                const supRole = user === null || user === void 0 ? void 0 : user.role;
                let log = logging.userLogs(String(user === null || user === void 0 ? void 0 : user.superuserId));
                // if user does not exist return forbidden error
                if (!user) {
                    try {
                        userCrud.findUser({ userId: userId })
                            .then((user) => {
                            log = logging.userLogs(String(user === null || user === void 0 ? void 0 : user.superuserId));
                            if (!user) {
                                logging.authLogger.warn(`An unknown User ${userId} tried to access the endpoint ${req.originalUrl}`);
                                return res.status(403).json({
                                    status: false,
                                    error: 'Invalid access credentials, please login again'
                                });
                            }
                            // Throw forbidden error, if user does not posses the required role
                            const userRole = user.role;
                            if (userRole !== role) {
                                log.warn(`User: ${user.userId} tried to access the endpoint ${req.originalUrl}`);
                                return res.status(403).json({
                                    status: false,
                                    error: `You do not have the required permission to perform this operation.`
                                });
                            }
                            ;
                            log.info(`User: ${user.userId} accessed the endpoint ${req.originalUrl} as an ${role}`);
                            next();
                        });
                    }
                    catch (error) {
                        logging.authLogger.error(new Error('An uncaught error'));
                        res.status(403).json({
                            status: false,
                            error: error,
                        });
                    }
                }
                else {
                    // Throw forbidden error, if user does not posses the required role
                    if (supRole !== role) {
                        log.warn(`User: ${user.superuserId} tried to access the endpoint ${req.originalUrl}`);
                        return res.status(403).json({
                            status: false,
                            error: `You do not have the required permission to perform this operation.`
                        });
                    }
                    ;
                    log.info(`User: ${user.superuserId} accessed the endpoint ${req.originalUrl} as an ${role}`);
                    next();
                }
            })
                .catch((err) => {
                logging.authLogger.error(new Error('An uncaught error'));
                return res.status(400).json({
                    status: false,
                    error: err,
                });
            });
        };
    },
    userActivity: (access) => {
        return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
            const { user: { userId } } = req;
            const _superuserId = yield _user._user_id(userId);
            const log = logging.userLogs(String(_superuserId));
            try {
                const user = yield userCrud.findUser({ userId: userId });
                if ((user === null || user === void 0 ? void 0 : user.vacation) === access) {
                    log.warn(`User ${userId} tried to access url: ${req.originalUrl}`);
                    return res.status(500).json({
                        status: false,
                        error: `User ${userId} cannot access information, contact an admin.`
                    });
                }
                next();
            }
            catch (err) {
                log.error(new Error(`server error`));
                return res.status(500).json({
                    status: false,
                    error: err,
                });
            }
            ;
        });
    }
};
//# sourceMappingURL=check.permission.middleware.js.map