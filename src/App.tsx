import React from 'react';
import {Route, Routes} from "react-router-dom";
import {RulesTable} from "./components/RulesTable/RulesTable";
import {Instruction} from "./components/Instruction/Instruction";
import {ExercisesTable} from "./components/ExercisesTable/ExercisesTable";
import {PartsOfPlanTable} from "./components/PartsOfPlanTable/PartsOfPlanTable";
import {Navigate} from 'react-router-dom';
import {Error} from "./components/Error/Error";
import {PlanDetailsTable} from "./components/PlanDetails/PlanDetailsTable";
import './App.css';
import {PlansList} from "./components/PlansList/PlansList";

export const App = () => {

    return (
        <>
            <Routes>
                <Route path="/" element={<Navigate to="/list"/>}/>
                <Route path="/list" element={<PlansList/>}/>
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


