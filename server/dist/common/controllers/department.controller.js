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
    addDepartment: (req, res) => {
        const payload = req.body;
        departmentCrud.addDept(Object.assign(payload))
            .then((dept) => {
            const log = logging.userLogs(String(dept.superuserId));
            log.info(`Department ${dept.departmentId} has just been created by  User ${req.user.userId}`);
            return res.status(201).json({
                dept: dept.toJSON(),
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
    getDept: (req, res) => {
        const { params: { deptId } } = req;
        departmentCrud.findDept({ departmentId: deptId })
            .then((dept) => {
            const log = logging.userLogs(String(dept === null || dept === void 0 ? void 0 : dept.superuserId));
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
            const log = logging.userLogs(String(dept === null || dept === void 0 ? void 0 : dept.superuserId));
            log.info(`Update on Department ${dept === null || dept === void 0 ? void 0 : dept.departmentId} performed by ${req.user.userId}`);
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
    },
    deleteDept: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { params: { deptId } } = req;
        const dept = yield departmentCrud.findDept({ deptId: deptId });
        const log = logging.userLogs(String(dept === null || dept === void 0 ? void 0 : dept.superuserId));
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