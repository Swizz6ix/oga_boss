import { superUserCrud } from "../models/super.user.js";
import { userCrud } from "../models/user.js";

export const user = {
  _user_id: async (reqId: string) => {
    let _userId;
    try {
      const _user = await userCrud.findUser({ userId: reqId });
      if (!_user) {
        try {
          const _superUser = await superUserCrud.findUser({ superuserId: reqId });
          if (_superUser) return _userId = _superUser.superuserId
        }
        catch(err) {
          return String(err);
        }
      }
      _userId = _user?.superuserId;
      return _userId;
    }
    catch(err) {
      return String(err)
    }
  },

  userIdentify: async (reqId: any, userRole: any, params: any) => {
    let userId;
    if (reqId !== params) {
      try {
        const superUser = await superUserCrud.findUser({ superuserId: reqId });
        if (!superUser) {
          try {
            const user = await userCrud.findUser({ userId: reqId });
            if (!user) {
              return console.error('User does not exist');
            }
            if (user.role === userRole) {
              userId = user.userId;
              return userId;
            }
            return console.error(`User ${user.firstName} do not have the required permission!`);
            } catch(error) {
              return String(error)
            };
          }
          userId = params;
          return userId;
        } catch(error) {
          return String(error);
        };
      };
      userId = params;
      return userId;
  },
}
