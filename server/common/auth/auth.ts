import pkg from 'jsonwebtoken';
import { createHash } from 'crypto';
import { configs } from '../../config.js';

const { sign } = pkg
// Generate an Access Token using username and userId
export const token = (userName: string, userId: number) => {
  return sign(
    {userId, userName},
    configs.jwtSecret,
    { expiresIn: configs.jwtExpirationSeconds}
  );
};

// Defines password encryption
export const encryptPassword = (password: string) => {
  const hash = createHash('sha256');
  hash.update(password);
  return hash.digest('hex');
}
