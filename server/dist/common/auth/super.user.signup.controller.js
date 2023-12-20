import { encryptPassword, token } from "./auth.js";
import { superUserCrud } from "../models/super.user.js";
export const signup = (req, res) => {
    const payload = req.body;
    let securedPassword = encryptPassword(payload.password);
    superUserCrud.register(Object.assign(payload, { password: securedPassword }))
        .then((user) => {
        // Generate token for user
        const _token = token(payload.username, user.id);
        return res.status(201).json({
            user: user.toJSON(),
            token: _token,
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