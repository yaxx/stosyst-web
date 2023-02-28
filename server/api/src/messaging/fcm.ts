import { initializeApp } from 'firebase-admin/app';
import admin from 'firebase-admin'
// const serviceAccount = require("../serviceAccountKey.json");

import * as serviceAccount from '../serviceAccountKey.json'

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
}

admin.initializeApp({
  credential: admin.credential.cert(params),
  databaseURL: "https://nexto-5eeba-firebaseio.com"
});

const composeNotification = ({stocks, recieved}: any, tokens:String[]) => {

    console.log(tokens)
    
    const body = stocks.map((stock: any) => stock.item.name.substr(0, 15)).slice(0, 3).toString()

    const message: any = {
        notification: {
            title: new Intl.NumberFormat('en-US').format(recieved),
            body
        },
        android: {
            notification: {
                click_action:"OPEN_ACTIVITY_1",
                sound: "default"
            }
        },
        tokens
    }
    return message
}

export const sendMessage = (invoice: any, tokens: string[])=>{
    admin
    .messaging()
    .sendMulticast(composeNotification(invoice, tokens))
    .then((response: any)=>{
        console.log(tokens)
    })
    .catch((error: any)=>{
        console.log(error);
    })
}

 
