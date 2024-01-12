import { format, createLogger, transports } from 'winston';
import morgan from 'morgan';
import { configs } from '../config.js';
const { combine, timestamp, json, colorize, prettyPrint, align } = format;
export const logger = createLogger({
    levels: configs.logLevel,
    level: process.env.LOG_LEVEL || 'http',
    format: combine(prettyPrint(), colorize({ all: true }), timestamp({
        format: 'YYYY-MM-DD hh:mm:ss.SSS A',
    }), align(), json()),
    transports: [new transports.Console()],
    exceptionHandlers: [
        new transports.Console(),
    ],
    rejectionHandlers: [
        new transports.Console(),
    ]
});
export const morganMiddleware = morgan((tokens, req, res) => {
    var _a;
    return JSON.stringify({
        method: tokens.method(req, res),
        url: tokens.url(req, res),
        status: Number.parseFloat(tokens.status(req, res)),
        content_length: tokens.res(req, res, 'content-length'),
        response_time: Number.parseFloat((_a = tokens['response-time'](req, res)) !== null && _a !== void 0 ? _a : ""),
    });
}, {
    stream: {
        // Configure Morgan to use our custom logger with the http severity
        write: (message) => logger.http(message.trim()),
    },
});
export const adminLogger = logger.child({ service: 'superuser-service' });
export const userLogger = logger.child({ service: 'user-service' });
export const authLogger = logger.child({ service: 'auth-service' });
export const controllerLogger = logger.child({ service: 'server-service' });
export const engineLogger = logger.child({ service: 'engine-service' });
//# sourceMappingURL=logging.js.map