import AJV from 'ajv';
import { logging } from '../../engine/logging.js';
import { Request, Response, NextFunction } from 'express';
import { user } from './user.middleware.js';


const AJV_OPTS = {
    allErrors: true,
};

export const schemaValidator = {
  /**
   * 
   */
  verify: (schema: any) => {
    if (!schema) {
      logging.authLogger.warn(new Error('No schema provided'));
      throw new Error('Schema not provided')
    };
    return (req: Request, res: Response, next: NextFunction) => {
      const { body } = req;
      const ajv = new AJV(AJV_OPTS);
      const validate = ajv.compile(schema);
      const isValid = validate(body);

      if (isValid) return next();
      user._user_id(req.user.userId)
        .then((id) => {
          const log = logging.userLogs(String(id));
          log.warn(new Error(`Invalid Payload: ${ajv.errorsText(validate.errors)}`));
        })
        .catch((err) => {
          return res.status(400).json({
            status: false,
            error: err,
          });
        });

      return res.send({
        status: false,
        error: {
          message: `Invalid Payload: ${ajv.errorsText(validate.errors)}`,
        },
      });
    };
  }
}
