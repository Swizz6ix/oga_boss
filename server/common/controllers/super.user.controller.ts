import { Request, Response } from 'express';
import { superUserCrud } from '../models/super.user.js';
import { logging } from '../../engine/logging.js';
import { user } from '../middlewares/user.middleware.js';

export const superUserController = {
  getUser: async (req: any, res: Response) => {
    const reqId = req.user.userId;
    const {
      params: { userId }
    } = req;
    const _superuserId = await user._user_id(String(userId));
    const log = logging.userLogs(String(_superuserId));

    if (reqId !== userId) {
      log.warn(`User: ${reqId} tried to access endpoint associated with User ${userId}`);
      return res.status(500).json({
        status: false,
        error: `This endpoint is above the pay grad of user ${reqId}`
      })
    }
    superUserCrud.findUser({ superuserId: userId })
      .then((user) => {
        log.info(`Superuser ${user?.superuserId} retrieved by ${reqId}`);
        return res.status(200).json({
          status: true,
          data: user?.toJSON(),
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

  getUsers: (req: Request, res: Response) => {
    const {
      params: { userId }
    } = req;

    superUserCrud.findUser({ superuserId: userId })
      .then((user) => {
        const log = logging.userLogs(String(user?.superuserId));
        user?.getUsers()
          .then((users) => {
            log.info(
              `All users in the server ${user.superuserId} retrieved by User ${req.user.userId}`
            );
            return res.status(200).json({
              status: true,
              users: users,
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

  getUsersCount: (req: Request, res: Response) => {
    const {
      params: { userId }
    } = req;

    superUserCrud.findUser({ superuserId: userId })
      .then((user) => {
        const log = logging.userLogs(String(user?.superuserId));
        user?.countUsers()
          .then((users) => {
            log.info(
              `Total number of users in server ${user.superuserId} retrieved by ${req.user.userId}`
            )
            return res.status(200).json({
              status: true,
              totalNumberOfUsers: users,
            })
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

  getDepartments: (req: Request, res: Response) => {
    const {
      params: { userId }
    } = req;

    superUserCrud.findUser({ superuserId: userId })
      .then((user) => {
        const log = logging.userLogs(String(user?.superuserId));
        user?.getDepartments()
          .then((dept) => {
            log.info(
              `All departments in server ${user.superuserId} retrieved by user ${req.user.userId}`,
            )
            return res.status(200).json({
              status: true,
              dept: dept,
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

  getDepartMentsCount: (req: Request, res: Response) => {
    const reqId = req.user.userId;
    const {
      params: { userId }
    } = req;

    superUserCrud.findUser({ superuserId: userId })
      .then((user) => {
        const log = logging.userLogs(String(user?.superuserId));
        user?.countDepartments()
          .then((departments) => {
            log.info(
              `Total number of Departments in server ${user.superuserId} retrieved by ${reqId}`,
            )
            return res.status(200).json({
              status: true,
              totalNumberOfDepartments: departments,
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
        })
      })
  },

  getTasks: (req: Request, res: Response) => {
    const {
      params: { userId }
    } = req;

    superUserCrud.findUser({ superuserId: userId })
      .then((user) => {
        const log = logging.userLogs(String(user?.superuserId))
        user?.getTasks()
          .then((tasks) => {
            log.info(
              `All tasks in server ${user.superuserId} retrieved by User ${req.user.userId}`,
            );
            return res.status(200).json({
              status: true,
              tasks: tasks,
            })
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

  getTasksCount: (req: Request, res: Response) => {
    const {
      params: { userId }
    } = req;

    superUserCrud.findUser({ superuserId: userId })
      .then((user) => {
        const log = logging.userLogs(String(user?.superuserId))
        user?.countTasks()
          .then((tasks) => {
            log.info(
              `Total number of tasks in server ${user.superuserId} retrieved by ${req.user.userId}`
            );
            return res.status(200).json({
              status: true,
              totalNumberOfTasks: tasks,
            })
          })
          .catch((err) => {
            log.error(new Error(err));
            return res.status(200).json({
              status: true,
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

  updateUser: async (req: any, res: Response) => {
    const reqId = req.user.userId;
    const {
      params: { userId },
      body: payload,
    } = req;

    const _user = await superUserCrud.findUser({ superuserId: userId });
    const log = logging.userLogs(String(_user?.superuserId));

    if (reqId !== userId) {
      log.warn(
        `User ${reqId} tried to access endpoint associated with User: ${userId}`
      )
      return res.status(500).json({
        status: false,
        error: `This endpoint is above the pay grad of user ${reqId}`
      })
    }

    // If the payload doesn't have any keys, return error
    if (!Object.keys(payload).length) {
      log.error(new Error('No update provided'));
      return res.status(400).json({
        status: false,
        error: {
          message: 'Body is empty, hence cannot update the user',
        },
      });
    }
    superUserCrud.updateUser({ superuserId: userId }, payload)
      .then(() => {
        return superUserCrud.findUser({ superuserId: userId });
      })
      .then((user) => {
        log.info(`Update on Superuser ${user?.superuserId} performed by ${reqId}`);
        return res.status(200).json({
          status: true,
          data: user?.toJSON(),
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

  deleteUser: async (req: any, res: Response) => {
    const reqId = req.user.userId;
    const {
      params: { userId }
    } = req;

    const _user = await superUserCrud.findUser({ superuserId: userId });
    const log = logging.userLogs(String(_user?.superuserId));

    if (reqId !== userId) {
      log.warn(
        `User ${reqId} tried to delete User ${userId}`,
      );
      return res.status(500).json({
        status: false,
        error: `This endpoint is above the pay grad of user ${reqId}`,
      });
    }
    
    superUserCrud.deleteUser({ superuserId: userId })
      .then((numberOfUsersDeleted) => {
        log.info(`Superuser ${userId} was deleted by User ${reqId}`);
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
  },
}
