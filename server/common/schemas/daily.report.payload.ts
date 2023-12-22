import { JSONSchemaType } from "ajv";

interface Props {
  report: string,
};

export const dailyReportPayload: JSONSchemaType<Props> = {
  type: 'object',
  properties: {
    report: {
      type: 'string',
      nullable: false,
    }
  },
  required: ['report'],
  // additionalProperties: false,
};
