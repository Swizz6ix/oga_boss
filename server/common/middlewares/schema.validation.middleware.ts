import AJV from 'ajv';
import { authLogger } from '../../engine/logging.js';


const AJV_OPTS = {
    allErrors: true,
};

export const schemaValidator = {
  /**
   * 
   */
  verify: (schema: any) => {
    if (!schema) {
      authLogger.warn(new Error('No schema provided'));
      throw new Error('Schema not provided')
    };
    return (req: any, res: any, next: any) => {
      const { body } = req;
      const ajv = new AJV(AJV_OPTS);
      const validate = ajv.compile(schema);
      const isValid = validate(body);

      if (isValid) return next();
      authLogger.warn(new Error(`Invalid Payload: ${ajv.errorsText(validate.errors)}`))
      return res.send({
        status: false,
        error: {
          message: `Invalid Payload: ${ajv.errorsText(validate.errors)}`,
        },
      });
    };
  }
}
