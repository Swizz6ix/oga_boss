import { configs } from '../../config.js';
import { userCrud } from '../models/user.js';
import { auth } from './auth.js';
export const createUser = (req, res, next) => {
    const payload = req.body;
    const user = configs.roles.USER;
    let role = payload.role;
    let securedPassword = auth.encryptPassword(payload.password);
    if (!role) {
        role = user;
    }
    userCrud.createUser(Object.assign(payload, { password: securedPassword, role }))
        .then((user) => {
        // Generate token for the user
        const _token = auth.token(payload.username, user.userId);
        req.session.regenerate((err) => {
            if (err)
                return next(err);
            req.session.token = _token;
            req.session.save((err) => {
                if (err)
                    return next(err);
                return res.status(201).json({
                    status: true,
                    user: user.toJSON(),
                });
            });
        });
    })
        .catch((err) => {
        return res.status(500).json({
            status: false,
            error: err,
        });
    });
};
//# sourceMappingURL=user.register.controller.js.map