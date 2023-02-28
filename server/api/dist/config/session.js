"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SESSION_OPTIONS = void 0;
const app_1 = require("./app");
const THIRTY_MINUTES = 1000 * 60 * 30;
const { SESSION_NAME = 'sid', SESSION_SECRET = 'ssh!secret!', SESSION_IDLE_TIMEOUT = THIRTY_MINUTES, } = process.env;
exports.SESSION_OPTIONS = {
    name: SESSION_NAME,
    secret: SESSION_SECRET,
    cookie: {
        secure: app_1.IN_PRODUCTION,
        sameSite: true,
        maxAge: +SESSION_IDLE_TIMEOUT
    },
    rolling: true,
    resave: false,
    saveUninitialized: false
};
//# sourceMappingURL=session.js.map