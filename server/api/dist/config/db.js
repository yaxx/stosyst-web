"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MONGO_URI = exports.MONGO_OPTIONS = void 0;
const app_1 = require("./app");
const { MONGO_HOST = 'localhost', MONGO_DATABASE = 'systo', MONGO_PORT = '27017', MONGO_USERNAME = '', MONGO_PASSWORD = '' } = process.env;
exports.MONGO_OPTIONS = {
    useNewUrlParser: true,
    useUnifiedTopology: true
};
const LOCAL_URI = `mongodb+srv://shehu:mWQgbU2J6iO2naol@m0cluster.sveqa6c.mongodb.net/stosyst`;
const REMOTE_URI = `mongodb+srv://${MONGO_USERNAME}:${encodeURIComponent(MONGO_PASSWORD)}@${MONGO_HOST}/${MONGO_DATABASE}`;
exports.MONGO_URI = app_1.IN_PRODUCTION ? REMOTE_URI : LOCAL_URI;
//# sourceMappingURL=db.js.map