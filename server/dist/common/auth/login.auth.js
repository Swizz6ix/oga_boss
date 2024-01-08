var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import passport from "passport";
import LocalStrategy from "passport-local";
import { userCrud } from "../models/user.js";
import { auth } from "./auth.js";
export const pass = () => {
    passport.use(new LocalStrategy.Strategy((username, password, cb) => __awaiter(void 0, void 0, void 0, function* () {
        userCrud.findUser({ username })
            .then((user) => {
            if (!user) {
                return cb({
                    status: false,
                    message: `Could not find any user with the username ${username}`,
                });
            }
            const isSecured = auth.encryptPassword(password);
            if (user.password !== isSecured) {
                return cb({
                    status: false,
                    message: "provided username and password did not match",
                });
            }
            return cb(null, user);
        })
            .catch((err) => {
            return cb({
                status: false,
                error: err,
            });
        });
    })));
    passport.serializeUser((user, done) => {
        process.nextTick(() => {
            return done(null, {
                id: user.userId,
                username: user.username,
                email: user.email,
            });
        });
    });
    passport.deserializeUser(function (user, cb) {
        process.nextTick(function () {
            return cb(null, user);
        });
    });
};
//# sourceMappingURL=login.auth.js.map