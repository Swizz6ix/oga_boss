import { auth } from "./auth.js";
import { superUserCrud } from "../models/super.user.js";
import { configs } from "../../config.js";
export const signup = (req, res, next) => {
    const payload = req.body;
    const admin = configs.roles.ADMIN;
    let role = payload.role;
    let securedPassword = auth.encryptPassword(payload.password);
    if (!role) {
        role = admin;
    }
    superUserCrud.register(Object.assign(payload, { password: securedPassword, role }))
        .then((user) => {
        // Generate token for user
        const _token = auth.token(payload.username, user.superuserId);
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
//# sourceMappingURL=super.user.signup.controller.js.map