import { taskCrud } from "../models/task.js";

export const taskController = {
  newTask: (req: any, res: any) => {
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

  getTask: (req: any, res: any) => {
    const { params: { taskId } } = req;
    taskCrud.findTask({ id: taskId })
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
        });
      });
  },

  getAllTasks: (req: any, res: any) => {
    taskCrud.findAllTasks(req.query)
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
  },

  updateTask: (req: any, res: any) => {
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
        });
      });
  },

  deleteTask: (req: any, res: any) => {
    const { params: { taskId } } = req;
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