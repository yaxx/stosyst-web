"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Person = void 0;
const mongoose_1 = require("mongoose");
exports.Person = new mongoose_1.Schema({
    firstName: String,
    lastName: String,
    phone: String,
    email: String,
    address: String
});
const InvoiceSchema = new mongoose_1.Schema({
    tid: String,
    stocks: [{
            item: {
                _id: String,
                name: String,
                description: String,
                category: String,
                owner: String,
                costPrice: Number,
                sellingPrice: Number,
                instock: Number,
                added: exports.Person,
                modified: exports.Person,
                stockImage: {
                    type: String,
                    default: "https://nextoma-bucket.s3.us-east-2.amazonaws.com/56c479300400ec4d5005f932f1599d99"
                },
            },
            quantity: Number,
            delivered: Number,
            booked: Boolean,
        }],
    modifier: {
        type: String,
        default: ''
    },
    seen: [
        {
            usr: String,
            at: {
                type: Date,
                default: Date.now
            }
        }
    ],
    recieved: Number,
    payable: Number,
    paymentMethod: String,
    completed: Boolean,
    customer: exports.Person,
    added: exports.Person,
    modified: exports.Person,
}, {
    timestamps: true
});
const Invoice = (0, mongoose_1.model)('Invoice', InvoiceSchema);
exports.default = Invoice;
//# sourceMappingURL=invoice.js.map