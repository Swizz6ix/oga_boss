import { departmentCrud } from "../models/department.js";
import { user } from "../middlewares/user.middleware.js";
import { controllerLogger } from "../../engine/logging.js";
export const departmentController = {
    addDepartment: (req, res) => {
        const payload = req.body;
        departmentCrud.addDept(Object.assign(payload))
            .then((dept) => {
            controllerLogger.info(`Department ${dept.departmentId} has just been created by  User ${req.user.userId}`);
            return res.status(201).json({
                dept: dept.toJSON(),
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
    getAllDept: (req, res) => {
        const { user: { userId } } = req;
        user._user_id(userId)
            .then((id) => {
            controllerLogger.info(`All departments in the server ${id} retrieved by user ${req.user.userId}`);
            departmentCrud.findAllDept({ superuserId: id })
                .then((dept) => {
                return res.status(200).json({
                    status: true,
                    data: dept,
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
    getDept: (req, res) => {
        const { params: { deptId } } = req;
        departmentCrud.findDept({ departmentId: deptId })
            .then((dept) => {
            controllerLogger.info(`Department: ${deptId} retrieved by User: ${req.user.userId}`);
            return res.status(200).json({
                status: true,
                data: dept === null || dept === void 0 ? void 0 : dept.toJSON(),
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
    updateDept: (req, res) => {
        const { params: { deptId }, body: payload, } = req;
        // If the payload doesn't have any keys, return error
        if (!Object.keys(payload).length) {
            return res.status(400).json({
                status: false,
                error: {
                    message: 'Body is empty, hence cannot update the dept',
                }
            });
        }
        departmentCrud.updateDept({ departmentId: deptId }, payload)
            .then(() => {
            return departmentCrud.findDept({ departmentId: deptId });
        })
            .then((dept) => {
            controllerLogger.info(`Update on Department ${dept === null || dept === void 0 ? void 0 : dept.departmentId} performed by ${req.user.userId}`);
            return res.status(200).json({
                status: true,
                data: dept === null || dept === void 0 ? void 0 : dept.toJSON(),
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
    deleteDept: (req, res) => {
        const { params: { deptId } } = req;
        departmentCrud.deleteDept({ departmentId: deptId })
            .then((numberOfDepartmentDeleted) => {
            controllerLogger.warn(`Department ${deptId} was deleted by user ${req.user.userId}`);
            return res.status(200).json({
                status: true,
                data: { numberOfEntriesDeleted: numberOfDepartmentDeleted },
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
};
//# sourceMappingURL=department.controller.js.map