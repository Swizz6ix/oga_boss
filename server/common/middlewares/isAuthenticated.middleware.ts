import { NextFunction, Request, Response } from "express";
import pkg from "jsonwebtoken";
import { configs } from "../../config.js";

export const authenticated = {
  authSession: (req: Request, res: Response, next: NextFunction) => {
    if (!req.session.token) {
      return res.status(401).json({
        status: false,
        error: `Pls login a valid user`,
      })
    }
    const _token = req.session.token ?? "" // returns the right side if value is null or undefined
    const { verify } = pkg;
    verify(_token, configs.jwtSecret, (err: any, user: any) => {
      if (err) {
        return res.status(403).json({
          status: false,
          error: 'User cannot be verified, pls login again',
        })
      }
      req.user = user;
    })
    next();
  }
};
