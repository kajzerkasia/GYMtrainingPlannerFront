import React from "react";
import './Header.css'
import {Logo} from "../Logo/Logo";

export const Header = () => {
    return (
        <div className="header">
            <header>
                <h1>GYM training Planner</h1>
                <h2>Your plans:</h2>
                <Logo to="/add-plan" text="Add new training plan"/>
            </header>
            <div className="plans"></div>
        </div>
    )
}