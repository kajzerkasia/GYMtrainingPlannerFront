import React from 'react';
import './App.css';
import {Logo} from "./components/Logo/Logo";
import {Route, Routes} from "react-router-dom";
import {RulesTable} from "./components/RulesTable/RulesTable";
import {Instruction} from "./components/Instruction/Instruction";
import {ExercisesTable} from "./components/ExercisesTable/ExercisesTable";
import {Plan} from "./components/Plan/Plan";
import {PartsOfPlanTable} from "./components/PartsOfPlanTable/PartsOfPlanTable";


export const App = () => {

    return (
        <>
            <Routes>
                <Route path="/" element={<Logo to="/plans" text="GYM training Planner"/>}/>
                <Route path="/plans" element={<PartsOfPlanTable/>}/>
                <Route path="/exercises" element={<ExercisesTable/>}/>
                <Route path="/rules" element={<RulesTable/>}/>
                <Route path="/instruction" element={<Instruction/>}/>
            </Routes>
        </>
    )
}


