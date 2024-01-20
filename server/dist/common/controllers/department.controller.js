var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { departmentCrud } from "../models/department.js";
import { user } from "../middlewares/user.middleware.js";
import { logging } from "../../engine/logging.js";
export const departmentController = {
    /**
     *
     * @param req
     * @param res
     */
    addDepartment: (req, res) => {
        const reqId = req.user.userId;
        const payload = req.body;
        const log = logging.userLogs(payload.superuserId);
        // Another superuser can't create a department on another superuser other than their own.
        if (reqId !== payload.superuserId) {
            log.warn(`User ${reqId} tried to create a department on $(payload.superuserId)`);
            return res.status(500).json({
                status: false,
                error: `User ${reqId} don't have the required permission to perform the operation.`,
            });
        }
        departmentCrud.addDept(Object.assign(payload))
            .then((dept) => {
            log.info(`Department ${dept.departmentId} has just been created by  User ${req.user.userId}`);
            return res.status(201).json({
                dept: dept.toJSON(),
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
    getAllDept: (req, res) => {
        const { user: { userId } } = req;
        user._user_id(userId)
            .then((id) => {
            const log = logging.userLogs(String(id));
            log.info(`All departments in the server ${id} retrieved by user ${req.user.userId}`);
            departmentCrud.findAllDept({ superuserId: id })
                .then((dept) => {
                return res.status(200).json({
                    status: true,
                    data: dept,
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
    getDept: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const reqId = req.user.userId;
        const _superuserId = yield user._user_id(reqId);
        const { params: { deptId } } = req;
        departmentCrud.findDept({ departmentId: deptId })
            .then((dept) => {
            const log = logging.userLogs(String(dept === null || dept === void 0 ? void 0 : dept.superuserId));
            // Only user assigned to task has access to the task
            if (_superuserId !== (dept === null || dept === void 0 ? void 0 : dept.superuserId)) {
                log.warn(`User ${reqId} tried to access an unauthorized department ${dept === null || dept === void 0 ? void 0 : dept.departmentId}`);
                return res.status(500).json({
                    status: false,
                    error: `User ${reqId} doesn't have the required permission to access this information`,
                });
            }
            log.info(`Department: ${deptId} retrieved by User: ${req.user.userId}`);
            return res.status(200).json({
                status: true,
                data: dept === null || dept === void 0 ? void 0 : dept.toJSON(),
            });
        })
            .catch((err) => {
            logging.controllerLogger.error(new Error(err));
            return res.status(500).json({
                status: false,
                error: err,
            });
        });
    }),
    updateDept: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const reqId = req.user.userId;
        const reqAdmin = yield user._user_id(reqId);
        const { params: { deptId }, body: payload, } = req;
        const dept = yield departmentCrud.findDept({ departmentId: deptId });
        const log = logging.userLogs(String(dept === null || dept === void 0 ? void 0 : dept.superuserId));
        // Reject update if the superuser is of another superuser server
        if (reqAdmin !== (dept === null || dept === void 0 ? void 0 : dept.superuserId)) {
            log.warn(`User ${reqId} tried to update department ${deptId}`);
            return res.status(500).json({
                status: false,
                error: `User ${reqId} don't have the required permission to perform this operation.`,
            });
        }
        // If the payload doesn't have any keys, return error
        if (!Object.keys(payload).length) {
            return res.status(400).json({
                status: false,
                error: {
                    message: 'no update provided',
                }
            });
        }
        departmentCrud.updateDept({ departmentId: deptId }, payload)
            .then(() => {
            return departmentCrud.findDept({ departmentId: deptId });
        })
            .then((dept) => {
            log.info(`Update on Department ${dept === null || dept === void 0 ? void 0 : dept.departmentId} performed by ${req.user.userId}`);
            return res.status(200).json({
                status: true,
                data: dept === null || dept === void 0 ? void 0 : dept.toJSON(),
            });
        })
            .catch((err) => {
            log.error(new Error(err));
            return res.status(500).json({
                status: false,
                error: err,
            });
        });
    }),
    deleteDept: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const reqId = req.user.userId;
        const { params: { deptId } } = req;
        const dept = yield departmentCrud.findDept({ deptId: deptId });
        const log = logging.userLogs(String(dept === null || dept === void 0 ? void 0 : dept.superuserId));
        // Only the superuser who created can possibly destroy.
        if (reqId !== (dept === null || dept === void 0 ? void 0 : dept.superuserId)) {
            log.warn(`User ${reqId} tried to delete department ${deptId}`);
            return res.status(500).json({
                status: false,
                error: `User ${reqId} does not have the required permission to perform this operation.`,
            });
        }
        departmentCrud.deleteDept({ departmentId: deptId })
            .then((numberOfDepartmentDeleted) => {
            log.warn(`Department ${deptId} was deleted by user ${req.user.userId}`);
            return res.status(200).json({
                status: true,
                data: { numberOfEntriesDeleted: numberOfDepartmentDeleted },
            });
        })
            .catch((err) => {
            log.error(new Error(err));
            return res.status(500).json({
                status: false,
                error: err,
            });
        });
    }),
};
//# sourceMappingURL=department.controller.js.map