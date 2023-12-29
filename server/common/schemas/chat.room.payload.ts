import { JSONSchemaType } from "ajv";

interface Props {
  message: string,
  messageFrom: string,
};

export const genRoomPayload: JSONSchemaType<Props> = {
  type: 'object',
  properties: {
    message: {
      type: 'string',
      nullable: false,
    },
    messageFrom: {
      type: 'string',
    }
  },
  required: ['message'],
  additionalProperties: false,
}
