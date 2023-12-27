import { NextFunction, Request, Response } from "express";
import { superUserCrud } from "../models/super.user.js";
import { userCrud } from "../models/user.js";

export const user = {
  _user_id: async (reqId: string) => {
    let _userId;
    try {
      const _user = await userCrud.findUser({ id: reqId });
      if (!_user) {
        try {
          const _superUser = await superUserCrud.findUser({ id: reqId });
          if (_superUser) return _userId = _superUser.id
        }
        catch(err) {
          return String(err);
        }
      }
      _userId = _user?.SuperUserId;
      return _userId;
    }
    catch(err) {
      return String(err)
    }
  },

  userIdentify: async (reqId: any, userRole: any, params: any) => {
    console.log('re', typeof(reqId), typeof(params))
    let userId;
    if (reqId.toString() !== params.toString()) {
      console.log('>>>params', typeof(params), typeof(reqId))
      try {
        const superUser = await superUserCrud.findUser({ id: reqId });
        if (!superUser) {
          try {
            const user = await userCrud.findUser({ id: reqId });
            if (!user) {
              return Error('User does not exist');
            }
            if (user.role === userRole) {
              userId = user.id;
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
