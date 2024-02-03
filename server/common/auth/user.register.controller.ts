import { NextFunction, Request, Response } from 'express';
import { configs } from '../../config.js';
import { userCrud } from '../models/user.js';
import { auth } from './auth.js';
import { logging } from '../../engine/logging.js';
import { departmentCrud } from '../models/department.js';
import { superUserCrud } from '../models/super.user.js';

/**
 * 
 * @function createUser that allows for the registration of new users in the system
 * @param {Request} req - The request sent to the server, that carries the payload
 * to create new user
 * @param {Response} res - Response from the server, either success 201 or error
 * @param {NextFunction} next -  allows the next execution process 
   * depending on the response receive from the server
 * @returns {Promise<Response<any, Record<string, any>> | undefined>}
 */
export const createUser = async (req: Request, res: Response, next: NextFunction):
  Promise<Response<any, Record<string, any>> | undefined> => {
  const payload = req.body;
  const user = configs.roles.USER;
  let role = payload.role;
  let securedPassword = auth.encryptPassword(payload.password);
  const genLog = logging.userLogs('user-service');
  const _deptId = payload.departmentId;
  const _superuserId = payload.superuserId;
  const _dept = await departmentCrud.findDept({ departmentId: _deptId });
  const _superuser = await superUserCrud.findUser({ superuserId: _superuserId });

  if (!role) {
    role = user;
  }
  if (_superuser?.superuserId !== _dept?.superuserId) {
    return res.status(500).json({
      status: false,
      error: `Sign up information not accurate`,
    })
  }
  userCrud.createUser(Object.assign(payload, { password: securedPassword, role }))
    .then((user) => {
      const log = logging.userLogs(user.superuserId)
      // Generate token for the user
      const _token = auth.token(payload.username, user.userId);
      req.session.regenerate((err) => {
        if (err) {
          log.error(new Error(err));
          return next(err);
        };
        req.session.token = _token;
        req.session.save((err) => {
          if (err) {
            log.error(new Error(err));
            return next(err);
          };
          log.alert(`User ${user.userId} has just been created`);
          return res.status(201).json({
            status: true,
            user: user.toJSON(),
          });
        });
      });
    })
    .catch((err) => {
      genLog.error(new Error(err));
      return res.status(500).json({
        status: false,
        error: err,
      });
    });
}
