import React from 'react';
import './App.css';
import {Logo} from "./components/Logo/Logo";
import {Route, Routes} from "react-router-dom";
import {PlansArea} from "./components/PlansArea/PlansArea";
import {Progression} from "./components/Progression/Progression";
import {AddProgression} from "./components/Progression/AddProgression";
import {Instruction} from "./components/Instruction/Instruction";
import {AddPlan} from "./components/Plan/AddPlan";
import {TableHeaderAndBody} from "./components/Table/TableHeaderAndBody";
import {TableBody} from "./components/Table/TableBody";
import {TableOfExercises} from "./components/Table/TableOfExercises";
import {AddExercisesTable} from "./components/Table/AddExercisesTable";


export const App = () => {

    return (
        <>
            <Routes>
                <Route path="/" element={<Logo to="/plans" text="GYM training Planner"/>}/>
                <Route path="/plans" element={<PlansArea/>}/>
                {/*<Route path="/exercises" element={<TableOfExercises/>}/>*/}
                <Route path="/add-exercises" element={<AddExercisesTable/>}/>
                <Route path="/progression" element={<Progression/>}/>
                <Route path="/add-progression" element={<AddProgression/>}/>
                <Route path="/add-plan" element={<AddPlan/>}/>
                <Route path="/instruction" element={<Instruction/>}/>
            </Routes>
        </>
    )
}


