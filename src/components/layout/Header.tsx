import React from "react";
import './Header.css'

export const Header = () => {
    return (
        <div className="header">
            <header>
                <h1>GYM training Planner</h1>
                <h2>Your plans:</h2>
                <button>Add new training plan</button>
            </header>
            <div className="plans"></div>
        </div>
    )
}