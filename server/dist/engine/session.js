export const sessionOpt = {
    secret: process.env.SESSION_SECRET,
    name: process.env.SESSION_NAME,
    cookie: {
        maxAge: 2000,
        httpOnly: true,
        signed: true,
    },
    saveUninitialized: true,
    resave: false,
};
//# sourceMappingURL=session.js.map