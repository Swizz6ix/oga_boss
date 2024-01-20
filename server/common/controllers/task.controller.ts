import { Request, Response } from 'express';
import { taskCrud } from '../models/task.js';
import { user } from '../middlewares/user.middleware.js';
import { logging } from '../../engine/logging.js';
import { userCrud } from '../models/user.js';
import { departmentCrud } from '../models/department.js';

export const taskController = {
  /**
   * 
   * @param req 
   * @param res 
   */
  newTask: async (req: Request, res: Response) => {
    const reqId = req.user.userId;
    const payload = req.body;
    const log = logging.userLogs(payload.superuserId);

    // Confirm payload info
    const _userId = payload.userId;
    const _departmentId = payload.departmentId
    const _user = await userCrud.findUser({ userId: _userId });
    const _department = await departmentCrud.findDept({ departmentId: _departmentId });
  
    // confirm payload info
    if (reqId !== payload.superuserId) {
      log.error(`User ${reqId} tried to create a task on ${payload.superuserId}`);
      return res.status(500).json({
        status: false,
        error: `User ${reqId} don't have the required permission to perform this operation`,
      });
    }
    if (reqId !== _user?.superuserId) {
      log.error(`User ${_userId} does not exist in superuser ${payload.superuserId}`)
      return res.status(500).json({
        status: false,
        error: `User ${_userId} does not exist`,
      })
    }
    if (reqId !== _department?.superuserId) {
      log.error(`Department ${_departmentId} does not exist in superuser ${payload.superuserId}`)
      return res.status(500).json({
        status: false,
        error: `Department ${_departmentId} does not exist`,
      })
    }
    taskCrud.createTask(Object.assign(payload))
      .then((task) => {
        log.info(`Task: ${task.taskId} has just been created by User: ${req.user.userId}`);
        return res.status(201).json({
          status: true,
          task: task.toJSON(),
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

  getTask: (req: Request, res: Response) => {
    const reqId = req.user.userId;
    const {
      params: { taskId }
    } = req;

    taskCrud.findTask({ taskId: taskId })
      .then((task) => {
        const log = logging.userLogs(String(task?.superuserId));

        // Only user assigned to task has access to the task
        if (reqId !== task?.userId) {
          log.warn(
            `User ${reqId} tried to access an unauthorized task ${task?.taskId}`
          );
          return res.status(500).json({
            status: false,
            error: `User ${reqId} doesn't have the required permission to access this information`,
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

  getAllTasks: (req: Request, res: Response) => {
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
    const reqId = req.user.userId;
    const reqAdmin = await user._user_id(reqId);
    const {
      params: { taskId },
      body: payload
    } = req;

    const task = await taskCrud.findTask({ taskId: taskId});
    const log = logging.userLogs(String(task?.superuserId));
    
    // Reject update if the superuser or admin is from another superuser server
    if (reqAdmin !== task?.superuserId) {
      log.warn(`An unknown user ${reqId} tried to update task ${taskId}`);
      return res.status(500).json({
        status: false,
        error: `User ${reqId} don't have the required permission to perform this operation.`,
      });
    }

    // if the payload does not have any keys, return error
    if (!Object.keys(payload).length) {
      log.error(new Error('No update provided'));
      return res.status(400).json({
        status: false,
        error: {
          message: 'No update provided',
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
    const reqId = req.user.userId;
    const {
      params: { taskId }
    } = req;

    const task = await taskCrud.findTask({ taskId: taskId })
    const log = logging.userLogs(String(task?.superuserId));

    // Only superuser who created the task can delete it.
    if (reqId !== task?.superuserId) {
      log.warn(`User ${reqId} tried to delete task ${taskId}.`);
      return res.status(500).json({
        status: false,
        error: `User ${reqId} does not have the required permission to perform this operation`,
      });
    }

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
