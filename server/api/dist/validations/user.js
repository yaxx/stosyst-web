"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.staffLogin = void 0;
const joi_1 = __importDefault(require("joi"));
exports.default = joi_1.default.object({
    id: joi_1.default.number().min(14).max(14).required(),
    phone: joi_1.default.string().min(11).max(11).required(),
    password: joi_1.default.string().min(4).max(10).required()
});
exports.staffLogin = joi_1.default.object({
    username: joi_1.default.string().min(4).max(16),
    password: joi_1.default.string().min(4).max(12).required()
});
//# sourceMappingURL=user.js.map