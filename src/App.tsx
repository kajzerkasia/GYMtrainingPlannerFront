import React from 'react';
import './App.css';
import {Logo} from "./components/Logo/Logo";
import {Route, Routes} from "react-router-dom";
import {AddRulesTable} from "./components/RulesTable/AddRulesTable";
import {RulesForm} from "./components/RulesTable/RulesForm";
import {Instruction} from "./components/Instruction/Instruction";
import {AddExercisesTable} from "./components/ExercisesTable/AddExercisesTable";
import {Plan} from "./components/Plan/Plan";


export const App = () => {

    return (
        <>
            <Routes>
                <Route path="/" element={<Logo to="/plans" text="GYM training Planner"/>}/>
                <Route path="/plans" element={<Plan/>}/>
                <Route path="/exercises" element={<AddExercisesTable/>}/>
                <Route path="/exercises/:id" element={<AddExercisesTable/>}/>
                <Route path="/rules" element={<AddRulesTable/>}/>
                <Route path="/instruction" element={<Instruction/>}/>
            </Routes>
        </>
    )
}


