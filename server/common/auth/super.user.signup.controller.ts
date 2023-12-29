import { Request, Response } from "express";
import { encryptPassword, token } from "./auth.js";
import { superUserCrud } from "../models/super.user.js";
import { configs } from "../../config.js";

export const signup = (req: Request, res: Response) => {
  const payload = req.body;
  const admin = configs.roles.ADMIN;
  let role = payload.role
  let securedPassword = encryptPassword(payload.password);

  if (!role) {
    role = admin
  }
  superUserCrud.register(Object.assign(payload, { password: securedPassword, role }))
    .then((user) => {
      // Generate token for user
      const _token = token(payload.username, user.superuserId);
      return res.status(201).json({
        user: user.toJSON(),
        token: _token,
      });
    })
    .catch((err) => {
      return res.status(500).json({
        status: false,
        error: err,
      });
    });
}
