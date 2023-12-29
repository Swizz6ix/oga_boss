import { Request, Response } from "express";
import { departmentCrud } from "../models/department.js";
import { user } from "../middlewares/user.middleware.js";

export const departmentController = {
  addDepartment: (req: Request, res: Response) => {
    const payload = req.body;
    departmentCrud.addDept(Object.assign(payload))
      .then((dept) => {
        return res.status(201).json({
          dept: dept.toJSON(),
        });
      })
      .catch((err) => {
        return res.status(500).json({
          status: false,
          error: err,
        });
      });
  },
  getAllDept: (req: any, res: Response) => {
    const {
      user: { userId }
    } = req;

    user._user_id(userId)
      .then((id) => {
        departmentCrud.findAllDept({ superuserId: id })
          .then((dept) => {
            return res.status(200).json({
              status: true,
              data: dept,
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

  getDept: (req: Request, res: Response) => {
    const {
      params: { deptId }
    } = req;

    departmentCrud.findDept({ departmentId: deptId })
      .then((dept) => {
        return res.status(200).json({
          status: true,
          data: dept?.toJSON(),
        });
      })
      .catch((err) => {
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
        return res.status(200).json({
          status: true,
          data: dept?.toJSON(),
        });
      })
      .catch((err) => {
        return res.status(500).json({
          status: false,
          error: err,
        });
      });
  },

  deleteDept: (req: Request, res: Response) => {
    const {
      params: { deptId }
    } = req;
    departmentCrud.deleteDept({ departmentId: deptId })
      .then((numberOfDepartmentDeleted) => {
        return res.status(200).json({
          status: true,
          data: { numberOfEntriesDeleted: numberOfDepartmentDeleted },
        });
      })
      .catch((err) => {
        return res.status(500).json({
          status: false,
          error: err,
        });
      });
  },
}
