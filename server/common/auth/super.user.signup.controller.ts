import { NextFunction, Request, Response } from "express";
import { auth } from "./auth.js";
import { superUserCrud } from "../models/super.user.js";
import { configs } from "../../config.js";
import { logging } from "../../engine/logging.js";


/**
 * @function signup that allows for the registration of new users in the system
 * @param {Request} req - The request sent to the server, that carries the payload
 * to create new user
 * @param {Response} res - Response from the server, either success 201 or error
 * @param {NextFunction} next -  allows the next execution process 
   * depending on the response receive from the server
 * @returns {void}
 */

export const signup = (req: Request, res: Response, next: NextFunction): void => {
  const payload = req.body;
  const admin = configs.roles.ADMIN;
  let role = payload.role
  let securedPassword = auth.encryptPassword(payload.password);

  if (!role) {
    role = admin
  }
  superUserCrud.register(Object.assign(payload, { password: securedPassword, role }))
    .then((user) => {
      const log = logging.userLogs(user.superuserId);
      // Generate token for user
      const _token = auth.token(payload.username, user.superuserId);
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
          log.alert(`Superuser ${user.superuserId} has just been created.`);
          return res.status(201).json({
            status: true,
            user: user.toJSON(),
          });
        });
      });
    })
    .catch((err) => {
      logging.adminLogger.error(new Error(err));
      return res.status(500).json({
        status: false,
        error: err,
      });
    });
}
