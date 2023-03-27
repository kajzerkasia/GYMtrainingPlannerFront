import {Logo} from "../Logo/Logo";
import './Plan.css';
import React from "react";
import {Calendar} from "../Calendar/Calendar";
import {VscAdd} from "react-icons/vsc";

export const Plan = () => {
    return (
        <div className="wrapper">
            <h1 className="main-h1">GYM training Planner</h1>

            <div className="main-plan">
                <table className="main-table">
                    <thead className="gradient-bgc-tr">
                    <tr>
                        <td><h1>Mój plan</h1></td>
                        <td className="add">
                            <button type="submit"><VscAdd className="icon"/></button>
                        </td>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td><Logo to="/rules" text="Zasady progresji"/></td>
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
                    </tbody>
                </table>
                {/*<Calendar/>*/}
            </div>
        </div>
    )
}

// dodać logowanie jako autor planu i jako użytkownik

// autor ma prawo do edycji a użytkownik tylko do wglądu