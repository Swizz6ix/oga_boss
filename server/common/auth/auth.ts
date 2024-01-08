import pkg from 'jsonwebtoken';
import { createHash } from 'crypto';
import { configs } from '../../config.js';

// Generate an Access Token using username and userId
export const auth = {
  token: (username: string, userId: number | string) => {
    const { sign } = pkg
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
