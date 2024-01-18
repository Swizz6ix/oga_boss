import { Request, Response } from 'express';
import { taskCrud } from '../models/task.js';
import { user } from '../middlewares/user.middleware.js';
import { logging } from '../../engine/logging.js';

export const taskController = {
  newTask: (req: Request, res: Response) => {
    const payload = req.body;
    taskCrud.createTask(Object.assign(payload))
      .then((task) => {
        const log = logging.userLogs(String(task.superuserId));
        log.info(`Task: ${task.taskId} has just been created by User: ${req.user.userId}`);
        return res.status(201).json({
          status: true,
          task: task.toJSON(),
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

  getTask: (req: Request, res: Response) => {
    const reqId = req.user.userId;
    const {
      params: { taskId }
    } = req;

    taskCrud.findTask({ taskId: taskId })
      .then((task) => {
        const log = logging.userLogs(String(task?.superuserId));
        if (reqId !== task?.userId) {
          log.warn(
            `User ${reqId} tried to access an unauthorized task ${task?.taskId}`
          );
          return res.status(500).json({
            status: false,
            error: `User ${reqId} does not have the required permission`,
          });
        }
        log.info(`Task: ${task?.taskId}, accessed by User ${reqId}`);
        return res.status(200).json({
          status: true,
          data: task?.toJSON(),
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

  getAllTasks: (req: any, res: Response) => {
    const {
      user: { userId }
    } = req;

    user._user_id(userId)
      .then((id) => {
        const log = logging.userLogs(String(id));
        taskCrud.findAllTasks({ superuserId: id })
          .then((tasks) => {
            log.info(`All tasks in server ${id} accessed by User ${userId}`)
            return res.status(200).json({
              status: true,
              data: tasks,
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

  updateTask: async (req: Request, res: Response) => {
    const {
      params: { taskId },
      body: payload
    } = req;

    const task = await taskCrud.findTask({ taskId: taskId});
    const log = logging.userLogs(String(task?.superuserId));

    // if the payload does not have any keys, return error
    if (!Object.keys(payload).length) {
      log.error(new Error('No update provided'));
      return res.status(400).json({
        status: false,
        error: {
          message: 'Body is empty, hence cannot update the user',
        },
      });
    }
    taskCrud.updateTask({ taskId: taskId }, payload)
      .then(() => {
        return taskCrud.findTask({ taskId: taskId });
      })
      .then(async (task) => {
        log.info(`Update on Task ${task?.taskId} performed by ${req.user.userId}`);
        return res.status(200).json({
          status: true,
          data: task?.toJSON(),
        });
      })
      .catch((err) => {
        logging.controllerLogger.error(new Error(err));
        return res.status(500).json({
          status: false,
          error: err,
        })
      });
  },

  deleteTask: async (req: Request, res: Response) => {
    const {
      params: { taskId }
    } = req;

    const task = await taskCrud.findTask({ taskId: taskId })
    const _superuserId = await user._user_id(String(task?.userId));
    const log = logging.userLogs(String(_superuserId));

    taskCrud.deleteTask({ taskId: taskId })
      .then((numberOfTasksDeleted) => {
        log.warn(`Task: ${taskId} deleted by User ${req.user.userId}`);
        return res.status(200).json({
          status: true,
          data: { numberOfEntriesDeleted: numberOfTasksDeleted },
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
