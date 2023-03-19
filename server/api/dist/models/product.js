"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const invoice_1 = require("./invoice");
const ProductSchema = new mongoose_1.Schema({
    name: String,
    description: String,
    category: String,
    subCategory: String,
    costPrice: Number,
    sellingPrice: Number,
    instock: Number,
    stockImage: String,
    warningCount: Number,
    expiry: { type: Date },
    expiryWarning: Number,
    owner: {
        type: String,
        default: ''
    },
    added: invoice_1.Person,
    modified: invoice_1.Person,
}, { timestamps: true, strict: true });
const Product = (0, mongoose_1.model)('Product', ProductSchema);
exports.default = Product;
//# sourceMappingURL=product.js.map