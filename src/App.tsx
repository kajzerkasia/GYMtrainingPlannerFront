import React from 'react';
import './App.css';
import {Logo} from "./components/Logo/Logo";
import {Route, Routes} from "react-router-dom";
import {Progression} from "./components/Progression/Progression";
import {AddProgression} from "./components/Progression/AddProgression";
import {Instruction} from "./components/Instruction/Instruction";
import {AddExercisesTable} from "./components/Table/AddExercisesTable";
import {Plan} from "./components/Plan/Plan";


export const App = () => {

    return (
        <>
            <Routes>
                <Route path="/" element={<Logo to="/plans" text="GYM training Planner"/>}/>
                <Route path="/plans" element={<Plan/>}/>
                <Route path="/exercises" element={<AddExercisesTable/>}/>
                <Route path="/exercises/:id" element={<AddExercisesTable/>}/>
                <Route path="/rules" element={<Progression/>}/>
                <Route path="/progression" element={<AddProgression/>}/>
                <Route path="/instruction" element={<Instruction/>}/>
            </Routes>
        </>
    )
}


