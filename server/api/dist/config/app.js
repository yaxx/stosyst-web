"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.IN_PRODUCTION = exports.SERVER_PORT = void 0;
_a = process.env.SERVER_PORT, exports.SERVER_PORT = _a === void 0 ? 4000 : _a;
exports.IN_PRODUCTION = process.env.NODE_ENV === 'production';
//# sourceMappingURL=app.js.map