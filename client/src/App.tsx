import './App.css'
import { SideNav } from './components/sideNavigation/SideNav'
import { StocksPage } from './pages/stocks-page'
import { InvoicePage } from './pages/invoices-page'
import { ExpensePage } from './pages/expenses'
import { TableModal } from './components/modals'
import SignIn from './pages/signin'
import { theme } from './theme'
import { ApolloProvider } from '@apollo/client'
import client from './apollo-client'
import SignUp from './pages/singup'
import { withCookies } from 'react-cookie';
import styled, { createGlobalStyle, ThemeProvider } from 'styled-components'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  // Redirect
} from 'react-router-dom'

import Profile from './pages/settings/profile'
import Security from './pages/settings/security'
import { Fragment, useEffect, useState } from 'react'
import { SettingsNavHeader } from './components/headers'
import { Staffs } from './pages/settings/staff'
import { locals } from './store/data'
// import GuardedRoute from './components/guard'
import Subscription from './pages/settings/subscription'
import { SummaryPage } from './pages/summary'
import { SettingsModal } from './components/modals/settingsmodal'
import { NotificationsModal } from './components/modals/notifications'

// import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { messaging } from './firebase-messaging-sw'
import { RouterProvider } from 'react-router-dom'
import { router } from './router'

// import { router } from './router'

// import { unregister } from './serviceWorker';

// unregister();

export const Wrap = styled.div`
  height: 100%;
  padding-top: 55px;
  overflow: visible;
`
const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${
      props => props.theme.mode === 'dark' ? props.theme.dark.colors.backgrounds.base.pri : props.theme.light.colors.backgrounds.base.pri
    }
  }
`
const App = (props:any) => {
  useEffect(() => {
    // getToken(messaging, { vapidKey: 'BCheeVz1kZCc0CnM2ZL1tgNtmzUKzb9FPDYRytPfOFmMoutVYIwisWHJMVg7zYc59Hg1TszRNHdtr7uxdGX0AEw' }).then((currentToken) => {
    //   if (currentToken) {
    //     console.log(currentToken);
    //     locals({...locals(), msgToken: currentToken})
    //     // Send the token to your server and update the UI if necessary

    //   } else {
    //     // Show permission request UI
    //     console.log('No registration token available. Request permission to generate one.');
    //   }
    // }).catch((err) => {
    //   console.log('An error occurred while retrieving token. ', err);
    // });

    // getDeviceToken(setTokenFound);
  }, [])

  // onMessageListener().then(payload => {
  //   setShow(true);
  //   setNotification({ title: payload.notification.title, body: payload.notification.body })
  //   console.log(payload);
  // }).catch(err => console.log('failed: ', err));

 
  return (
      <RouterProvider router={router} />
  )
}

export default withCookies(App)
