import { User } from "../common/models/user";

declare module 'cookie-parser';
declare module 'express-session' {
  interface SessionData {
    token: string;
  }
}

declare global {
  namespace Express {
    interface Request {
      user: User
    }
  }
}
