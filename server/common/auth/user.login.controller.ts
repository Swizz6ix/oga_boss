import { userCrud } from "../models/user.js";
import { encryptPassword, token } from "./auth.js";


export const login = (req: any, res: any) => {
  const { userName, password } = req.body;
  userCrud.findUser({ userName })
    .then((user) => {
      // If user is not found return error
      if (!user) {
        return res.status(400).json({
          status: false,
          error: {
            message: `Could not find any user with username: ${userName}`
          }
        })
      }
        const isSecured = encryptPassword(password)

      // return error if the provided password does not match with the secured password.
      if (user.password !== isSecured) {
        return res.status(400).json({
          status: false,
          error: {
            message: `provided username and password did not match`
          },
        })
      }

      // Generate an Access Token fo the user
      const _token = token(user.userName, user.id);
      return res.status(200).json({
        status: true,
        data: {
          user: user?.toJSON(),
          token: _token,
        }
      })
    })
    .catch((err) => {
      return res.status(500).json({
        status: false,
        error: err,
      });
    });
}
