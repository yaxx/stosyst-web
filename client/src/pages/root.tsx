import { ApolloProvider } from "@apollo/client";
import { Fragment } from "react";
import { Outlet } from "react-router-dom";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import client from "../apollo-client";
import { Wrap } from "../App";
import { TableModal } from "../components/modals";
import { NotificationsModal } from "../components/modals/notifications";
import { SettingsModal } from "../components/modals/settingsmodal";
import { locals } from "../store/data";
import { theme } from "../theme";


const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${props => props.theme.mode === 'dark' ? props.theme.dark.colors.backgrounds.base.pri : props.theme.light.colors.backgrounds.base.pri
    }
  }
`
export function Root() {
    const closeAppMenu = () => {
    locals({
        ...locals(),
        app_menu: false
    })
}
    return (
        <ThemeProvider theme={theme}>
            <GlobalStyle />
            <ApolloProvider client={client}>
                <Fragment>
                    <TableModal />
                    <SettingsModal />
                    <NotificationsModal />
                </Fragment>
            <Wrap onClick={() => closeAppMenu()}>
                <Outlet />
            </Wrap>
            </ApolloProvider>
        </ThemeProvider>
        
    );
}