// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCDiya-9JxBX8fEHVPSFhb9d83SwkjM0bw",
  authDomain: "nexto-5eeba.firebaseapp.com",
  projectId: "nexto-5eeba",
  storageBucket: "nexto-5eeba.appspot.com",
  messagingSenderId: "123557233842",
  appId: "1:123557233842:web:6eafac73b98ac1743735ab",
  measurementId: "G-RYSBEFJ40X"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

// export const getDeviceToken = async (setTokenFound) => {
//   let currentToken = '';
//   try {
//     currentToken = await getToken(messaging, {vapidKey: 'BCheeVz1kZCc0CnM2ZL1tgNtmzUKzb9FPDYRytPfOFmMoutVYIwisWHJMVg7zYc59Hg1TszRNHdtr7uxdGX0AEw'})
//     console.log(currentToken);
//     currentToken ? setTokenFound(true) : setTokenFound(false)
//   } catch (error) {
//     console.log(error);
//   }
//   return currentToken;
// }


// export const onMessageListener = () =>
//   new Promise((resolve) => {
//     onMessage(messaging, (payload) => {
//       resolve(payload);
//     });
// })
