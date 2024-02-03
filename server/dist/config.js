import dotenv from 'dotenv';
dotenv.config();
export const configs = {
    db_connections: {
        db_name: process.env.DB_NAME,
        db_password: process.env.DB_PASSWORD,
        db_user: process.env.DB_USER,
        port: process.env.PORT,
        dialect: process.env.DIALECT,
    },
    roles: {
        ADMIN: 'admin',
        USER: 'user',
    },
    hod: {
        YES: 'yes',
        NO: 'no',
    },
    vacation: {
        TRUE: true,
        FALSE: false,
    },
    progressLevel: {
        INPROGRESS: 'inprogress',
        COMPLETED: 'completed',
        UNCOMPLETED: 'not_completed',
    },
    urgencyLevel: {
        NORMAL: 'normal',
        HIGH: 'high',
        PRIORITY: 'priority'
    },
    jwtSecret: process.env.JWTSECRET,
    jwtExpirationSeconds: 60 * 60,
    sessionExpire: new Date((Date.now() + 60 * 60 * 1000) + 1),
    maxAge: 3600000,
    logLevel: {
        error: 0,
        warn: 1,
        info: 2,
        http: 3,
        alert: 4,
        debug: 5,
        notice: 6,
    },
    logRotateOpts: {
        error: {
            filename: 'app-error-%DATE%.log',
            level: 'error'
        },
        warn: {
            filename: 'app-warn-%DATE%.log',
            level: 'warn'
        },
        info: {
            filename: 'app-info-%DATE%.log',
            level: 'info'
        },
        http: {
            filename: 'app-http-%DATE%.log',
            level: 'http'
        },
        alert: {
            filename: 'app-alert-%DATE%.log',
            level: 'alert'
        },
        allLogs: {
            filename: 'app-logs-%DATE%.log'
        },
        rejection: {
            filename: 'app-rejectionError-logs-%DATE%.log',
        },
        exception: {
            filename: 'app-exceptionError-logs-%DATE%.log'
        }
    },
    logDB: {
        host: process.env.HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        table: process.env.LOG_TABLE,
        fields: {
            level: 'level',
            meta: 'metadata',
            message: 'source',
            timestamp: 'time'
        },
    }
};
//# sourceMappingURL=config.js.map