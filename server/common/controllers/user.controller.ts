import { Request, Response } from 'express';
import { userCrud } from '../models/user.js';


export const userController = {
  getUser: (req: Request, res: Response) => {
    const { params: { userId } } = req;
    userCrud.findUser({ id: userId })
      .then((user) => {
        return res.status(200).json({
          status: true,
          data: user?.toJSON(),
        });
      })
      .catch((err) => {
        return res.status(500).json({
          status: false,
          error: err,
        });
      });
  },

  getAllUsers: (req: Request, res: Response) => {
    userCrud.findAllUsers(req.query)
      .then((users) => {
        return res.status(200).json({
          status: true,
          data: users,
        });
      })
      .catch((err) => {
        return res.status(500).json({
          status: false,
          error: err,
        });
      });
  },

  updateUser: (req: Request, res: Response) => {
    const {
      params: { userId },
      body: payload
    } = req;

    // if the payload does not have any keys, return an error
    if (!Object.keys(payload).length) {
      return res.status(400).json({
        status: false,
        error: {
          message: 'Body is empty, hence cannot update the user',
        },
      });
    }
    userCrud.updateUser({ id: userId }, payload)
      .then(() => {
        return userCrud.findUser({ id: userId });
      })
      .then((user) => {
        return res.status(200).json({
          status: true,
          data: user?.toJSON()
        });
      })
      .catch((err) => {
        return res.status(500).json({
          status: false,
          error: err,
        });
      });
  },

  deleteUser: (req: Request, res: Response) => {
    const { params: { userId } } = req;
    userCrud.deleteUser({ id: userId })
      .then((numberOfUsersDeleted) => {
        return res.status(200).json({
          status: true,
          data: { numberOfEntriesDeleted: numberOfUsersDeleted },
        });
      })
      .catch((err) => {
        return res.status(500).json({
          status: false,
          error: err,
        });
      });
  }
}
