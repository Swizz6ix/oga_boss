import passport from "passport";
import LocalStrategy from 'passport-local';
export const verify = {
    confirm: (req, res, next) => {
        const { _username, password } = req.body;
        passport.use(new LocalStrategy.Strategy((username, password, cb) => {
            if (username == _username)
                cb(null, username);
        }));
    }
};
//# sourceMappingURL=verify.js.map