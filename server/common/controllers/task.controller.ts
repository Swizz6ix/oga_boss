import { Request, Response } from 'express';
import { taskCrud } from '../models/task.js';
import { user } from '../middlewares/user.middleware.js';
import { configs } from '../../config.js';

const _role = configs.roles.ADMIN;

export const taskController = {
  newTask: (req: Request, res: Response) => {
    const payload = req.body;
    taskCrud.createTask(Object.assign(payload))
      .then((task) => {
        return res.status(201).json({
          status: true,
          task: task.toJSON(),
        });
      })
      .catch((err) => {
        return res.status(500).json({
          status: false,
          error: err,
        });
      });
  },

  getTask: (req: any, res: Response) => {
    const reqId = req.user.userId;
    console.log('>>>', reqId)
    const {
      params: { taskId }
    } = req;

    taskCrud.findTask({ id: taskId })
      .then((task) => {
        console.log('dess', task?.UserId)
        if (reqId !== task?.UserId) {
          return res.status(500).json({
            status: false,
            error: `User ${reqId} does not have the required permission`,
          });
        }
        return res.status(200).json({
          status: true,
          data: task?.toJSON(),
        });
      })
      .catch((err) => {
        return res.status(500).json({
          status: false,
          error: err,
        });
      });
  },

  getAllTasks: (req: any, res: Response) => {
    const {
      user: { userId }
    } = req;

    user._user_id(userId)
      .then((id) => {
        taskCrud.findAllTasks({ SuperUserId: id })
          .then((tasks) => {
            return res.status(200).json({
              status: true,
              data: tasks,
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

  updateTask: (req: Request, res: Response) => {
    const {
      params: { taskId },
      body: payload
    } = req;

    // if the payload does not have any keys, return error
    if (!Object.keys(payload).length) {
      return res.status(400).json({
        status: false,
        error: {
          message: 'Body is empty, hence cannot update the user',
        },
      });
    }
    taskCrud.updateTask({ id: taskId }, payload)
      .then(() => {
        return taskCrud.findTask({ id: taskId });
      })
      .then((task) => {
        return res.status(200).json({
          status: true,
          data: task?.toJSON(),
        });
      })
      .catch((err) => {
        return res.status(500).json({
          status: false,
          error: err,
        })
      });
  },

  deleteTask: (req: Request, res: Response) => {
    const {
      params: { taskId }
    } = req;

    taskCrud.deleteTask({ id: taskId })
      .then((numberOfTasksDeleted) => {
        return res.status(200).json({
          status: true,
          data: { numberOfEntriesDeleted: numberOfTasksDeleted },
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
