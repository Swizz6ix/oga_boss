import AJV, { JSONSchemaType } from 'ajv';

const AJV_OPTS = {
    allErrors: true,
};

export const schemaValidator = {
  verify: (schema: any) => {
    if (!schema) throw new Error('Schema not provided');
    return (req: any, res: any, next: any) => {
      const { body } = req;
      const ajv = new AJV(AJV_OPTS);
      const validate = ajv.compile(schema);
      const isValid = validate(body);

      if (isValid) return next;
      return res.send({
        status: false,
        error: {
          message: `Invalid Payload: ${ajv.errorsText(validate.errors)}`,
        },
      });
    };
  }
}
