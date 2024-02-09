import React from 'react';
import {IconContext} from "react-icons";
import classes from './IconProvider.module.css';

interface IconProviderProps {
    children: React.ReactNode;
}

const IconProvider = ({children}: IconProviderProps) => {
    return (
        <IconContext.Provider value={{className: `${classes.icon}`}}>
            {children}
        </IconContext.Provider>
    );
};

export default IconProvider;