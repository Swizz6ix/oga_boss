import { Request, Response, NextFunction } from "express";
import { superUserCrud } from "../models/super.user.js";
import { auth } from "./auth.js";
import { logging } from "../../engine/logging.js";

export const superAuth = {
  /**
   * @function login that handles the user login, checks if the user exist in the database,
   * if it exist, allow user continue access, else throw an error
   * @param {Request} req - The request sent by the user to server, that carries login
   *  credentials,to be confirmed against those already existing in the database.
   * @param {Response} res  - The response from the server either success or error
   * @param {NextFunction} next - allows the next execution process 
   * depending on the response receive from the server
   * @returns {void}
   */
  login: (req: Request, res: Response, next: NextFunction): void => {
    const { username, password } = req.body;
    superUserCrud.findUser({ username })
      .then((user) => {
        const log = logging.userLogs(String(user?.superuserId));

        // If user is not found return error
        if (!user) {
          logging.adminLogger.error(`Could not find any user with username: ${username}`)
          return res.status(401).json({
            status: false,
            error: {
              message: `Could not find any user with username: ${username}`,
            },
          });
        }

        // return error, if the payload does not match with the secured password
        const isSecured = auth.encryptPassword(password)
        if (user.password !== isSecured) {
          log.error(`User ${user.username} couldn't provide a valid password.`);
          return res.status(401).json({
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
            log.error(new Error(err));
            return next(err);
          };
          req.session.token = _token;
          req.session.save((err) => {
            if (err) {
              log.error(new Error(err));
              return next(err);
            };
            log.alert(`User: ${user.superuserId} just logged in.`)
            return res.status(200).json({
              status: true,
              user: user.toJSON(),
            })
          })
        })
      })
      .catch((err) => {
        logging.adminLogger.error(new Error(err));
        return res.status(500).json({
          statue: false,
          error: err,
        });
      });
  }
}
