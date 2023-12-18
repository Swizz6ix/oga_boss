import AJV from 'ajv';
const AJV_OPTS = {
    allErrors: true,
};
export const schemaValidator = {
    /**
     *
     */
    verify: (schema) => {
        if (!schema)
            throw new Error('Schema not provided');
        return (req, res, next) => {
            const { body } = req;
            const ajv = new AJV(AJV_OPTS);
            const validate = ajv.compile(schema);
            const isValid = validate(body);
            if (isValid)
                return next();
            return res.send({
                status: false,
                error: {
                    message: `Invalid Payload: ${ajv.errorsText(validate.errors)}`,
                },
            });
        };
    }
};
//# sourceMappingURL=schema.validation.middleware.js.map