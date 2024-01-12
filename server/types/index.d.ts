import session from "express-session";
import { User } from "../common/models/user";

declare module 'cookie-parser';
declare module 'express-session' {
  interface SessionData {
    token: string | null ;
  }
}

declare global {
  namespace Express {
    interface Request {
      user: User
    }
  }
}
