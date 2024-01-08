import passport from "passport";
export const login = (req, res, next) => {
    passport.authenticate('local', function (err, user) {
        if (err || !user) {
            return res.status(401).json(err);
        }
        req.login(user, function (err) {
            if (err) {
                return next(err);
            }
            // console.log("sdd", req.user = user)
            return req.user = user;
        });
        res.status(200).json(user);
        // console.log("dss", req)
    })(req, res, next);
};
//# sourceMappingURL=user.login.js.map