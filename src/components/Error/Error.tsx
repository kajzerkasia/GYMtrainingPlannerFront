import React from 'react';
import {GoBack} from "../GoBack/GoBack";
import {TbMoodCry} from "react-icons/tb";
import {IconContext} from "react-icons";
import './Error.css';


export const Error = () => {
    return (
        <div className="error-container">
            <h1>Ups... Nic tutaj nie ma.</h1>
            <IconContext.Provider value={{className: 'react-icons-cry'}}>
                <TbMoodCry/>
            </IconContext.Provider>
            <GoBack to='list' text="Powrót do strony głównej"/>
        </div>
    );
};
