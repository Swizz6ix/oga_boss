import { format, createLogger } from 'winston';
import morgan from 'morgan';
import { configs } from '../config.js';
import MySQLTransport from 'winston-mysql';
import { logHelpers } from './utils.js';
const { combine, timestamp, json, colorize, prettyPrint, align } = format;
const logOpts = configs.logRotateOpts;
const errorOpts = {
    filename: logOpts.error.filename,
    level: logOpts.error.level,
    format: combine(logHelpers.filter(logOpts.error.level))
};
const warnOpts = {
    filename: logOpts.warn.filename,
    level: logOpts.warn.level,
    format: combine(logHelpers.filter(logOpts.warn.level))
};
const infoOpts = {
    filename: logOpts.info.filename,
    level: logOpts.info.level,
    format: combine(logHelpers.filter(logOpts.info.level))
};
const httpOpts = {
    filename: logOpts.http.filename,
    level: logOpts.http.level,
    format: combine(logHelpers.filter(logOpts.info.level))
};
const alertOpts = {
    filename: logOpts.alert.filename,
    level: logOpts.alert.level,
    format: combine(logHelpers.filter(logOpts.alert.level))
};
const allLogs = logOpts.allLogs.filename;
const rejection = {
    filename: logOpts.rejection.filename,
    handleExceptions: false,
    handleRejections: true
};
const exception = {
    filename: logOpts.exception.filename,
    handleExceptions: true,
    handleRejections: false,
};
const errorTransport = logHelpers.rotate(errorOpts.filename, errorOpts.format, errorOpts.level);
const warnTransport = logHelpers.rotate(warnOpts.filename, warnOpts.format, warnOpts.level);
const infoTransport = logHelpers.rotate(infoOpts.filename, infoOpts.format, infoOpts.level);
const httpTransport = logHelpers.rotate(httpOpts.filename, httpOpts.format, httpOpts.level);
const alertTransport = logHelpers.rotate(alertOpts.filename, alertOpts.format, alertOpts.level);
const transport = logHelpers.rotate(allLogs);
const rejections = logHelpers.rotate(rejection.filename, undefined, undefined, rejection.handleExceptions, rejection.handleRejections);
const exceptions = logHelpers.rotate(exception.filename, undefined, undefined, exception.handleExceptions, exception.handleRejections);
const options_custom = configs.logDB;
const logger = createLogger({
    levels: configs.logLevel,
    level: process.env.LOG_LEVEL || 'alert',
    defaultMeta: { app: 'oga_boss' },
    exitOnError: false,
    format: combine(prettyPrint(), timestamp({
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
    ],
    exceptionHandlers: [
        exceptions
    ],
    rejectionHandlers: [
        rejections
    ]
});
logger.on('error', function (err) {
    console.error(err);
    logging.engineLogger.error(new Error(`logger error`));
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
export const logging = {
    userLogs: (serverId) => {
        return logger.child({ service: `${serverId}` });
    },
    adminLogger: logger.child({ service: 'superuser-service' }),
    authLogger: logger.child({ service: 'auth-service' }),
    controllerLogger: logger.child({ service: 'server-service' }),
    engineLogger: logger.child({ service: 'engine-service' }),
};
//# sourceMappingURL=logging.js.map