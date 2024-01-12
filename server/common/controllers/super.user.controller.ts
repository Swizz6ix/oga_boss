import { Request, Response } from 'express';
import { superUserCrud } from '../models/super.user.js';
import { controllerLogger } from '../../engine/logging.js';

export const superUserController = {
  getUser: (req: any, res: Response) => {
    const reqId = req.user.userId;
    const {
      params: { userId }
    } = req;

    if (reqId !== userId) {
      controllerLogger.warn(`User: ${reqId} tried to access endpoint associated with User ${userId}`);
      return res.status(500).json({
        status: false,
        error: `This endpoint is above the pay grad of user ${reqId}`
      })
    }
    superUserCrud.findUser({ superuserId: userId })
      .then((user) => {
        controllerLogger.info(`Superuser ${user?.superuserId} retrieved by ${reqId}`);
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
  },

  getUsers: (req: Request, res: Response) => {
    const {
      params: { userId }
    } = req;

    superUserCrud.findUser({ superuserId: userId })
      .then((user) => {
        user?.getUsers()
          .then((users) => {
            controllerLogger.info(
              `All users in the server ${user.superuserId} retrieved by User ${req.user.userId}`
            );
            return res.status(200).json({
              status: true,
              users: users,
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

  getUsersCount: (req: Request, res: Response) => {
    const {
      params: { userId }
    } = req;

    superUserCrud.findUser({ superuserId: userId })
      .then((user) => {
        user?.countUsers()
          .then((users) => {
            controllerLogger.info(
              `Total number of users in server ${user.superuserId} retrieved by ${req.user.userId}`
            )
            return res.status(200).json({
              status: true,
              totalNumberOfUsers: users,
            })
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

  getDepartments: (req: Request, res: Response) => {
    const {
      params: { userId }
    } = req;

    superUserCrud.findUser({ superuserId: userId })
      .then((user) => {
        user?.getDepartments()
          .then((dept) => {
            controllerLogger.info(
              `All departments in server ${user.superuserId} retrieved by user ${req.user.userId}`,
            )
            return res.status(200).json({
              status: true,
              dept: dept,
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

  getDepartMentsCount: (req: Request, res: Response) => {
    const reqId = req.user.userId;
    const {
      params: { userId }
    } = req;

    superUserCrud.findUser({ superuserId: userId })
      .then((user) => {
        user?.countDepartments()
          .then((departments) => {
            controllerLogger.info(
              `Total number of Departments in server ${user.superuserId} retrieved by ${reqId}`,
            )
            return res.status(200).json({
              status: true,
              totalNumberOfDepartments: departments,
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

  getTasks: (req: Request, res: Response) => {
    const {
      params: { userId }
    } = req;

    superUserCrud.findUser({ superuserId: userId })
      .then((user) => {
        user?.getTasks()
          .then((tasks) => {
            controllerLogger.info(
              `All tasks in server ${user.superuserId} retrieved by User ${req.user.userId}`,
            );
            return res.status(200).json({
              status: true,
              tasks: tasks,
            })
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

  getTasksCount: (req: Request, res: Response) => {
    const {
      params: { userId }
    } = req;

    superUserCrud.findUser({ superuserId: userId })
      .then((user) => {
        user?.countTasks()
          .then((tasks) => {
            controllerLogger.info(
              `Total number of tasks in server ${user.superuserId} retrieved by ${req.user.userId}`
            );
            return res.status(200).json({
              status: true,
              totalNumberOfTasks: tasks,
            })
          })
          .catch((err) => {
            controllerLogger.error(new Error(err));
            return res.status(200).json({
              status: true,
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

  updateUser: (req: any, res: Response) => {
    const reqId = req.user.userId;
    const {
      params: { userId },
      body: payload,
    } = req;

    if (reqId !== userId) {
      controllerLogger.warn(
        `User ${reqId} tried to access endpoint associated with User: ${userId}`
      )
      return res.status(500).json({
        status: false,
        error: `This endpoint is above the pay grad of user ${reqId}`
      })
    }

    // If the payload doesn't have any keys, return error
    if (!Object.keys(payload).length) {
      controllerLogger.error(new Error('No update provided'));
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
        controllerLogger.info(`Update on Superuser ${user?.superuserId} performed by ${reqId}`);
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
  },

  deleteUser: (req: any, res: Response) => {
    const reqId = req.user.userId;
    const {
      params: { userId }
    } = req;

    if (reqId !== userId) {
      controllerLogger.warn(
        `User ${reqId} tried to delete User ${userId}`,
      );
      return res.status(500).json({
        status: false,
        error: `This endpoint is above the pay grad of user ${reqId}`,
      });
    }
    
    superUserCrud.deleteUser({ superuserId: userId })
      .then((numberOfUsersDeleted) => {
        controllerLogger.info(`Superuser ${userId} was deleted by User ${reqId}`);
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
  },
}
