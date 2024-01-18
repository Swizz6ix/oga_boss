import { configs } from '../../config.js';
import { userCrud } from '../models/user.js';
import { auth } from './auth.js';
import { logging } from '../../engine/logging.js';
export const createUser = (req, res, next) => {
    const payload = req.body;
    const user = configs.roles.USER;
    let role = payload.role;
    let securedPassword = auth.encryptPassword(payload.password);
    const genLog = logging.userLogs('user-service');
    if (!role) {
        role = user;
    }
    userCrud.createUser(Object.assign(payload, { password: securedPassword, role }))
        .then((user) => {
        const log = logging.userLogs(user.superuserId);
        // Generate token for the user
        const _token = auth.token(payload.username, user.userId);
        req.session.regenerate((err) => {
            if (err) {
                log.error(new Error(err));
                return next(err);
            }
            ;
            req.session.token = _token;
            req.session.save((err) => {
                if (err) {
                    log.error(new Error(err));
                    return next(err);
                }
                ;
                log.alert(`User ${user.userId} has just been created`);
                return res.status(201).json({
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
};
//# sourceMappingURL=user.register.controller.js.map