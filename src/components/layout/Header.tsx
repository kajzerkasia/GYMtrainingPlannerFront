import React from "react";
import './Header.css'
import {Logo} from "../Logo/Logo";

export const Header = () => {
    return (
        <div className="header">
            <header>
                <h1>GYM training Planner</h1>
                <h2>Moje plany treningowe:</h2>
                <Logo to="/add-plan" text="Dodaj nowy plan trenignowy"/>
            </header>
        </div>
    )
}