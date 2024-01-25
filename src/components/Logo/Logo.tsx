import React from 'react';
import {IconContext} from "react-icons";
import {TbHeartbeat} from "react-icons/tb";
import './Logo.css';

const Logo = () => {
    return (
            <IconContext.Provider value={{className: 'react-main-icon'}}>
                <h1 className="main-h1"><TbHeartbeat/> Gym Training Planner</h1>
            </IconContext.Provider>
    );
};

export default Logo;