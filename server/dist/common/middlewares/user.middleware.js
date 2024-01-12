var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { authLogger } from "../../engine/logging.js";
import { superUserCrud } from "../models/super.user.js";
import { userCrud } from "../models/user.js";
export const user = {
    // Make sure admin and users don't access info that from other superuser servers.
    _user_id: (reqId) => __awaiter(void 0, void 0, void 0, function* () {
        let _userId;
        try {
            const _user = yield userCrud.findUser({ userId: reqId });
            if (!_user) {
                try {
                    const _superUser = yield superUserCrud.findUser({ superuserId: reqId });
                    if (_superUser)
                        return _userId = _superUser.superuserId;
                    authLogger.warn(new Error(`You can't access info from other server: ${reqId}`));
                }
                catch (err) {
                    authLogger.error(new Error('superuser server error'));
                    return String(err);
                }
            }
            _userId = _user === null || _user === void 0 ? void 0 : _user.superuserId;
            return _userId;
        }
        catch (err) {
            authLogger.error(new Error('superuser server error'));
            return String(err);
        }
    }),
    // Make sure a user don't access another user info except such user is an admin.
    userIdentify: (reqId, userRole, params) => __awaiter(void 0, void 0, void 0, function* () {
        let userId;
        if (reqId !== params) {
            try {
                const superUser = yield superUserCrud.findUser({ superuserId: reqId });
                if (!superUser) {
                    try {
                        const user = yield userCrud.findUser({ userId: reqId });
                        if (!user) {
                            authLogger.warn(new Error(`Unknown user ${reqId}`));
                            return console.error('User does not exist');
                        }
                        if (user.role === userRole) {
                            userId = user.userId;
                            return userId;
                        }
                        authLogger.warn(new Error(`User ${user.userId} tried to access an unauthorized endpoint`));
                        return console.error(`User ${user.firstName} do not have the required permission!`);
                    }
                    catch (error) {
                        return String(error);
                    }
                    ;
                }
                userId = params;
                return userId;
            }
            catch (error) {
                authLogger.error(new Error('Unauthorized error'));
                return String(error);
            }
            ;
        }
        ;
        userId = params;
        return userId;
    }),
};
//# sourceMappingURL=user.middleware.js.map