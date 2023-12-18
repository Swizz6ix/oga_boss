import dotenv from 'dotenv';
dotenv.config();
export const configs = {
    db_connections: {
        db_name: process.env.DB_NAME,
        db_password: process.env.DB_PASSWORD,
        db_user: process.env.DB_USER,
        port: process.env.PORT,
        dialect: process.env.DIALECT
    },
    roles: {
        ADMIN: 'admin',
        USER: 'user'
    },
    department: {
        LOGISTIC: 'logistic',
        FINANCE: 'finance',
        DESIGN: 'design',
        FRONT_DEV: 'front_dev',
        BACK_DEV: 'back_dev',
        UNASSIGNED: 'unassigned'
    },
    hod: {
        YES: 'yes',
        NO: 'no',
    },
    urgencyLevel: {
        NORMAL: 'normal',
        HIGH: 'high',
        PRIORITY: 'priority'
    }
};
//# sourceMappingURL=config.js.map