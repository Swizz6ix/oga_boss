import pkg from 'jsonwebtoken';
import { createHash } from 'crypto';
import { configs } from '../../config.js';
import { authLogger } from '../../engine/logging.js';

// Generate an Access Token using username and userId
export const auth = {
  token: (username: string, userId: number | string) => {
    const { sign } = pkg
    authLogger.alert(`session token created for user: ${userId}`);
    return sign(
      {userId, username},
      configs.jwtSecret,
      { expiresIn: configs.jwtExpirationSeconds}
    );
  },

// Defines password encryption
  encryptPassword: (password: string) => {
    const hash = createHash('sha256');
    authLogger.alert('password hashed');
    hash.update(password);
    return hash.digest('hex');
  },
}
