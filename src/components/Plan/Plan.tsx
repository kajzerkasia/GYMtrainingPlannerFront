import {Logo} from "../Logo/Logo";
import './Plan.css';
import React from "react";
import {Calendar} from "../Callendar/Calendar";

export const Plan = () => {
    return (
        <div className="wrapper">
            <h1>GYM training Planner</h1>

            <div className="main-plan">
                <table>
                    <tr className="gradient-bgc-tr">
                        <td><h1>Mój plan</h1></td>
                    </tr>
                    <tr>
                        <td><Logo to="/exercises" text="Rozgrzewka"/></td>
                    </tr>
                    <tr>
                        <td>
                            <Logo to="/exercises" text="Dzień A"/>
                        </td>
                    </tr>
                    <tr>
                        <td><Logo to="/exercises" text="Dzień B"/></td>
                    </tr>
                    <tr>
                        <td><Logo to="/progression" text="Progresja"/></td>
                    </tr>
                </table>
                <Calendar/>
            </div>
        </div>
    )
}