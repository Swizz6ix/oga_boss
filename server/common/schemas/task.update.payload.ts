export const taskUpdatePayload = {
  type: 'object',
  properties: {
    name: {
      type: 'string',
    },
    description: {
      type: 'string',
    },
    duration: {
      type: 'string',
    },
    department: {
      type: 'string',
    },
    urgencyLevel: {
      type: 'string',
    },
  },
  additionalProperties: false,
};
