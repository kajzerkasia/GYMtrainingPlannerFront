import React, {lazy, Suspense} from 'react';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {Error} from "./pages/Error/Error";
import RootLayout from "./pages/RootLayout";
import Authentication, {action as authAction} from "./pages/Authentication";
import {action as logoutAction} from './pages/Logout';
import './App.css';
import {tokenLoader} from "./helpers/auth";
import Home from "./pages/Home";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import SuspenseFallback from "./components/SuspenseFallback/SuspenseFallback";

const Exercises = lazy(() => import('./pages/Exercises'));
const Plans = lazy(() => import('./pages/Plans'));
const PartsOfPlan = lazy(() => import('./pages/PartsOfPlan'));
const ProgressionRules = lazy(() => import('./pages/ProgressionRules'));
const PlanDetails = lazy(() => import('./pages/PlanDetails'));
const Instruction = lazy(() => import('./pages/Instruction/Instruction'));
const Calendar = lazy(() => import('./pages/Calendar'));

const router = createBrowserRouter([
    {
        path: '/',
        element: <RootLayout/>,
        errorElement: <Error/>,
        id: 'root',
        loader: tokenLoader,
        children: [
            {
                index: true,
                element: <Home/>
            },
            {
                path: 'auth',
                element: <Authentication/>,
                action: authAction,
            },
            {
                path: 'logout',
                action: logoutAction,
            },
            {
                path: 'list/:userId',
                element:
                    <Suspense fallback={<SuspenseFallback/>}>
                        <Plans/>
                    </Suspense>,
            },
            {
                path: 'plans/:slug',
                element:
                    <Suspense fallback={<SuspenseFallback/>}>
                        <PartsOfPlan/>
                    </Suspense>,
            },
            {
                path: 'exercises/:slug',
                element:
                    <Suspense fallback={<SuspenseFallback/>}>
                        <Exercises/>
                    </Suspense>,
            },
            {
                path: 'rules/:slug',
                element:
                    <Suspense fallback={<SuspenseFallback/>}>
                        <ProgressionRules/>
                    </Suspense>,
            },
            {
                path: 'details/:slug',
                element:
                    <Suspense fallback={<SuspenseFallback/>}>
                        <PlanDetails/>
                    </Suspense>,
            },
            {
                path: 'instruction',
                element:
                    <Suspense fallback={<SuspenseFallback/>}>
                        <Instruction/>
                    </Suspense>,
            },
            {
                path: 'calendar',
                element:
                    <Suspense fallback={<SuspenseFallback/>}>
                        <Calendar/>
                    </Suspense>,
            },
        ],
    },
]);

const queryClient = new QueryClient();

export const App = () => {

    return (
        <QueryClientProvider client={queryClient}>
            <RouterProvider router={router}/>
        </QueryClientProvider>
    );
}


