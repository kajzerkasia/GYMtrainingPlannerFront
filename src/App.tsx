import React from 'react';
import './App.css';
import {Logo} from "./components/Logo/Logo";
import {Route, Routes} from "react-router-dom";
import {PlansArea} from "./components/PlansArea/PlansArea";
import {Exercise} from "./components/Exercise/Exercise";
import {Progression} from "./components/Progression/Progression";
import {AddPlanForm} from "./components/AddPlanForm/AddPlanForm";
import {AddProgression} from "./components/Progression/AddProgression";
import {Instruction} from "./components/Instruction/Instruction";
import {Profile} from "./components/Profile/Profile";
import {TableBodyInput} from "./components/Table/TableBodyInput";
import {TableForm} from "./components/Table/TableForm";
import {Table} from "./components/Table/Table";

export const App = () => {

    return (
        <>
            <Routes>
                <Route path="/" element={<Logo to="/plans" text="GYM training Planner"/>}/>
                <Route path="/plans" element={<PlansArea/>}/>
                <Route path="/exercises" element={<Table/>}/>
                <Route path="/add-exercises" element={<TableBodyInput/>}/>
                <Route path="/progression" element={<Progression/>}/>
                <Route path="/add-progression" element={<AddProgression/>}/>
                <Route path="/add-plan" element={<AddPlanForm/>}/>
                <Route path="/instruction" element={<Instruction/>}/>
                <Route path="/table" element={<Profile/>}/>
            </Routes>
        </>
    )
}


