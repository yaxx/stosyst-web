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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("../../models");
const validations_1 = require("../../validations");
const Auth = __importStar(require("../../auth"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
let ObjectId = require('mongodb').ObjectID;
exports.default = {
    Query: {
        me: async (root, args, { req }) => {
            Auth.checkSignedIn(req);
            const { data: { orgId, uid } } = req;
            const client = models_1.Client.findById(orgId);
            client.staffs = uid !== orgId ? client.staffs.filter((s) => s._id !== uid) : client.staffs;
            return client;
        },
        account: async (root, args, { req }) => {
            Auth.checkSignedIn(req);
            const { data: { orgId, uid } } = req;
            return await models_1.Client.findById(orgId);
        },
        staffs: async (root, args, { req }) => {
            Auth.checkSignedIn(req);
            const { data: { orgId, uid } } = req;
            const { staffs } = await models_1.Client.findById(orgId);
            return staffs;
        },
        staff: async (root, { id }, { req }) => {
            Auth.checkSignedIn(req);
            const { data: { orgId, uid } } = req;
            const { staffs } = await models_1.Client.findById(orgId);
            return id ? staffs.find((s) => s._id.toString() === id) : staffs.find((s) => s._id.toString() === uid);
        },
    },
    Mutation: {
        signUp: async (root, { info }, { req }) => {
            await validations_1.cred.validateAsync(info);
            const { name, phone, password, msgToken } = info;
            const newClient = await models_1.Client.create({ name, phone, password, msgTokens: [msgToken.trim()] });
            const signature = jsonwebtoken_1.default.sign({
                orgId: newClient._id,
                uid: newClient._id
            }, 'crypto');
            return ({
                dp: newClient.dp,
                org: newClient._id,
                usr: newClient._id,
                name: newClient.name,
                token: `Bearer ${signature}`,
            });
        },
        signIn: async (root, { creds }, { req }) => {
            console.log(creds);
            return await Auth.attemptSignIn(creds);
        },
        saveInfo: async (root, { staff }, { req, res }, info) => {
            Auth.checkSignedIn(req);
            const { data: { orgId, uid } } = req;
            let client = {};
            let updated = null;
            if (!staff._id) {
                client = await models_1.Client.findByIdAndUpdate(ObjectId(orgId), {
                    $push: { staffs: staff }
                }, { new: true }).lean();
                updated = client.staffs[client.staffs.length - 1];
                await models_1.Invoice.updateMany({
                    modifier: req.data.orgId
                }, {
                    $push: { seen: { usr: updated._id } }
                });
                await models_1.Expense.updateMany({
                    modifier: req.data.orgId
                }, {
                    $push: { seen: { usr: updated._id } }
                });
            }
            else {
                client = await models_1.Client.findById(ObjectId(req.data.orgId));
                client.staffs = client.staffs.map((s) => (s._id.toString() === staff._id.toString()) ? staff : s);
                await models_1.Client.findByIdAndUpdate(ObjectId(req.data.orgId), { staffs: client.staffs }, { new: true });
                updated = staff;
            }
            return updated;
        },
        updateAccount: async (root, { accountInfo }, { req }, info) => {
            Auth.checkSignedIn(req);
            return await models_1.Client.findByIdAndUpdate(ObjectId(req.data.orgId), { ...accountInfo }, { new: true });
        },
        deleteStaff: async (root, { id }, { req }, info) => {
            Auth.checkSignedIn(req);
            let { staffs } = await models_1.Client.findById(req.data.orgId);
            staffs = staffs.filter((s) => s._id.toString() !== id);
            await models_1.Client.findByIdAndUpdate(ObjectId(req.data.orgId), { staffs }, { new: true });
            return { id };
        }
    }
};
//# sourceMappingURL=account.js.map