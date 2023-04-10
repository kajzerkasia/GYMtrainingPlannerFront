import React from 'react';
import './App.css';
import {Route, Routes} from "react-router-dom";
import {RulesTable} from "./components/RulesTable/RulesTable";
import {Instruction} from "./components/Instruction/Instruction";
import {ExercisesTable} from "./components/ExercisesTable/ExercisesTable";
import {PartsOfPlanTable} from "./components/PartsOfPlanTable/PartsOfPlanTable";
import { Navigate } from 'react-router-dom';
import {Error} from "./components/Error/Error";
import {PlanDetailsTable} from "./components/PlanDetails/PlanDetailsTable";


export const App = () => {

    return (
        <>
            <Routes>
                <Route path="/" element={ <Navigate to="/plans"/>}/>
                <Route path="/plans" element={<PartsOfPlanTable/>}/>
                <Route path="/exercises/:slug" element={<ExercisesTable/>}/>
                <Route path="/rules" element={<RulesTable/>}/>
                <Route path="/details" element={<PlanDetailsTable/>}/>
                <Route path="/instruction" element={<Instruction/>}/>
                <Route path="*" element={<Error/>}/>
            </Routes>
        </>
    )
}


