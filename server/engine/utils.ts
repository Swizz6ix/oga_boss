import winston, { format } from "winston"
import DailyRotateFile from "winston-daily-rotate-file";

export const logHelpers  = {
  filter: format((info, opts) => {
    return info.level === opts ? info : false;
  }),
  rotate: (filename: string, format?: winston.Logform.Format, level?: string, handleExceptions?: boolean, handleRejections?: boolean) => new DailyRotateFile({
    filename: filename,
    datePattern: 'YYYY-MM-DD-HH',
    zippedArchive: true,
    maxSize: '50m',
    maxFiles: '30d',
    dirname: 'sysLogs',
    level: level,
    format: format,
    handleExceptions: handleExceptions,
    handleRejections: handleRejections,
  }),
};