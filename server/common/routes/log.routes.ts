import { Router } from "express";
import { logController } from "../controllers/logs.controller.js";

export const logRoutes = Router();

logRoutes.get('/all', logController.getAllLogs);
logRoutes.get('/:logId', logController.getLog);
logRoutes.delete('/:logId', logController.deleteLogs);
