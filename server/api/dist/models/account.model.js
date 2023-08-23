"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const bcryptjs_1 = require("bcryptjs");
const account_1 = require("../graphql/resolvers/account");
const Schema = mongoose_1.default.Schema;
const ClientSchema = new Schema({
    password: String,
    username: {
        type: String,
        validate: {
            validator: (username) => {
                let C = Client;
                return C.dontExist({ username });
            },
            message: ({ value }) => `${value} has already exist`
        }
    },
    email: {
        type: String,
        validate: {
            validator: (email) => {
                let C = Client;
                return !account_1.verifyEmail ? true : C.dontExist({ email });
            },
            message: ({ value }) => `${value}  already exist`
        }
    },
    phone: {
        type: String,
        validate: {
            validator: (phone) => {
                let C = Client;
                return !account_1.verifyPhoneNumber ? true : C.dontExist({ phone });
            },
            message: ({ value }) => `${value} already exist`
        }
    },
    country: {
        type: String,
        default: ''
    },
    city: {
        type: String,
        default: ''
    },
    address: String,
    banner: {
        type: String,
        default: 'd063578d-733d-4aca-8809-e18368d55184'
    },
    dp: {
        type: String,
        default: 'a35f9e5f-771c-4afd-b4b7-0869842c8dc9',
    },
    name: {
        type: String,
        default: ''
    },
    category: {
        type: String,
        default: ''
    },
    staffs: [{
            firstName: String,
            lastName: String,
            department: {
                type: String,
                default: ''
            },
            position: {
                type: String,
                default: ''
            },
            phone: {
                type: String,
                default: ''
            },
            email: {
                type: String,
                default: ''
            },
            address: {
                type: String,
                default: ''
            },
            username: {
                type: String,
                default: ''
            },
            password: String,
            dp: {
                type: String,
                default: ''
            },
            banner: {
                type: String,
                default: ''
            },
            permisions: {
                creates: ['stocks', 'invoices', 'expenses'],
                edits: ['stocks', 'invoices', 'expenses'],
                deletes: ['stocks', 'invoices', 'expenses']
            },
            createdAt: {
                type: Date,
                default: Date.now()
            }
        }],
    msgTokens: [],
    linkedTo: [],
    timeLine: {
        renewed: {
            type: Date,
            default: null
        },
        due: {
            type: Date,
            default: null
        },
        status: {
            type: String,
            default: 'trial'
        }
    },
    paymentMethods: { type: Array, default: [] }
}, { timestamps: true });
ClientSchema.statics.dontExist = async function (options) {
    return await this.where(options).countDocuments() === 0;
};
ClientSchema.methods.matchPassword = function (password) {
    return (0, bcryptjs_1.compare)(password, this.password);
};
ClientSchema.pre('save', async function () {
    if (this.isModified('password')) {
        this.password = await (0, bcryptjs_1.hash)(this?.password || '', 10);
    }
});
const Client = mongoose_1.default.model('Client', ClientSchema);
exports.default = Client;
//# sourceMappingURL=account.model.js.map