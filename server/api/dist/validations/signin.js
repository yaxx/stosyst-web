"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
exports.default = joi_1.default.object({
    isAdmin: joi_1.default.boolean(),
    msgToken: joi_1.default.string(),
    phone: joi_1.default.string().min(12).max(12).required(),
    password: joi_1.default.string().min(4).max(12).required(),
});
//# sourceMappingURL=signin.js.map