import React from "react";
import ReactDOM from "react-dom/client";
import { createRoutesFromElements } from "react-router-dom";
import { Route } from "react-router-dom";
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import { RequireAuth } from "./components/auth";
import "./index.css";
import ErrorPage from "./pages/error";
import { ExpensePage } from "./pages/expenses";
import { InvoicePage } from "./pages/invoices-page";
import { Root } from "./pages/root";
import Profile from "./pages/settings/profile";
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
                        <RequireAuth>
                            <InvoicePage />
                        </RequireAuth>
                    }
                />
                <Route
                    path="/summary"
                    element={
                        <RequireAuth>
                            <SummaryPage />
                        </RequireAuth>
                    }
                />
                {/* <Route
                    path="/settings"
                >
                    <Route index element={
                        <RequireAuth>
                            <Profile />
                        </RequireAuth>
                    }/>
                    <Route
                        path="/expenses"
                        element={
                            <RequireAuth>
                                <ExpensePage />
                            </RequireAuth>
                        }
                    />
                </Route> */}
            </Route>
        </Route>
    )
);