import { Router } from 'express';
import { dailyReport } from '../controllers/daily.report.controller.js';
import { schemaValidator } from '../middlewares/schema.validation.middleware.js';
import { dailyReportPayload } from '../schemas/daily.report.payload.js';
import { authenticated } from '../middlewares/isAuthenticated.middleware.js';
import { permission } from '../middlewares/check.permission.middleware.js';
import { configs } from '../../config.js';
export const dailyReportRoutes = Router();
const role = configs.roles.ADMIN;
dailyReportRoutes.get('/all', [authenticated.authSession, permission.has(role)], dailyReport.getAllReport);
dailyReportRoutes.get('/:reportId', [authenticated.authSession, permission.has(role)], dailyReport.getReport);
dailyReportRoutes.post('/add', [authenticated.authSession, schemaValidator.verify(dailyReportPayload)], dailyReport.addReport);
dailyReportRoutes.delete('/:reportId', [authenticated.authSession, permission.has(role)], dailyReport.deleteReport);
//# sourceMappingURL=daily.report.routes.js.map