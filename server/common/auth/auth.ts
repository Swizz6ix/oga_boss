import pkg from 'jsonwebtoken';
import { createHash } from 'crypto';
import { configs } from '../../config.js';
import { logging } from '../../engine/logging.js';
import { user } from '../middlewares/user.middleware.js';

// Generate an Access Token using username and userId
export const auth = {
  token: (username: string, userId: string) => {
    const { sign } = pkg
    const serverId = user._user_id(userId)
    serverId.then((id) => {
      const log = logging.userLogs(String(id));
      log.alert(`session token created for user: ${userId}`);
    })
    .catch((err) => {
      logging.authLogger.error(new Error(err));
      return console.error(err);
    });
    return sign(
      {userId, username},
      configs.jwtSecret,
      { expiresIn: configs.jwtExpirationSeconds}
    );
  },

// Defines password encryption
  encryptPassword: (password: string) => {
    const hash = createHash('sha256');
    hash.update(password);
    return hash.digest('hex');
  },
}
