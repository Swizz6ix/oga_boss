import { Request, Response } from 'express';
import { User, userCrud } from '../models/user.js';
import { user } from '../middlewares/user.middleware.js';
import { permission } from '../middlewares/check.permission.middleware.js';
import { configs } from '../../config.js';

const _role = configs.roles.ADMIN;

export const userController = {
  getUser: (req: any, res: Response) => {
    const reqId = req.user.userId;
    const {
      params: { userId }
    } = req;

    user.userIdentify(reqId, _role, userId)
      .then((params) => {
        userCrud.findUser({ id: params })
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
      })
      .catch((err) => {
        return res.status(500).json({
          status: false,
          error: err,
        });
      });
  },

  getAllUsers: (req: any, res: Response) => {
    const { 
      user: { userId }
    } = req;

    user._user_id(userId)
      .then((id) => {
        userCrud.findAllUsers({ SuperUserId: id })
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
      })
      .catch((err) => {
        return res.status(500).json({
          status: false,
          error: err,
        });
      });
  },

  getTasks: (req: any, res: Response) => {
    const reqId = req.user.userId;
    const {
      params: { userId }
    } = req;

    user.userIdentify(reqId, _role, userId)
      .then((params) => {
        userCrud.findUser({ id: params })
          .then((user) => {
            user?.getTasks()
              .then((tasks) => {
                return res.status(200).json({
                  status: true,
                  tasks: tasks,
                });
              })
              .catch((err) => {
                return res.status(500).json({
                  status: false,
                  error: err,
                });
              });
          })
          .catch((err) => {
            return res.status(500).json({
              status: false,
              error: err,
            });
          });
      })
      .catch((err) => {
        return res.status(500).json({
          status: false,
          error: err,
        })
      })
  },

  getTasksCount: (req: any, res: Response) => {
    const reqId = req.user.userId;
    const {
      params: { userId }
    } = req;

    user.userIdentify(reqId, _role, userId)
      .then((params) => {
        userCrud.findUser({ id: params })
          .then((user) => {
            user?.countTasks()
              .then((tasks) => {
                return res.status(200).json({
                  status: true,
                  totalNumberOfTasks: tasks,
                });
              })
              .catch((err) => {
                return res.status(500).json({
                  status: false,
                  error: err,
                });
              });
          })
          .catch((err) => {
            return res.status(500).json({
              status: false,
              error: err,
            });
          });
      })
  },

  getReports: (req: any, res: Response) => {
    const reqId = req.user.userId;
    const {
      params: { userId }
    } = req;

    user.userIdentify(reqId, _role, userId)
      .then((params) => {
        userCrud.findUser({ id: params })
          .then((user) => {
            user?.getDailyRpts()
              .then((reports) => {
                return res.status(200).json({
                  status: true,
                  reports: reports,
                });
              })
              .catch((err) => {
                return res.status(500).json({
                  status: false,
                  error: err,
                });
              });
          })
          .catch((err) => {
            return res.status(500).json({
              status: false,
              error: err,
            });
          });
      })
  },

  getReportsCount: (req: any, res: Response) => {
    const reqId = req.user.userId;
    const {
      params: { userId }
    } = req;

    user.userIdentify(reqId, _role, userId)
      .then((params) => {
        userCrud.findUser({ id: params })
          .then((user) => {
            user?.countDailyRpts()
              .then((reports) => {
                return res.status(200).json({
                  status: true,
                  totalNumberOfReports: reports,
                });
              })
              .catch((err) => {
                return res.status(500).json({
                  status: false,
                  error: err,
                });
              });
          })
          .catch((err) => {
            return res.status(500).json({
              status: false,
              error: err,
            });
          });
      })
      .catch((err) => {
        return res.status(500).json({
          status: false,
          error: err,
        })
      })
  },

  getChats: (req: any, res: Response) => {
    const reqId = req.user.userId;
    const {
      params: { userId },
    } = req;

    user.userIdentify(reqId, _role, userId)
      .then((params) => {
        userCrud.findUser({ id: params })
          .then((user) => {
            user?.getGenRooms()
              .then((chats) => {
                return res.status(200).json({
                  status: true,
                  chats: chats,
                });
              })
              .catch((err) => {
                return res.status(500).json({
                  status: false,
                  error: err,
                });
              });
          })
          .catch((err) => {
            return res.status(500).json({
              status: false,
              error: err,
            });
          });
      })
      .catch((err) => {
        return res.status(500).json({
          status: false,
          error: err,
        });
      });
  },

  getChatsCount: (req: any, res: Response) => {
    const reqId = req.user.userId;
    const {
      params: { userId },
    } = req;

    user.userIdentify(reqId, _role, userId)
      .then((params) => {
        userCrud.findUser({ id: params })
          .then((user) => {
            user?.countGenRooms()
              .then((chats) => {
                return res.status(200).json({
                  status: true,
                  totalNumberOfChats: chats,
                });
              })
              .catch((err) => {
                return res.status(500).json({
                  status: false,
                  error: err,
                });
              });
          })
          .catch((err) => {
            return res.status(500).json({
              status: false,
              error: err,
            });
          });
      })
      .catch((err) => {
        return res.status(500).json({
          status: false,
          error: err,
        })
      })
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
    const {
      params: { userId }
    } = req;

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
