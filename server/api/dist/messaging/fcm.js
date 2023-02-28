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
exports.sendMessage = void 0;
const firebase_admin_1 = __importDefault(require("firebase-admin"));
const serviceAccount = __importStar(require("../serviceAccountKey.json"));
const params = {
    type: serviceAccount.type,
    projectId: serviceAccount.project_id,
    privateKeyId: serviceAccount.private_key_id,
    privateKey: serviceAccount.private_key,
    clientEmail: serviceAccount.client_email,
    clientId: serviceAccount.client_id,
    authUri: serviceAccount.auth_uri,
    tokenUri: serviceAccount.token_uri,
    authProviderX509CertUrl: serviceAccount.auth_provider_x509_cert_url,
    clientC509CertUrl: serviceAccount.client_x509_cert_url
};
firebase_admin_1.default.initializeApp({
    credential: firebase_admin_1.default.credential.cert(params),
    databaseURL: "https://nexto-5eeba-firebaseio.com"
});
const composeNotification = ({ stocks, recieved }, tokens) => {
    console.log(tokens);
    const body = stocks.map((stock) => stock.item.name.substr(0, 15)).slice(0, 3).toString();
    const message = {
        notification: {
            title: new Intl.NumberFormat('en-US').format(recieved),
            body
        },
        android: {
            notification: {
                click_action: "OPEN_ACTIVITY_1",
                sound: "default"
            }
        },
        tokens
    };
    return message;
};
const sendMessage = (invoice, tokens) => {
    firebase_admin_1.default
        .messaging()
        .sendMulticast(composeNotification(invoice, tokens))
        .then((response) => {
        console.log(tokens);
    })
        .catch((error) => {
        console.log(error);
    });
};
exports.sendMessage = sendMessage;
//# sourceMappingURL=fcm.js.map