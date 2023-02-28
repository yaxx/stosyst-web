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
const models_1 = require("../../models");
const models_2 = require("../../models");
const Auth = __importStar(require("../../auth"));
const groupers_1 = require("../../pipelines/groupers");
const fcm_1 = require("../../messaging/fcm");
const invoices_1 = require("../../pipelines/invoices");
let ObjectId = require('mongodb').ObjectID;
const ONCHECKOUT = "ONCHECKOUT";
const ONSTOCKQTYCHANGE = "ONSTOCKQTYCHANGE";
exports.default = {
    Query: {
        invoices: async (root, { query, filter, offset, group }, { req, res }) => {
            Auth.checkSignedIn(req);
            const { data: { orgId, uid } } = req;
            let result = await models_1.Invoice.aggregate((0, invoices_1.getInvoicePipeline)(orgId, query, filter, group, offset));
            result = group === 'date' ?
                result.map((r) => ({
                    ...r, _id: r.records[0].createdAt
                }))
                :
                    result;
            return result;
        },
        searchInvoices: async (root, { query, group }, { req, res }) => {
            Auth.checkSignedIn(req);
            const { data: { orgId, uid } } = req;
            let invoices = await models_1.Invoice.aggregate([
                {
                    $search: {
                        text: {
                            query,
                            fuzzy: {
                                maxEdits: 2,
                            },
                            path: [
                                'customer.firstName',
                                'customer.phone',
                                'stocks.item.name',
                                'stocks.item.category',
                                'stocks.item.description'
                            ]
                        }
                    }
                },
                {
                    $match: { modifier: orgId }
                },
                {
                    $group: (0, groupers_1.groupInvoice)(group)
                },
                {
                    $sort: {
                        year: -1,
                        month: -1,
                        day: 1
                    }
                }
            ]);
            return invoices;
        }
    },
    Mutation: {
        checkOut: async (_, { invoice }, { req, res }) => {
            Auth.checkSignedIn(req);
            const { data: { orgId, uid } } = req;
            let updatedStocks = [];
            const client = await models_2.Client.findById(orgId);
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
                        phone: staff.phone,
                        email: staff.email,
                        lastName: staff.lastName,
                        firstName: staff.firstName,
                    });
            let newInvoice = {};
            if (invoice._id) {
                let oldInvoice = await models_1.Invoice.findById(invoice._id).lean();
                oldInvoice.stocks = oldInvoice.stocks.map((oldStock) => {
                    let stock = invoice.stocks.find((newStock) => newStock.item._id === oldStock.item._id);
                    let diff = (stock.quantity - oldStock.quantity) * -1;
                    if (diff)
                        models_1.Product.findByIdAndUpdate(ObjectId(stock.item._id), { $inc: { instock: diff } }, { new: true }, (e, data) => {
                            if (e) {
                                throw e;
                            }
                            else {
                                updatedStocks.push(data);
                            }
                        });
                    return stock;
                });
                oldInvoice = {
                    ...oldInvoice,
                    modified: user,
                    recieved: invoice.recieved,
                    completed: invoice.completed,
                    customer: invoice.customer
                };
                newInvoice = await models_1.Invoice.findByIdAndUpdate(ObjectId(invoice._id), { ...oldInvoice }, { new: true });
            }
            else {
                newInvoice = await models_1.Invoice.create({
                    ...invoice,
                    added: user,
                    modified: user,
                    modifier: orgId,
                    seen: [{ usr: orgId }]
                });
                invoice = {
                    ...invoice,
                    stocks: invoice.stocks.map((s) => ({
                        ...s,
                        item: {
                            ...s.item,
                            instock: s.item.instock - s.quantity
                        }
                    })),
                    modified: user,
                };
            }
            let stocks = invoice.stocks.map((s) => s.item);
            invoice.stocks.forEach(async (i) => {
                await models_1.Product.findByIdAndUpdate(ObjectId(i.item._id), { $inc: { instock: (i.quantity * -1) } }, { new: true });
            });
            (0, fcm_1.sendMessage)(invoice, client.msgTokens);
            return newInvoice;
        },
        deleteInvoice: async (_, { refund }) => {
            let oldInvoice = await models_1.Invoice.findById(refund.invoiceId);
            const stockToRemove = oldInvoice.stocks.find((stock) => stock._id.toString() === refund.stock._id);
            oldInvoice.stocks = oldInvoice.stocks.filter((stock) => stock._id.toString() != refund.stock._id);
            oldInvoice.stocks.length === 0 ?
                await models_1.Invoice.findByIdAndDelete(ObjectId(refund.invoiceId))
                :
                    await oldInvoice.save();
            await models_1.Product.findByIdAndUpdate(ObjectId(refund.stock.item._id), {
                $inc: {
                    instock: refund.stock.quantity
                }
            }, {
                new: true
            });
            return stockToRemove;
        }
    },
    Subscription: {
        onCheckOut: {},
        onStockQtyChange: {}
    }
};
//# sourceMappingURL=invoice.js.map