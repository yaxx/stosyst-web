"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Client = exports.Invoice = exports.Expense = exports.Product = void 0;
var product_1 = require("./product");
Object.defineProperty(exports, "Product", { enumerable: true, get: function () { return __importDefault(product_1).default; } });
var expense_1 = require("./expense");
Object.defineProperty(exports, "Expense", { enumerable: true, get: function () { return __importDefault(expense_1).default; } });
var invoice_1 = require("./invoice");
Object.defineProperty(exports, "Invoice", { enumerable: true, get: function () { return __importDefault(invoice_1).default; } });
var account_model_1 = require("./account.model");
Object.defineProperty(exports, "Client", { enumerable: true, get: function () { return __importDefault(account_model_1).default; } });
//# sourceMappingURL=index.js.map