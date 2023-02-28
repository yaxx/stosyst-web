"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.toTitleCase = void 0;
const models_1 = require("../../models");
const models_2 = require("../../models");
const Auth = __importStar(require("../../auth"));
const pipelines_1 = require("../../pipelines");
const ObjectId = require('mongodb').ObjectID;
const EXPENSE = "EXPENSE";
const toTitleCase = (str) => {
    let s = str.toLocaleLowerCase().split(' ');
    return s.map((s) => s.charAt(0).toUpperCase() + s.slice(1)).join(' ');
};
exports.toTitleCase = toTitleCase;
exports.default = {
    Query: {
        expenses: async (root, { query, group, offset }, { req, res }) => {
            Auth.checkSignedIn(req);
            const { data: { orgId } } = req;
            let expenses = await models_1.Expense.aggregate((0, pipelines_1.getExpensePipeline)(orgId, query, group, offset));
            expenses = group === 'date' ?
                expenses.map((r) => ({
                    ...r, _id: r.records[0].createdAt
                }))
                : group === 'spender' || group === 'name' ?
                    expenses.map((r) => ({
                        ...r, _id: (0, exports.toTitleCase)(r._id)
                    }))
                    :
                        expenses;
            return expenses;
        }
    },
    Mutation: {
        saveExpense: async (_, { expense }, { req, res }) => {
            Auth.checkSignedIn(req);
            const { data: { orgId, uid } } = req;
            const client = await models_2.Client.findById(orgId).lean();
            const staff = client.staffs.find((s) => s._id.toString() === uid);
            const isAdmin = orgId === uid;
            let user = isAdmin ?
                ({
                    _id: client._id,
                    firstName: client.name,
                    phone: client.phone,
                    email: client.email
                })
                :
                    ({
                        _id: staff._id,
                        firstName: staff.firstName,
                        lastName: staff.lastName,
                        phone: staff.phone,
                        email: staff.email
                    });
            const exp = !expense._id ?
                await models_1.Expense.create({
                    ...expense,
                    added: user,
                    modified: user,
                    modifier: orgId,
                    seen: [{ usr: uid }]
                })
                :
                    await models_1.Expense.findByIdAndUpdate(ObjectId(expense._id), {
                        ...expense,
                        modified: user
                    }, { new: true });
            return exp;
        },
        deleteExpense: async (_, { id }) => {
            return await models_1.Expense.findByIdAndDelete(ObjectId(id));
        }
    },
    Subscription: {
        expense: {}
    }
};
//# sourceMappingURL=expense.js.map