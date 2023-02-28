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
exports.pubsub = void 0;
const models_1 = require("../../models");
const models_2 = require("../../models");
const Auth = __importStar(require("../../auth"));
const pipelines_1 = require("../../pipelines");
const { ThermalPrinter, PrinterTypes, CharacterSet, BreakLine } = require('node-thermal-printer');
let ObjectId = require('mongodb').ObjectID;
const { PubSub } = require("graphql-subscriptions");
exports.pubsub = new PubSub();
exports.default = {
    Query: {
        products: async (root, { group, offset, filter, query }, { req, res }) => {
            Auth.checkSignedIn(req);
            const { data: { orgId, uid } } = req;
            let result = await models_1.Product.aggregate((0, pipelines_1.getProductsPipeline)(orgId, query, offset, group, filter));
            result = group === 'date' ?
                result.map((r) => ({
                    ...r, _id: r.records[0].createdAt
                }))
                :
                    result;
            return result;
        }
    },
    Mutation: {
        saveProduct: async (_, { product }, { req }) => {
            let stock = {};
            Auth.checkSignedIn(req);
            const client = await models_2.Client.findById(req.data.orgId);
            const staff = client?.staffs.find((s) => s._id.toString() === req.data.uid);
            const isAdmin = req.data.orgId === req.data.uid;
            let user = isAdmin ?
                ({
                    _id: client?._id,
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
            stock = !product._id ? await models_1.Product.create({
                ...product,
                added: user,
                modified: user,
                owner: req.data.orgId
            })
                :
                    stock = await models_1.Product.findByIdAndUpdate(ObjectId(product._id), {
                        ...product,
                        modified: user
                    }, { new: true });
            exports.pubsub.publish('STOCKS', { stock });
            return stock;
        },
        deleteProduct: async (_, { id }) => {
            return await models_1.Product.findByIdAndDelete(ObjectId(id));
        }
    },
    Subscription: {
        stock: {
            subscribe: (_, __, {}) => exports.pubsub.asyncIterator(['STOCKS'])
        }
    }
};
//# sourceMappingURL=product.js.map