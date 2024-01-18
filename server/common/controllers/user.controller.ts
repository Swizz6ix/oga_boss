import { Request, Response } from 'express';
import { userCrud } from '../models/user.js';
import { user } from '../middlewares/user.middleware.js';
import { configs } from '../../config.js';
import { logging } from '../../engine/logging.js';

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
            const log = logging.userLogs(String(user?.superuserId));
            log.info(`User: ${user?.userId} retrieved by ${reqId}.`);
            return res.status(200).json({
              status: true,
              data: user?.toJSON(),
            });
          })
          .catch((err) => {
            logging.controllerLogger.error(new Error(err));
            return res.status(500).json({
              status: false,
              error: err,
            });
          });
      })
      .catch((err) => {
        logging.controllerLogger.error(new Error(err));
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
        const log = logging.userLogs(String(id));
        userCrud.findAllUsers({ superuserId: id })
          .then((users) => {
            log.info(`All users in server ${id} retrieved by ${userId}`);
            return res.status(200).json({
              status: true,
              data: users,
            });
          })
          .catch((err) => {
            log.error(new Error(err));
            return res.status(500).json({
              status: false,
              error: err,
            });
          });
      })
      .catch((err) => {
        logging.controllerLogger.error(new Error(err));
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
            const log = logging.userLogs(String(user?.superuserId));
            user?.getTasks()
              .then((tasks) => {
                log.info(`All tasks accessed by ${reqId}`)
                return res.status(200).json({
                  status: true,
                  tasks: tasks,
                });
              })
              .catch((err) => {
                log.error(new Error(err));
                return res.status(500).json({
                  status: false,
                  error: err,
                });
              });
          })
          .catch((err) => {
            logging.controllerLogger.error(new Error(err));
            return res.status(500).json({
              status: false,
              error: err,
            });
          });
      })
      .catch((err) => {
        logging.controllerLogger.error(new Error(err));
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
            const log = logging.userLogs(String(user?.superuserId));
            user?.countTasks()
              .then((tasks) => {
                log.info(`Total number of all tasks accessed by ${reqId}`);
                return res.status(200).json({
                  status: true,
                  totalNumberOfTasks: tasks,
                });
              })
              .catch((err) => {
                log.error(new Error(err));
                return res.status(500).json({
                  status: false,
                  error: err,
                });
              });
          })
          .catch((err) => {
            logging.controllerLogger.error(new Error(err));
            return res.status(500).json({
              status: false,
              error: err,
            });
          });
      })
      .catch((err) => {
        logging.controllerLogger.error(new Error(err));
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
            const log = logging.userLogs(String(user?.superuserId));
            user?.getDailyRpts()
              .then((reports) => {
                log.info(`All daily reports accessed by ${reqId}`);
                return res.status(200).json({
                  status: true,
                  reports: reports,
                });
              })
              .catch((err) => {
                log.error(new Error(err));
                return res.status(500).json({
                  status: false,
                  error: err,
                });
              });
          })
          .catch((err) => {
            logging.controllerLogger.error(new Error(err));
            return res.status(500).json({
              status: false,
              error: err,
            });
          });
      })
      .catch((err) => {
        logging.controllerLogger.error(new Error(err));
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
            const log = logging.userLogs(String(user?.superuserId));
            user?.countDailyRpts()
              .then((reports) => {
                log.info(`total number of reports accessed by ${reqId}`);
                return res.status(200).json({
                  status: true,
                  totalNumberOfReports: reports,
                });
              })
              .catch((err) => {
                log.error(new Error(err));
                return res.status(500).json({
                  status: false,
                  error: err,
                });
              });
          })
          .catch((err) => {
            logging.controllerLogger.error(new Error(err));
            return res.status(500).json({
              status: false,
              error: err,
            });
          });
      })
      .catch((err) => {
        logging.controllerLogger.error(new Error(err));
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
            const log = logging.userLogs(String(user?.superuserId));
            user?.getChatRooms()
              .then((chats) => {
                log.info(`all chats accessed by ${reqId}`);
                return res.status(200).json({
                  status: true,
                  chats: chats,
                });
              })
              .catch((err) => {
                log.error(new Error(err));
                return res.status(500).json({
                  status: false,
                  error: err,
                });
              });
          })
          .catch((err) => {
            logging.controllerLogger.error(new Error(err));
            return res.status(500).json({
              status: false,
              error: err,
            });
          });
      })
      .catch((err) => {
        logging.controllerLogger.error(new Error(err));
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
            const log = logging.userLogs(String(user?.superuserId));
            user?.countChatRooms()
              .then((chats) => {
                log.info(`Total number of chats accessed by ${reqId}`);
                return res.status(200).json({
                  status: true,
                  totalNumberOfChats: chats,
                });
              })
              .catch((err) => {
                log.error(new Error(err));
                return res.status(500).json({
                  status: false,
                  error: err,
                });
              });
          })
          .catch((err) => {
            logging.controllerLogger.error(new Error(err));
            return res.status(500).json({
              status: false,
              error: err,
            });
          });
      })
      .catch((err) => {
        logging.controllerLogger.error(new Error(err));
        return res.status(500).json({
          status: false,
          error: err,
        })
      })
  },

  updateUser: async (req: Request, res: Response) => {
    const {
      params: { userId },
      body: payload
    } = req;
    const _user = await userCrud.findUser({ userId: userId });
    const log = logging.userLogs(String(_user?.superuserId));

    // if the payload does not have any keys, return an error
    if (!Object.keys(payload).length) {
      log.error(new Error('No update provided'));
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
        log.info(`update on User ${user?.userId} performed by ${req.user.userId}`);
        return res.status(200).json({
          status: true,
          data: user?.toJSON()
        });
      })
      .catch((err) => {
        log.error(new Error(err));
        return res.status(500).json({
          status: false,
          error: err,
        });
      });
  },

  deleteUser: async (req: Request, res: Response) => {
    const {
      params: { userId }
    } = req;
    
    const _user = await userCrud.findUser({ userId: userId });
    const log = logging.userLogs(String(_user?.superuserId));

    userCrud.deleteUser({ userId: userId })
      .then((numberOfUsersDeleted) => {
        log.warn(`User: ${userId} deleted by ${req.user.userId}`);
        return res.status(200).json({
          status: true,
          data: { numberOfEntriesDeleted: numberOfUsersDeleted },
        });
      })
      .catch((err) => {
        log.error(new Error(err));
        return res.status(500).json({
          status: false,
          error: err,
        });
      });
  }
}
