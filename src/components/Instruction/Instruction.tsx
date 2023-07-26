import React from "react";
import {GoBack} from "../GoBack/GoBack";
import {TbBarbell, TbPlus, TbCheck, TbX, TbStairsUp, TbDotsVertical, TbLink} from "react-icons/tb";
import {IconContext} from "react-icons";
import './Instruction.css';

export const Instruction = () => {
    return (
        <div className="instruction-wrapper">
            <h1><GoBack to="/plans" text="GYM Training Planner"/></h1>
            <h2 className="instruction-h2">Jak to działa?</h2>
            <ul>
                <li>
                    <IconContext.Provider value={{className: 'react-icons-instruction'}}>
                        <TbDotsVertical/>
                    </IconContext.Provider>
                    szczegóły planu treningowego
                </li>
                <li>
                    <IconContext.Provider value={{className: 'react-icons-instruction'}}>
                        <TbStairsUp/>
                    </IconContext.Provider>
                    zasady progresji w planie treningowym
                </li>
                <li>
                    <IconContext.Provider value={{className: 'react-icons-instruction'}}>
                        <TbPlus/>
                    </IconContext.Provider>
                    dodawanie nowych wierszy do tabeli
                </li>
                <li>
                    <IconContext.Provider value={{className: 'react-icons-instruction'}}>
                        <TbCheck/>
                    </IconContext.Provider>
                    zapisywanie zmian wprowadzonych w tabeli
                </li>
                <li>
                    <IconContext.Provider value={{className: 'react-icons-instruction'}}>
                        <TbX/>
                    </IconContext.Provider>
                    usuwanie wierszy
                </li>
                <li>
                    <IconContext.Provider value={{className: 'react-icons-instruction'}}>
                        <TbBarbell/>
                    </IconContext.Provider>
                    lista ćwiczeń danej części planu
                </li>
                <li className="last">
                    <IconContext.Provider value={{className: 'react-icons-instruction'}}>
                        <TbLink/>
                    </IconContext.Provider>
                    przejście do podanego adresu URL
                </li>
            </ul>
            <button className="btn-back" onClick={() => window.history.back()}>
                Powrót
            </button>
        </div>
    )
}