import { Request, Response } from "express";
import { departmentCrud } from "../models/department.js";

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
  getAllDept: (req: Request, res: Response) => {
    departmentCrud.findAllDept(req.query)
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
  },
  getDept: (req: Request, res: Response) => {
    const {
      params: { deptId }
    } = req;
    departmentCrud.findDept({ id: deptId })
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
    departmentCrud.updateDept({ id: deptId }, payload)
      .then(() => {
        return departmentCrud.findDept({ id: deptId });
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
    departmentCrud.deleteDept({ id: deptId })
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