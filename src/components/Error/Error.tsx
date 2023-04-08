import React from 'react';
import {Logo} from "../Logo/Logo";
import './Error.css';

import {TbMoodCry} from "react-icons/tb";
import {IconContext} from "react-icons";


export const Error = () => {
    return (
        <div className="error-container">
            <h1>Ups... Nic tutaj nie ma.</h1>
            <IconContext.Provider value={{className: 'react-icons-cry'}}>
                <TbMoodCry/>
            </IconContext.Provider>
            <Logo to='plans' text="Powrót do strony głównej"/>
        </div>
    );
};
