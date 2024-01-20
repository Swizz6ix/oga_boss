import { logging } from "../../engine/logging.js";
import { superUserCrud } from "../models/super.user.js";
import { userCrud } from "../models/user.js";

export const user = {
  // Make sure admin and users don't access info that from other superuser servers.
  _user_id: async (reqId: string) => {
    let _userId;
    try {
      const _user = await userCrud.findUser({ userId: reqId });
      if (!_user) {
        try {
          const _superUser = await superUserCrud.findUser({ superuserId: reqId });
          if (_superUser) return _userId = _superUser.superuserId
          return logging.authLogger.warn(new Error(`An unknown User tried to access info in ${reqId} server`));
        }
        catch(err) {
          logging.authLogger.error(new Error('superuser server error'));
          return String(err);
        }
      }
      _userId = _user?.superuserId;
      return _userId;
    }
    catch(err) {
      logging.authLogger.error(new Error('superuser server error'));
      return String(err)
    }
  },

  // Make sure a user don't access another user info except such user is an admin.
  userIdentify: async (reqId: any, userRole: any, params: any) => {
    let userId;
    if (reqId !== params) {
      try {
        const superUser = await superUserCrud.findUser({ superuserId: reqId });
        if (!superUser) {
          try {
            const user = await userCrud.findUser({ userId: reqId });
            if (!user) {
              logging.authLogger.warn(new Error(`Unknown user ${reqId}`));
              return console.error('User does not exist');
            }
            if (user.role === userRole) {
              userId = params;
              return userId;
            }
            const log = logging.userLogs(user.superuserId);
            log.warn(new Error(`User ${user.userId} tried to access an unauthorized endpoint`));
            return console.error(`User ${user.userId} do not have the required permission!`);
            } catch(error) {
              return String(error)
            };
          }
          userId = params;
          return userId;
        } catch(error) {
          logging.authLogger.error(new Error('Unauthorized error'));
          return String(error);
        };
      };
      userId = params;
      return userId;
  },
}
