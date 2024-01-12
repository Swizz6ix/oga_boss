import { taskCrud } from '../models/task.js';
import { user } from '../middlewares/user.middleware.js';
import { controllerLogger } from '../../engine/logging.js';
export const taskController = {
    newTask: (req, res) => {
        const payload = req.body;
        taskCrud.createTask(Object.assign(payload))
            .then((task) => {
            controllerLogger.info(`Task: ${task.taskId} has just been created by User: ${req.user.userId}`);
            return res.status(201).json({
                status: true,
                task: task.toJSON(),
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
    getTask: (req, res) => {
        const reqId = req.user.userId;
        const { params: { taskId } } = req;
        taskCrud.findTask({ taskId: taskId })
            .then((task) => {
            if (reqId !== (task === null || task === void 0 ? void 0 : task.userId)) {
                controllerLogger.warn(`User ${reqId} tried to access an unauthorized task ${task === null || task === void 0 ? void 0 : task.taskId}`);
                return res.status(500).json({
                    status: false,
                    error: `User ${reqId} does not have the required permission`,
                });
            }
            controllerLogger.info(`Task: ${task === null || task === void 0 ? void 0 : task.taskId}, accessed by User ${reqId}`);
            return res.status(200).json({
                status: true,
                data: task === null || task === void 0 ? void 0 : task.toJSON(),
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
    getAllTasks: (req, res) => {
        const { user: { userId } } = req;
        user._user_id(userId)
            .then((id) => {
            taskCrud.findAllTasks({ superuserId: id })
                .then((tasks) => {
                controllerLogger.info(`All tasks in server ${id} accessed by User ${userId}`);
                return res.status(200).json({
                    status: true,
                    data: tasks,
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
    updateTask: (req, res) => {
        const { params: { taskId }, body: payload } = req;
        // if the payload does not have any keys, return error
        if (!Object.keys(payload).length) {
            controllerLogger.error(new Error('No update provided'));
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
            .then((task) => {
            controllerLogger.info(`Update on Task ${task === null || task === void 0 ? void 0 : task.taskId} performed by ${req.user.userId}`);
            return res.status(200).json({
                status: true,
                data: task === null || task === void 0 ? void 0 : task.toJSON(),
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
    deleteTask: (req, res) => {
        const { params: { taskId } } = req;
        taskCrud.deleteTask({ taskId: taskId })
            .then((numberOfTasksDeleted) => {
            controllerLogger.warn(`Task: ${taskId} deleted by User ${req.user.userId}`);
            return res.status(200).json({
                status: true,
                data: { numberOfEntriesDeleted: numberOfTasksDeleted },
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
};
//# sourceMappingURL=task.controller.js.map