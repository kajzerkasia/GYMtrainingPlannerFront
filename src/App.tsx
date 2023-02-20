import React from 'react';
import './App.css';
import {Logo} from "./components/Logo/Logo";
import {Route, Routes} from "react-router-dom";
import {PlansArea} from "./components/PlansArea/PlansArea";
import {Progression} from "./components/Progression/Progression";
import {AddProgression} from "./components/Progression/AddProgression";
import {Instruction} from "./components/Instruction/Instruction";
import {AddExercisesTable} from "./components/Table/AddExercisesTable";
import {TableFormInputs} from "./components/Table/TableFormInputs";
import {TableBody} from "./components/Table/TableBody";
import {AddPlan} from "./components/Plan/AddPlan";
import {TableHeader} from "./components/Table/TableHeader";
import {TableHeaderAndBody} from "./components/Table/TableHeaderAndBody";

export const App = () => {

    return (
        <>
            <Routes>
                <Route path="/" element={<Logo to="/plans" text="GYM training Planner"/>}/>
                <Route path="/plans" element={<PlansArea/>}/>
                {/*<Route path="/exercises" element={<TableHeaderAndBody/>}/>*/}
                <Route path="/add-exercises" element={<AddExercisesTable/>}/>
                <Route path="/progression" element={<Progression/>}/>
                <Route path="/add-progression" element={<AddProgression/>}/>
                <Route path="/add-plan" element={<AddPlan/>}/>
                <Route path="/instruction" element={<Instruction/>}/>
            </Routes>
        </>
    )
}


