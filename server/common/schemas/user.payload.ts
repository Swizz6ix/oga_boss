export const userPayload = {
  type: Object,
  properties: {
    email: {
      type: 'string',
      pattern: '^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$',
    },
    userName: {
      type: 'string',
    },
    department: {
      type: 'string',
    },
    hod: {
      type: 'string',
    },
    role: {
      type: 'string',
    },
    firstName: {
      type: 'string',
    },
    lastName: {
      type: 'string',
    }
  },
  required: [
    'email',
    'userName',
    'department',
    'role',
    'firstName',
    'lastName',
  ],
  additionalProperties: false,
};
