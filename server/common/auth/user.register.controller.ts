import { Request, Response } from 'express';
import { configs } from '../../config.js';
import { userCrud } from '../models/user.js';
import { encryptPassword, token } from './auth.js';

export const createUser = (req: Request, res: Response) => {
    const payload = req.body;
    const user = configs.roles.USER;
    let role = payload.role;
    let securedPassword = encryptPassword(payload.password);

    if (!role) {
      role = user;
    }
    userCrud.createUser(Object.assign(payload, { password: securedPassword, role }))
      .then((user) => {
        // Generate token for the user
        const _token = token(payload.userName, user.id);
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
