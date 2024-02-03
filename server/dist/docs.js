export const apiDocumentation = {
    definition: {
        openapi: '3.1.0',
        info: {
            title: 'Oga-Boss api docs',
            description: 'A management system for startups and small-medium businesses',
            version: '0.1.0',
            contact: {
                name: 'Ferdinand Charles',
                email: 'ferdinandcharles6@gmail.com',
            }
        },
        servers: [
            {
                url: 'http://localhost:3000',
                description: 'Local server'
            },
            {
                url: 'https://production.server'
            }
        ],
    },
    apis: [
        './common/routes/super.user.routes*.ts',
        './common/routes/user.routes*.ts',
        './common/routes/department.routes*.ts',
        './common/routes/task.routes*.ts',
        './common/routes/daily.report.routes*.ts',
        './common/routes/chat.room.routes*.ts',
        './common/routes/log.routes*.ts',
    ]
};
//# sourceMappingURL=docs.js.map