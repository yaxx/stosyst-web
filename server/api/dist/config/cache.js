"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.REDIS_OPTIONS = void 0;
const { REDIS_HOST = 'redis-18097.c261.us-east-1-4.ec2.cloud.redislabs.com', REDIS_PORT = 18097, REDIS_PASSWORD = 'secret' } = process.env;
exports.REDIS_OPTIONS = {
    port: +REDIS_PORT,
    host: REDIS_HOST,
    password: REDIS_PASSWORD
};
//# sourceMappingURL=cache.js.map