import pkg from 'jsonwebtoken';
import { createHash } from 'crypto';
import { configs } from '../../config.js';
// Generate an Access Token using username and userId
export const token = (userName, userId) => {
    const { sign } = pkg;
    return sign({ userId, userName }, configs.jwtSecret, { expiresIn: configs.jwtExpirationSeconds });
};
// Defines password encryption
export const encryptPassword = (password) => {
    const hash = createHash('sha256');
    hash.update(password);
    return hash.digest('hex');
};
//# sourceMappingURL=auth.js.map