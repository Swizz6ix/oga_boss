;
export const dailyReportPayload = {
    type: 'object',
    properties: {
        report: {
            type: 'string',
            nullable: false,
        }
    },
    required: ['report'],
    additionalProperties: true,
};
//# sourceMappingURL=daily.report.payload.js.map