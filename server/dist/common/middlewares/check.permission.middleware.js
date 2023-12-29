import { superUserCrud } from '../models/super.user.js';
import { userCrud } from '../models/user.js';
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
                                return res.status(403).json({
                                    status: false,
                                    error: 'Invalid access token provided, please login again now'
                                });
                            }
                            const userRole = user.role;
                            if (userRole !== role) {
                                return res.status(403).json({
                                    status: false,
                                    error: `You need to be a ${role} to access this endpoint.`
                                });
                            }
                            next();
                        });
                    }
                    catch (error) {
                        res.status(403).json({
                            status: false,
                            error: error,
                        });
                    }
                }
                else {
                    // Throw forbidden error, if user does not posses the required role
                    if (supRole !== role) {
                        return res.status(403).json({
                            status: false,
                            error: `You need to be a ${role} to access this endpoint.`
                        });
                    }
                    next();
                }
            })
                .catch((err) => {
                return res.status(400).json({
                    status: false,
                    error: err,
                });
            });
        };
    },
};
//# sourceMappingURL=check.permission.middleware.js.map