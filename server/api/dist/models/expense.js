"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const invoice_1 = require("./invoice");
const ExpenseSchema = new mongoose_1.Schema({
    name: String,
    desc: String,
    spender: String,
    amount: Number,
    added: invoice_1.Person,
    modified: invoice_1.Person,
    seen: [
        {
            usr: String,
            at: {
                type: Date,
                default: Date.now
            }
        }
    ],
    modifier: {
        type: String, default: ''
    }
}, { timestamps: true, strict: true });
const Expense = (0, mongoose_1.model)('Expense', ExpenseSchema);
exports.default = Expense;
//# sourceMappingURL=expense.js.map