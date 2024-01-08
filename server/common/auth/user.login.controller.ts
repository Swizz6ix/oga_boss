import { NextFunction, Request, Response } from 'express';
import { userCrud } from '../models/user.js';
import { auth } from './auth.js';
import { io } from '../../index.js';


export const userAuth = {
  login: (req: Request, res: Response, next: NextFunction) => {
    const { username, password } = req.body;
    userCrud.findUser({ username })
      .then((user) => {
        // If user is not found return error
        if (!user) {
          return res.status(400).json({
            status: false,
            error: {
              message: `Could not find any user with username: ${username}`,
            },
          });
        }
        const isSecured = auth.encryptPassword(password)
        // return error, if the provided password does not match with the secured password.
        if (user.password !== isSecured) {
          return res.status(400).json({
            status: false,
            error: {
              message: `provided username and password did not match`
            },
          });
        }

        // Generate an Access Token for the user
        const _token = auth.token(user.username, user.userId);
        req.session.regenerate((err) => {
          if (err) return next(err);
          req.session.token = _token;
          req.session.save((err) => {
            if (err) return next(err);
            return res.status(200).json({
              status: true,
              user: user.toJSON(),
            })
          })
        })

      })
      .catch((err) => {
        return res.status(500).json({
          status: false,
          error: err,
        });
      });
  },
  logout: (req: Request, res: Response, next: NextFunction) => {
    req.session.destroy((err) => {
      if (err) return next(err)
      return res.status(200).json({
          status: true,
          message: 'You have successfully logged out',
        })
    })
  }
}
