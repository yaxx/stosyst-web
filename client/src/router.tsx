import React from "react";
import ReactDOM from "react-dom/client";
import { createRoutesFromElements } from "react-router-dom";
import { Route } from "react-router-dom";
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import { RequireAuth } from "./components/auth";
import { SettingsNavHeader } from "./components/headers";
import "./index.css";
import ErrorPage from "./pages/error";
import { ExpensePage } from "./pages/expenses";
import ExplorePage from "./pages/explore";
import { InvoicePage } from "./pages/invoices-page";
import Reciept from "./pages/reciept";
import { Root } from "./pages/root";
import Layout from "./pages/settings/layout";
import Profile from "./pages/settings/profile";
import Security from "./pages/settings/security";
import { Staffs } from "./pages/settings/staff";
import SignIn from "./pages/signin";
import SignUp from "./pages/singup";
import { StocksPage } from "./pages/stocks-page";
import { SummaryPage } from "./pages/summary";


export const router = createBrowserRouter(
    createRoutesFromElements(
        <Route
            path="/"
            element={<Root />}
            errorElement={<ErrorPage />}
        >
            <Route errorElement={<ErrorPage />}>
                <Route index element={
                <RequireAuth>
                    <StocksPage />
                </RequireAuth>
                } />
                <Route
                    path="/signin"
                    element={<SignIn />}
                />
                <Route
                    path="/signup"
                    element={<SignUp />}
                />
                <Route
                    path="/expenses"
                    element={
                    <RequireAuth>
                        <ExpensePage />
                    </RequireAuth>
                }
                />
                <Route
                    path="/invoices"
                    element={
                    <RequireAuth><InvoicePage /></RequireAuth>
                }
                />
                <Route
                    path="/explore"
                    element={
                    <RequireAuth>
                        <ExplorePage />
                    </RequireAuth>
                }
                />
                <Route
                    path="/summary"
                    element={
                    <RequireAuth>
                        <SummaryPage />
                    </RequireAuth>}
                />
                <Route element={<Layout />}>
                    <Route path='/settings'  element={
                        <RequireAuth>
                            <Profile />
                        </RequireAuth>
                    }
                    />
                    <Route
                        path="/staffs"
                        element={
                        <RequireAuth>
                            <Staffs />
                        </RequireAuth> 
                    }
                    />
                    <Route
                        path="/security"
                        element={
                        <RequireAuth>
                            <Security />
                        </RequireAuth>
                    }
                    />
                </Route>
            </Route>
        </Route>
    )
);