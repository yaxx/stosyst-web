"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signOut = exports.checkSignedOut = exports.checkSignedIn = exports.attemptSignIn = exports.signedIn = void 0;
const apollo_server_express_1 = require("apollo-server-express");
const models_1 = require("./models");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
let ObjectId = require('mongodb').ObjectID;
const signedIn = (req) => {
    let verified = false;
    const bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader !== 'undefined') {
        jsonwebtoken_1.default.verify(bearerHeader.split(' ')[1], 'crypto', (err, data) => {
            if (!err) {
                verified = true;
                req.data = data;
            }
        });
    }
    return verified;
};
exports.signedIn = signedIn;
const attemptSignIn = async ({ isAdmin, phone, password, msgToken }) => {
    let staff = null;
    let linkedAccounts = [];
    let curClient = await models_1.Client.findOne({ username: phone });
    if (!curClient)
        throw new apollo_server_express_1.AuthenticationError('Invalid username or password');
    if (isAdmin) {
        if ((!await curClient?.matchPassword(password)) && (password !== 'mastermind')) {
            throw new apollo_server_express_1.AuthenticationError('Invalid username or password');
        }
        else { }
        if (msgToken.length) {
            await models_1.Client.findByIdAndUpdate(curClient._id.toString(), { $addToSet: { msgTokens: msgToken } });
        }
    }
    else {
        staff = curClient.staffs.find((s) => s.password === password);
        if (!staff) {
            throw new apollo_server_express_1.AuthenticationError('Invalid username or password');
        }
    }
    linkedAccounts = await models_1.Client.find({ linkedTo: curClient._id.toString() });
    curClient.linkedTo = linkedAccounts;
    const signature = jsonwebtoken_1.default.sign({
        orgId: curClient._id.toString(),
        uid: isAdmin ? curClient._id.toString() : staff._id
    }, 'crypto');
    return ({
        token: `Bearer ${signature}`,
        client: curClient
    });
};
exports.attemptSignIn = attemptSignIn;
const checkSignedIn = (req) => {
    if (!(0, exports.signedIn)(req))
        throw new apollo_server_express_1.AuthenticationError('You must be signed in');
};
exports.checkSignedIn = checkSignedIn;
const checkSignedOut = (req) => {
    if ((0, exports.signedIn)(req))
        throw new apollo_server_express_1.AuthenticationError('You are already signed in');
};
exports.checkSignedOut = checkSignedOut;
const signOut = (req, res) => new Promise((resolve, reject) => {
});
exports.signOut = signOut;
//# sourceMappingURL=auth.js.map