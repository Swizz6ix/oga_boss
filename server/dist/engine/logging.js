import { format, createLogger } from 'winston';
import morgan from 'morgan';
import DailyRotateFile from 'winston-daily-rotate-file';
import { configs } from '../config.js';
import MySQLTransport from 'winston-mysql';
const { combine, timestamp, json, colorize, prettyPrint, align } = format;
const errorFIlter = format((info, opts) => {
    return info.level === 'error' ? info : false;
});
const warnFilter = format((info, opts) => {
    return info.level === 'warn' ? info : false;
});
const infoFilter = format((info, opts) => {
    return info.level === 'info' ? info : false;
});
const httpFilter = format((info, opts) => {
    return info.level === 'http' ? info : false;
});
const alertFilter = format((info, opts) => {
    return info.level === 'alert' ? info : false;
});
const errorTransport = new DailyRotateFile({
    filename: 'app-error-%DATE%.log',
    datePattern: 'YYYY-MM-DD-HH',
    zippedArchive: true,
    maxFiles: '90d',
    dirname: 'sysLogs',
    level: 'error',
    format: combine(errorFIlter()),
});
const warnTransport = new DailyRotateFile({
    filename: 'app-warn-%DATE%.log',
    datePattern: 'YYYY-MM-DD-HH',
    zippedArchive: true,
    maxFiles: '90d',
    dirname: 'sysLogs',
    level: 'warn',
    format: combine(warnFilter()),
});
const infoTransport = new DailyRotateFile({
    filename: 'app-info-%DATE%.log',
    datePattern: 'YYYY-MM-DD-HH',
    zippedArchive: true,
    maxFiles: '90d',
    dirname: 'sysLogs',
    level: 'info',
    format: combine(infoFilter()),
});
const httpTransport = new DailyRotateFile({
    filename: 'app-http-%DATE%.log',
    datePattern: 'YYYY-MM-DD-HH',
    zippedArchive: true,
    maxFiles: '90d',
    dirname: 'sysLogs',
    level: 'http',
    format: combine(httpFilter()),
});
const alertTransport = new DailyRotateFile({
    filename: 'app-alert-%DATE%.log',
    datePattern: 'YYYY-MM-DD-HH',
    zippedArchive: true,
    maxFiles: '30d',
    dirname: 'sysLogs',
    level: 'alert',
    format: combine(alertFilter()),
});
const transport = new DailyRotateFile({
    filename: 'app-logs-%DATE%.log',
    datePattern: 'YYYY-MM-DD-HH',
    zippedArchive: true,
    maxFiles: '30d',
    dirname: 'sysLogs',
});
const rejections = new DailyRotateFile({
    filename: 'app-rejectionError-logs-%DATE%.log',
    datePattern: 'YYYY-MM-DD-HH',
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '14d',
    dirname: 'sysLogs',
    handleRejections: true,
});
const exceptions = new DailyRotateFile({
    filename: 'app-exceptionError-logs-%DATE%.log',
    datePattern: 'YYYY-MM-DD-HH',
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '14d',
    dirname: 'sysLogs',
    handleExceptions: true,
});
const options_custom = {
    host: 'localhost',
    user: 'bosi',
    password: '12345',
    database: 'oga_boss',
    table: 'sys_logs',
    fields: {
        level: 'level',
        meta: 'metadata',
        message: 'source',
        timestamp: 'time',
    }
};
const logger = createLogger({
    levels: configs.logLevel,
    level: process.env.LOG_LEVEL || 'alert',
    defaultMeta: { id: '12345' },
    exitOnError: false,
    format: combine(prettyPrint(), 
    // colorize({ all: true }),
    timestamp({
        format: 'YYYY-MM-DD hh:mm:ss.SSS A',
    }), align(), json()),
    transports: [
        transport,
        errorTransport,
        warnTransport,
        infoTransport,
        httpTransport,
        alertTransport,
        new MySQLTransport(options_custom),
        // new transports.Console(),
    ],
    exceptionHandlers: [
        exceptions
    ],
    rejectionHandlers: [
        rejections
    ]
});
// logger.query
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
export const logging = {
    userLogs: (serverId) => {
        return logger.child({ service: `${serverId}` });
    },
    authLogger: logger.child({ service: 'auth-service' }),
    controllerLogger: logger.child({ service: 'server-service' }),
    engineLogger: logger.child({ service: 'engine-service' }),
};
//# sourceMappingURL=logging.js.map