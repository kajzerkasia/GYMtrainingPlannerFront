import React from 'react';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {RulesTable} from "./pages/RulesTable";
import {Instruction} from "./components/Instruction/Instruction";
import {ExercisesTable} from "./pages/ExercisesTable";
import {PartsOfPlanTable} from "./pages/PartsOfPlanTable";
import {Navigate} from 'react-router-dom';
import {Error} from "./components/Error/Error";
import {PlanDetailsTable} from "./pages/PlanDetailsTable";
import './App.css';
import {PlansList} from "./pages/PlansList";
import RootLayout from "./pages/RootLayout";

const router = createBrowserRouter([
    {
        path: '/',
        element: <RootLayout/>,
        errorElement: <Error/>,
        children: [
            {index: true, element: <Navigate to="/list"/>},
            {path: 'list', element: <PlansList/>},
            {path: 'plans/:slug', element: <PartsOfPlanTable/>},
            {path: 'exercises/:slug', element: <ExercisesTable/>},
            {path: 'rules/:slug', element: <RulesTable/>},
            {path: 'details/:slug', element: <PlanDetailsTable/>},
            {path: 'instruction', element: <Instruction/>},
        ],
    },
]);
export const App = () => {
    return <RouterProvider router={router}/>;
}


