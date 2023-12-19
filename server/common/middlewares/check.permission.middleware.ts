import { NextFunction, Response } from 'express';
import { userCrud } from '../models/user.js';


export const permission = {
  has: (role: string) => {
    return (req: any, res: Response, next: NextFunction) => {
      const {
        user: { userId },
      } = req;

      userCrud.findUser({ id: userId })
        .then((user) => {
          // if user does not exist return forbidden error
          if (!user) {
            return res.status(403).json({
              status: false,
              error: 'Invalid access token provided, please login again'
            });
          }

          const userRole = user.role;
          // Throw forbidden error, if user does not posses the required role
          if (userRole !== role) {
            return res.status(403).json({
              status: false,
              error: `You need to be a ${role} to access this endpoint.`
            });
          }
          next();
        })
        .catch((err) => {
          return res.status(400).json({
            status: false,
            error: err,
          })
        });
    };
  },
}
