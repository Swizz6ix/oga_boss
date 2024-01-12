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
    }
};
//# sourceMappingURL=config.js.map