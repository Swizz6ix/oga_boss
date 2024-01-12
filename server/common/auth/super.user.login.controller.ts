import { Request, Response, NextFunction } from "express";
import { superUserCrud } from "../models/super.user.js";
import { auth } from "./auth.js";
import { adminLogger } from "../../engine/logging.js";

export const superAuth = {
  login: (req: Request, res: Response, next: NextFunction) => {
    const { username, password } = req.body;
    superUserCrud.findUser({ username })
      .then((user) => {
        // If user is not found return error
        if (!user) {
          adminLogger.error(`Could not find any user with username: ${username}`)
          return res.status(400).json({
            status: false,
            error: {
              message: `Could not find any user with username: ${username}`,
            },
          });
        }
        const isSecured = auth.encryptPassword(password)
        // return error, if the payload does not match with the secured password
        if (user.password !== isSecured) {
          adminLogger.error(`User ${user.username} couldn't provide a valid password.`);
          return res.status(400).json({
            status: false,
            error: {
              message: 'Provided username and password did not match'
            },
          });
        }

        // Generate an Access Token for the user
        const _token = auth.token(user.username, user.superuserId);
        req.session.regenerate((err) => {
          if (err) {
            adminLogger.error(new Error(err));
            return next(err);
          };
          req.session.token = _token;
          req.session.save((err) => {
            if (err) {
              adminLogger.error(new Error(err));
              return next(err);
            };
            adminLogger.alert(`User: ${user.superuserId} just logged in.`)
            return res.status(200).json({
              status: true,
              user: user.toJSON(),
            })
          })
        })
      })
      .catch((err) => {
        adminLogger.error(new Error(err));
        return res.status(500).json({
          statue: false,
          error: err,
        });
      });
  }
}
