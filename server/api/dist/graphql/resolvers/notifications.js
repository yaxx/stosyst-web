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
const Auth = __importStar(require("../../auth"));
const models_1 = require("../../models");
const ObjectId = require('mongodb').ObjectID;
exports.default = {
    Query: {
        notifications: async (root, { page, offset }, { req, res }) => {
            Auth.checkSignedIn(req);
            const { data: { orgId, uid } } = req;
            const conditions = {
                modifier: orgId,
                'added._id': {
                    $not: {
                        $eq: uid
                    }
                }
            };
            const unread = {
                modifier: orgId,
                seen: {
                    $not: {
                        $elemMatch: {
                            usr: uid
                        }
                    }
                }
            };
            const invoices = await models_1.Invoice.aggregate([
                {
                    $match: conditions
                },
                {
                    $skip: offset
                },
                {
                    $limit: 20
                }
            ]);
            const expenses = await models_1.Expense.aggregate([
                {
                    $match: conditions
                },
            ]);
            const unreadInvoices = await models_1.Invoice.find(unread).countDocuments();
            const unreadExpenses = await models_1.Expense.find(unread).countDocuments();
            return {
                invoices,
                expenses,
                unreadInvoices,
                unreadExpenses
            };
        }
    },
    Mutation: {
        clearNotifications: async (_, { page }, { req, res }) => {
            Auth.checkSignedIn(req);
            const { data: { orgId, uid } } = req;
            let i = null;
            if (page === '/invoices') {
                i = await models_1.Invoice.updateMany({
                    modifier: orgId,
                    seen: {
                        $not: {
                            $elemMatch: {
                                usr: uid
                            }
                        }
                    }
                }, {
                    $push: {
                        seen: {
                            usr: uid
                        }
                    }
                }, {
                    new: true
                });
            }
            else {
                i = await models_1.Expense.updateMany({
                    modifier: orgId,
                    seen: {
                        $not: {
                            $elemMatch: {
                                usr: uid
                            }
                        }
                    }
                }, {
                    $push: {
                        seen: {
                            usr: uid
                        }
                    }
                }, {
                    new: true
                });
            }
            return { cleared: true };
        }
    }
};
//# sourceMappingURL=notifications.js.map