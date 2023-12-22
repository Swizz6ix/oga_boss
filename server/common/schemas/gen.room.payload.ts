import { JSONSchemaType } from "ajv";

interface Props {
  message: string,
};

export const genRoomPayload: JSONSchemaType<Props> = {
  type: 'object',
  properties: {
    message: {
      type: 'string',
      nullable: false,
    },
  },
  required: ['message'],
  additionalProperties: false,
}
