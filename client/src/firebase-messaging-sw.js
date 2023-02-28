/* eslint-disable no-undef */
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
// importScripts("https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js")
// importScripts("https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js")
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
export const messaging = getMessaging(app);


getToken(messaging, { vapidKey: 'BCheeVz1kZCc0CnM2ZL1tgNtmzUKzb9FPDYRytPfOFmMoutVYIwisWHJMVg7zYc59Hg1TszRNHdtr7uxdGX0AEw' }).then((token) => {
  if (token) {
    console.log(token);
    // Send the token to your server and update the UI if necessary
    // ...
  } else {
    // Show permission request UI
    console.log('No registration token available. Request permission to generate one.');
    // ...
  }
}).catch((err) => {
  console.log('An error occurred while retrieving token. ', err);
  // ...
});

//  messaging.onBackgroundMessage(function(payload) {
//     console.log('Recieved background message', payload);
//     const title =  payload.notification.title
//     const notifications = {
//         body: payload.notification.body,
//         icon: '../server/api/src/public/images/01102021750764.jpg'
//     }
//     // eslint-disable-next-line no-restricted-globals
//     return self.registrations.showNotification(title, notifications)
//  })
