"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
exports.default = joi_1.default.object({
    _id: joi_1.default.string().min(1).max(20).required(),
    title: joi_1.default.string().min(3).max(50).required(),
    description: joi_1.default.string().min(3).max(100),
    category: joi_1.default.string().min(3).max(30),
    instock: joi_1.default.number().min(1).required(),
    createdAt: joi_1.default.string(),
    modified: joi_1.default.date()
});
//# sourceMappingURL=stock.js.map