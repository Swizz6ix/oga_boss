import pkg from "jsonwebtoken";
import { configs } from "../../config.js";
export const authenticated = {
    check: (req, res, next) => {
        const authHeader = req.headers['authorization'];
        // return error if no auth headers are provided
        if (!authHeader) {
            return res.status(401).json({
                status: false,
                error: {
                    message: 'Auth headers not provided in the request',
                },
            });
        }
        // return error if bearer header is not provided
        if (!authHeader.startsWith('Bearer')) {
            console.log("err", authHeader);
            return res.status(401).json({
                status: false,
                error: {
                    message: 'Invalid auth mechanism',
                },
            });
        }
        const _token = authHeader.split(' ')[1];
        // return error if bearer header is provided, but token is not provided
        if (!_token) {
            return res.status(401).json({
                status: false,
                error: {
                    message: 'Bearer token missing in the authorization headers',
                },
            });
        }
        const { verify } = pkg;
        verify(_token, configs.jwtSecret, (err, user) => {
            if (err) {
                return res.status(403).json({
                    status: false,
                    error: 'Invalid access token provided, please login again.'
                });
            }
            req.user = user; // Save the user oject for further use
            next();
        });
    },
};
//# sourceMappingURL=isAuthenticated.middleware.js.map