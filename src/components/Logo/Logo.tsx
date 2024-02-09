import React from 'react';
import {IconContext} from "react-icons";
import {TbHeartbeat} from "react-icons/tb";
import classes from './Logo.module.css';

const Logo = () => {
    return (
            <IconContext.Provider value={{className: `${classes.react_logo_icon}`}}>
                <h1 className={classes.h1}><TbHeartbeat/> Gym Training Planner</h1>
            </IconContext.Provider>
    );
};

export default Logo;