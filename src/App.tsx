import React from 'react';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {RulesTable} from "./pages/RulesTable";
import {Instruction} from "./components/Instruction/Instruction";
import {ExercisesTable, loader as exercisesLoader} from "./pages/ExercisesTable";
import {PartsOfPlanTable} from "./pages/PartsOfPlanTable";
import {Error} from "./pages/Error/Error";
import {PlanDetailsTable} from "./pages/PlanDetailsTable";
import {loader as plansLoader, action as manipulatePlanAction, PlansList} from "./pages/PlansList";
import RootLayout from "./pages/RootLayout";
import Authentication, {action as authAction} from "./pages/Authentication";
import {action as logoutAction} from './pages/Logout';
import './App.css';
import { tokenLoader} from "./helpers/auth";
import Home from "./pages/Home";
import {Calendar} from "./components/Calendar/Calendar";

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
                path: 'list',
                element: <PlansList/>,
                loader: plansLoader,
                action: manipulatePlanAction,
            },
            {path: 'plans/:slug', element: <PartsOfPlanTable/>},
            {path: 'exercises/:slug', element: <ExercisesTable/>, loader: exercisesLoader},
            {path: 'rules/:slug', element: <RulesTable/>},
            {path: 'details/:slug', element: <PlanDetailsTable/>},
            {path: 'instruction', element: <Instruction/>},
            {path: 'calendar', element: <Calendar/>},
        ],
    },
]);
export const App = () => {
    return (
        <RouterProvider router={router}/>
    );
}


