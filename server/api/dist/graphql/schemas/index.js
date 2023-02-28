"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const root_1 = __importDefault(require("./root"));
const charts_1 = __importDefault(require("./charts"));
const product_1 = __importDefault(require("./product"));
const expense_1 = __importDefault(require("./expense"));
const invoice_1 = __importDefault(require("./invoice"));
const account_1 = __importDefault(require("./account"));
const upload_1 = __importDefault(require("./upload"));
const summary_1 = __importDefault(require("./summary"));
const notifications_1 = __importDefault(require("./notifications"));
exports.default = [
    root_1.default,
    product_1.default,
    charts_1.default,
    expense_1.default,
    invoice_1.default,
    account_1.default,
    upload_1.default,
    summary_1.default,
    notifications_1.default
];
//# sourceMappingURL=index.js.map