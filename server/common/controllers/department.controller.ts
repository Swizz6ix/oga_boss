import { Request, Response } from "express";
import { departmentCrud } from "../models/department.js";
import { user } from "../middlewares/user.middleware.js";
import { logging } from "../../engine/logging.js";

export const departmentController = {
  addDepartment: (req: Request, res: Response) => {
    const payload = req.body;
    departmentCrud.addDept(Object.assign(payload))
      .then((dept) => {
        const log = logging.userLogs(String(dept.superuserId));
        log.info(
          `Department ${dept.departmentId} has just been created by  User ${req.user.userId}`)
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

  getAllDept: (req: Request, res: Response) => {
    const {
      user: { userId }
    } = req;

    user._user_id(userId)
      .then((id) => {
        const log = logging.userLogs(String(id))
        log.info(
          `All departments in the server ${id} retrieved by user ${req.user.userId}`,
        );
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

  getDept: (req: Request, res: Response) => {
    const {
      params: { deptId }
    } = req;

    departmentCrud.findDept({ departmentId: deptId })
      .then((dept) => {
        const log = logging.userLogs(String(dept?.superuserId));
        log.info(`Department: ${deptId} retrieved by User: ${req.user.userId}`)
        return res.status(200).json({
          status: true,
          data: dept?.toJSON(),
        });
      })
      .catch((err) => {
        logging.controllerLogger.error(new Error(err));
        return res.status(500).json({
          status: false,
          error: err,
        });
      })
  },

  updateDept: (req: Request, res: Response) => {
    const {
      params: { deptId },
      body: payload,
    } = req;

    // If the payload doesn't have any keys, return error
    if (!Object.keys(payload).length) {
      return res.status(400).json({
        status: false,
        error: {
          message: 'Body is empty, hence cannot update the dept',
        }
      })
    }
    departmentCrud.updateDept({ departmentId: deptId }, payload)
      .then(() => {
        return departmentCrud.findDept({ departmentId: deptId });
      })
      .then((dept) => {
        const log = logging.userLogs(String(dept?.superuserId))
        log.info(
          `Update on Department ${dept?.departmentId} performed by ${req.user.userId}`
        );
        return res.status(200).json({
          status: true,
          data: dept?.toJSON(),
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

  deleteDept: async (req: Request, res: Response) => {
    const {
      params: { deptId }
    } = req;
    const dept = await departmentCrud.findDept({ deptId: deptId })
    const log = logging.userLogs(String(dept?.superuserId));
    departmentCrud.deleteDept({ departmentId: deptId })
      .then((numberOfDepartmentDeleted) => {
        log.warn(`Department ${deptId} was deleted by user ${req.user.userId}`
        );
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
  },
}
