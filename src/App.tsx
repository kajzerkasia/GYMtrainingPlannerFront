import React from 'react';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {RulesTable} from "./components/RulesTable/RulesTable";
import {Instruction} from "./components/Instruction/Instruction";
import {ExercisesTable} from "./components/ExercisesTable/ExercisesTable";
import {PartsOfPlanTable} from "./components/PartsOfPlanTable/PartsOfPlanTable";
import {Navigate} from 'react-router-dom';
import {Error} from "./components/Error/Error";
import {PlanDetailsTable} from "./components/PlanDetails/PlanDetailsTable";
import './App.css';
import {PlansList} from "./components/PlansList/PlansList";
import RootLayout from "./pages/RootLayout";

const router = createBrowserRouter([
    {
        path: '/',
        element: <RootLayout/>,
        errorElement: <Error/>,
        children: [
            {path: '/', element: <Navigate to="/list"/>},
            {path: '/list', element: <PlansList/>},
            {path: '/plans/:slug', element: <PartsOfPlanTable/>},
            {path: '/exercises/:slug', element: <ExercisesTable/>},
            {path: '/rules/:slug', element: <RulesTable/>},
            {path: '/details/:slug', element: <PlanDetailsTable/>},
            {path: '/instruction', element: <Instruction/>},
        ],
    },
]);
export const App = () => {
    return <RouterProvider router={router}/>;
}


