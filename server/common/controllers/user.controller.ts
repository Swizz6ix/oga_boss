import { Request, Response } from 'express';
import { userCrud } from '../models/user.js';
import { user } from '../middlewares/user.middleware.js';
import { configs } from '../../config.js';
import { controllerLogger } from '../../engine/logging.js';

const _role = configs.roles.ADMIN;

export const userController = {
  getUser: (req: Request, res: Response) => {
    const reqId = req.user.userId;
    const {
      params: { userId }
    } = req;

    user.userIdentify(reqId, _role, userId)
      .then((params) => {
        userCrud.findUser({ userId: params })
          .then((user) => {
            controllerLogger.info(`User: ${user?.userId} found by ${reqId}.`)
            return res.status(200).json({
              status: true,
              data: user?.toJSON(),
            });
          })
          .catch((err) => {
            controllerLogger.error(new Error(err));
            return res.status(500).json({
              status: false,
              error: err,
            });
          });
      })
      .catch((err) => {
        controllerLogger.error(new Error(err));
        return res.status(500).json({
          status: false,
          error: err,
        });
      });
  },

  getAllUsers: (req: Request, res: Response) => {
    const {
      user: { userId }
    } = req;

    user._user_id(userId)
      .then((id) => {
        userCrud.findAllUsers({ superuserId: id })
          .then((users) => {
            controllerLogger.info(`All users in server ${id} found by ${userId}`);
            return res.status(200).json({
              status: true,
              data: users,
            });
          })
          .catch((err) => {
            controllerLogger.error(new Error(err));
            return res.status(500).json({
              status: false,
              error: err,
            });
          });
      })
      .catch((err) => {
        controllerLogger.error(new Error(err));
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
        userCrud.findUser({ userId: params })
          .then((user) => {
            user?.getTasks()
              .then((tasks) => {
                controllerLogger.info(`All tasks accessed by ${reqId}`)
                return res.status(200).json({
                  status: true,
                  tasks: tasks,
                });
              })
              .catch((err) => {
                controllerLogger.error(new Error(err));
                return res.status(500).json({
                  status: false,
                  error: err,
                });
              });
          })
          .catch((err) => {
            controllerLogger.error(new Error(err));
            return res.status(500).json({
              status: false,
              error: err,
            });
          });
      })
      .catch((err) => {
        controllerLogger.error(new Error(err));
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
        userCrud.findUser({ userId: params })
          .then((user) => {
            user?.countTasks()
              .then((tasks) => {
                controllerLogger.info(`Total number of all tasks accessed by ${reqId}`);
                return res.status(200).json({
                  status: true,
                  totalNumberOfTasks: tasks,
                });
              })
              .catch((err) => {
                controllerLogger.error(new Error(err));
                return res.status(500).json({
                  status: false,
                  error: err,
                });
              });
          })
          .catch((err) => {
            controllerLogger.error(new Error(err));
            return res.status(500).json({
              status: false,
              error: err,
            });
          });
      })
      .catch((err) => {
        controllerLogger.error(new Error(err));
        return res.status(500).json({
          status: false,
          error: err,
        });
      });
  },

  getReports: (req: any, res: Response) => {
    const reqId = req.user.userId;
    const {
      params: { userId }
    } = req;

    user.userIdentify(reqId, _role, userId)
      .then((params) => {
        userCrud.findUser({ userId: params })
          .then((user) => {
            user?.getDailyRpts()
              .then((reports) => {
                controllerLogger.info(`All daily reports accessed by ${reqId}`);
                return res.status(200).json({
                  status: true,
                  reports: reports,
                });
              })
              .catch((err) => {
                controllerLogger.error(new Error(err));
                return res.status(500).json({
                  status: false,
                  error: err,
                });
              });
          })
          .catch((err) => {
            controllerLogger.error(new Error(err));
            return res.status(500).json({
              status: false,
              error: err,
            });
          });
      })
      .catch((err) => {
        controllerLogger.error(new Error(err));
        return res.status(500).json({
          status: false,
          error: err,
        });
      });
  },

  getReportsCount: (req: any, res: Response) => {
    const reqId = req.user.userId;
    const {
      params: { userId }
    } = req;

    user.userIdentify(reqId, _role, userId)
      .then((params) => {
        userCrud.findUser({ userId: params })
          .then((user) => {
            user?.countDailyRpts()
              .then((reports) => {
                controllerLogger.info(`total number of reports accessed by ${reqId}`);
                return res.status(200).json({
                  status: true,
                  totalNumberOfReports: reports,
                });
              })
              .catch((err) => {
                controllerLogger.error(new Error(err));
                return res.status(500).json({
                  status: false,
                  error: err,
                });
              });
          })
          .catch((err) => {
            controllerLogger.error(new Error(err));
            return res.status(500).json({
              status: false,
              error: err,
            });
          });
      })
      .catch((err) => {
        controllerLogger.error(new Error(err));
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
        userCrud.findUser({ userId: params })
          .then((user) => {
            user?.getChatRooms()
              .then((chats) => {
                controllerLogger.info(`all chats accessed by ${reqId}`);
                return res.status(200).json({
                  status: true,
                  chats: chats,
                });
              })
              .catch((err) => {
                controllerLogger.error(new Error(err));
                return res.status(500).json({
                  status: false,
                  error: err,
                });
              });
          })
          .catch((err) => {
            controllerLogger.error(new Error(err));
            return res.status(500).json({
              status: false,
              error: err,
            });
          });
      })
      .catch((err) => {
        controllerLogger.error(new Error(err));
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
        userCrud.findUser({ userId: params })
          .then((user) => {
            user?.countChatRooms()
              .then((chats) => {
                controllerLogger.info(`Total number of chats accessed by ${reqId}`);
                return res.status(200).json({
                  status: true,
                  totalNumberOfChats: chats,
                });
              })
              .catch((err) => {
                controllerLogger.error(new Error(err));
                return res.status(500).json({
                  status: false,
                  error: err,
                });
              });
          })
          .catch((err) => {
            controllerLogger.error(new Error(err));
            return res.status(500).json({
              status: false,
              error: err,
            });
          });
      })
      .catch((err) => {
        controllerLogger.error(new Error(err));
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
      controllerLogger.error(new Error('No update provided'));
      return res.status(400).json({
        status: false,
        error: {
          message: 'Body is empty, hence cannot update the user',
        },
      });
    }
    userCrud.updateUser({ userId: userId }, payload)
      .then(() => {
        return userCrud.findUser({ userId: userId });
      })
      .then((user) => {
        controllerLogger.info(`update on User ${user?.userId} performed by ${req.user.userId}`);
        return res.status(200).json({
          status: true,
          data: user?.toJSON()
        });
      })
      .catch((err) => {
        controllerLogger.error(new Error(err));
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

    userCrud.deleteUser({ userId: userId })
      .then((numberOfUsersDeleted) => {
        controllerLogger.warn(`User: ${userId} deleted by ${req.user.userId}`);
        return res.status(200).json({
          status: true,
          data: { numberOfEntriesDeleted: numberOfUsersDeleted },
        });
      })
      .catch((err) => {
        controllerLogger.error(new Error(err));
        return res.status(500).json({
          status: false,
          error: err,
        });
      });
  }
}
