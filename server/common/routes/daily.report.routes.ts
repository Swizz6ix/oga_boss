import { Router } from 'express';
import { dailyReport } from '../controllers/daily.report.controller.js';
import { schemaValidator } from '../middlewares/schema.validation.middleware.js';
import { dailyReportPayload } from '../schemas/daily.report.payload.js';

export const dailyReportRoutes = Router();

dailyReportRoutes.get('/:reportId', dailyReport.getReport)
dailyReportRoutes.post('/new',
  [schemaValidator.verify(dailyReportPayload)], dailyReport.addReport);
dailyReportRoutes.delete('/:reportId', dailyReport.deleteReport);
