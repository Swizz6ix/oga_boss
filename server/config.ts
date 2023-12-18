import dotenv from 'dotenv';
import { Dialect } from 'sequelize';


dotenv.config();

export const configs = {
    db_connections: {
      db_name: process.env.DB_NAME as string,
      db_password: process.env.DB_PASSWORD as string,
      db_user: process.env.DB_USER as string,
      port: process.env.PORT,
      dialect: process.env.DIALECT as Dialect
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
}
