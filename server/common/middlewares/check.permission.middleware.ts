import { NextFunction, Response, Request } from 'express';
import { superUserCrud } from '../models/super.user.js';
import { userCrud } from '../models/user.js';
import { logging } from '../../engine/logging.js';
import { user as _user } from './user.middleware.js';

export const permission = {
  has: (role: string) => {
    return (req: Request, res: Response, next: NextFunction) => {
      const {
        user: { userId },
      } = req;

      superUserCrud.findUser({ superuserId: userId })
        .then((user) => {
          const supRole = user?.role;
          let log = logging.userLogs(String(user?.superuserId));
          // if user does not exist return forbidden error
          if (!user) {
            try {
              userCrud.findUser({ userId: userId })
                .then((user) => {
                  log = logging.userLogs(String(user?.superuserId))
                  if (!user) {
                    logging.authLogger.warn(
                      `An unknown User ${userId} tried to access the endpoint ${req.originalUrl}`,
                    );
                    return res.status(403).json({
                      status: false,
                      error: 'Invalid access credentials, please login again'
                    });
                  }
                  // Throw forbidden error, if user does not posses the required role
                  const userRole = user.role;
                  if (userRole !== role) {
                    log.warn(
                      `User: ${user.userId} tried to access the endpoint ${req.originalUrl}`
                    );
                    return res.status(403).json({
                      status: false,
                      error: `You do not have the required permission to perform this operation.`
                    });
                  };
                  log.info(
                    `User: ${user.userId} accessed the endpoint ${req.originalUrl} as an ${role}`,
                  );
                  next();
                })
            } catch (error) {
              logging.authLogger.error(new Error('An uncaught error'));
              res.status(403).json({
                status: false,
                error: error,
              })
            }
          } else {
          // Throw forbidden error, if user does not posses the required role
          if (supRole !== role) {
            log.warn(
              `User: ${user.superuserId} tried to access the endpoint ${req.originalUrl}`
            );
            return res.status(403).json({
              status: false,
              error: `You do not have the required permission to perform this operation.`
            });
          };
          log.info(
            `User: ${user.superuserId} accessed the endpoint ${req.originalUrl} as an ${role}`
          );
          next();
        }
        })
        .catch((err) => {
          logging.authLogger.error(new Error('An uncaught error'));
          return res.status(400).json({
            status: false,
            error: err,
          });
        });
    };
  },
  userActivity: (access: boolean) => {
    return async (req: Request, res: Response, next: NextFunction) => {
      const{
        user: { userId }
      } = req
      const _superuserId = await _user._user_id(userId);
      const log = logging.userLogs(String(_superuserId));
      try {
        const user = await userCrud.findUser({ userId: userId });
        if (user?.vacation === access) {
          log.warn(`User ${userId} tried to access url: ${req.originalUrl}`);
          return res.status(500).json({
            status: false,
            error: `User ${userId} cannot access information, contact an admin.`
          })
        }
        next();
      }
      catch (err) {
        log.error(new Error(`server error`));
        return res.status(500).json({
          status: false,
          error: err,
        })
      };
    };
  }
}
