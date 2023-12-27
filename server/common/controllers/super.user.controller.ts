import { Request, Response } from 'express';
import { superUserCrud } from '../models/super.user.js';

export const superUserController = {
  getUser: (req: any, res: Response) => {
    const reqId = req.user.userId;
    const {
      params: { userId }
    } = req;

    if (reqId !== userId) {
      return res.status(500).json({
        status: false,
        error: `This endpoint is above the pay grad of user ${reqId}`
      })
    }
    superUserCrud.findUser({ id: userId })
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

  getUsers: (req: Request, res: Response) => {
    const {
      params: { userId }
    } = req;

    superUserCrud.findUser({ id: userId })
      .then((user) => {
        user?.getUsers()
          .then((users) => {
            return res.status(200).json({
              status: true,
              users: users,
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

  getUsersCount: (req: Request, res: Response) => {
    const {
      params: { userId }
    } = req;

    superUserCrud.findUser({ id: userId })
      .then((user) => {
        user?.countUsers()
          .then((users) => {
            return res.status(200).json({
              status: true,
              totalNumberOfUsers: users,
            })
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

  getDepartments: (req: Request, res: Response) => {
    const {
      params: { userId }
    } = req;

    superUserCrud.findUser({ id: userId })
      .then((user) => {
        user?.getDepartments()
          .then((dept) => {
            return res.status(200).json({
              status: true,
              dept: dept,
            })
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

  getDepartMentsCount: (req: Request, res: Response) => {
    const {
      params: { userId }
    } = req;

    superUserCrud.findUser({ id: userId })
      .then((user) => {
        user?.countDepartments()
          .then((departments) => {
            return res.status(200).json({
              status: true,
              totalNumberOfDepartments: departments,
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

  getTasks: (req: Request, res: Response) => {
    const {
      params: { userId }
    } = req;

    superUserCrud.findUser({ id: userId })
      .then((user) => {
        user?.getTasks()
          .then((tasks) => {
            return res.status(200).json({
              status: true,
              tasks: tasks,
            })
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

  getTasksCount: (req: Request, res: Response) => {
    const {
      params: { userId }
    } = req;

    superUserCrud.findUser({ id: userId })
      .then((user) => {
        user?.countTasks()
          .then((tasks) => {
            return res.status(200).json({
              status: true,
              totalNumberOfTasks: tasks,
            })
          })
          .catch((err) => {
            return res.status(200).json({
              status: true,
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

  updateUser: (req: any, res: Response) => {
    const reqId = req.user.userId;
    const {
      params: { userId },
      body: payload,
    } = req;

    if (reqId !== userId) {
      return res.status(500).json({
        status: false,
        error: `This endpoint is above the pay grad of user ${reqId}`
      })
    }

    // If the payload doesn't have any keys, return error
    if (!Object.keys(payload).length) {
      return res.status(400).json({
        status: false,
        error: {
          message: 'Body is empty, hence cannot update the user',
        },
      });
    }
    superUserCrud.updateUser({ id: userId }, payload)
      .then(() => {
        return superUserCrud.findUser({ id: userId });
      })
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
  deleteUser: (req: any, res: Response) => {
    const reqId = req.user.userId;
    const {
      params: { id: userId }
    } = req;

    if (reqId !== userId) {
      return res.status(500).json({
        status: false,
        error: `This endpoint is above the pay grad of user ${reqId}`
      })
    }
    
    superUserCrud.deleteUser({ id: userId })
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
  },
}
