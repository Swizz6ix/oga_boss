import { userCrud } from "../models/user.js";


export const userController = {
  userDash: (req: any, res: any) => {
    res.json({
      welcome: 'Admin'
    })
  },
  addUser: (req: any, res: any) => {
    const payload = req.body;
    userCrud.createUser(Object.assign(payload))
      .then((user) => {
        return res.status(201).json({
          user: user.toJSON(),
        });
      })
      .catch((err) => {
        return res.status(500).json({
          status: false,
          error: err,
        });
      });
  },

  getUser: (req: any, res: any) => {
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

  getAllUsers: (req: any, res: any) => {
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

  updateUser: (req: any, res: any) => {
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

  deleteUser: (req: any, res: any) => {
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
