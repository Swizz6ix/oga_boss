import { taskCrud } from "../models/task";
export const taskController = {
    newTask: (req, res) => {
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
    getTask: (req, res) => {
        const { params: { taskId } } = req;
        taskCrud.findTask({ id: taskId })
            .then((task) => {
            return res.status(200).json({
                status: true,
                data: task === null || task === void 0 ? void 0 : task.toJSON(),
            });
        })
            .catch((err) => {
            return res.status(500).json({
                status: false,
                error: err,
            });
        });
    },
    getAllTasks: (req, res) => {
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
    updateTask: (req, res) => {
        const { params: { taskId }, body: payload } = req;
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
                data: task === null || task === void 0 ? void 0 : task.toJSON(),
            });
        })
            .catch((err) => {
            return res.status(500).json({
                status: false,
                error: err,
            });
        });
    },
    deleteTask: (req, res) => {
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
};
//# sourceMappingURL=task.contoller.js.map