var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { superUserCrud } from "../models/super.user.js";
import { userCrud } from "../models/user.js";
export const _user_id = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    let _userId;
    try {
        const _user = yield userCrud.findUser({ id: userId });
        if (!_user) {
            try {
                const _superUser = yield superUserCrud.findUser({ id: userId });
                if (_superUser)
                    return _userId = _superUser.id;
            }
            catch (err) {
                return String(err);
            }
        }
        _userId = _user === null || _user === void 0 ? void 0 : _user.SuperUserId;
        return _userId;
    }
    catch (err) {
        return String(err);
    }
});
//# sourceMappingURL=controller.helper.js.map