import React from 'react';
import './App.css';
import {Logo} from "./components/Logo/Logo";
import {Route, Routes} from "react-router-dom";
import {PlansArea} from "./components/PlansArea/PlansArea";
import {Exercise} from "./components/Exercise/Exercise";
import {Progression} from "./components/Progression/Progression";

export const App = () => {

    return (
        <>
            <Routes>
                <Route path="/" element={<Logo to="/plans" text="GYM training Planner"/>}/>
                <Route path="/plans" element={<PlansArea/>}/>
                <Route path="/exercises" element={<Exercise/>}/>
                <Route path="/progression" element={<Progression/>}/>
            </Routes>
        </>
    )
}

