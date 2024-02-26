import React, {lazy, Suspense} from 'react';
import {ActionFunction, createBrowserRouter, RouterProvider} from "react-router-dom";
import {Error} from "./pages/Error/Error";
import RootLayout from "./pages/RootLayout/RootLayout";
import Authentication, {action as authAction} from "./pages/Authentication";
import {action as logoutAction} from './pages/Logout';
import {tokenLoader} from "./helpers/auth";
import Home from "./pages/Home/Home";
import SuspenseFallback from "./components/SuspenseFallback/SuspenseFallback";
import './App.css';
import CalendarEvents from "./pages/Calendar/CalendarEvents";

const Exercises = lazy(() => import('./pages/Exercises'));
const Plans = lazy(() => import('./pages/Plans'));
const PartsOfPlan = lazy(() => import('./pages/PartsOfPlan'));
const ProgressionRules = lazy(() => import('./pages/ProgressionRules'));
const PlanDetails = lazy(() => import('./pages/PlanDetails'));
const Instruction = lazy(() => import('./pages/Instruction/Instruction'));
const Calendar = lazy(() => import('./pages/Calendar/Calendar'));

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
                action: authAction as unknown as ActionFunction,
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
                path: 'calendar/:userId',
                element:
                    <Suspense fallback={<SuspenseFallback/>}>
                        <Calendar/>
                    </Suspense>,
            },
            {
                path:'calendar/:userId/trainings',
                element:
                    <Suspense fallback={<SuspenseFallback/>}>
                        <CalendarEvents/>
                    </Suspense>,
            }
        ],
    },
]);

export const App = () => {

    return (
            <RouterProvider router={router}/>
    );
}


