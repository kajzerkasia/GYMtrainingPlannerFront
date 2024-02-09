import React from 'react';
import {MoonLoader} from "react-spinners";
import classes from './SuspenseFallback.module.css';

const SuspenseFallback = () => {
    return (
        <div className={classes.suspense_div_container}>
                <p className={classes.p}>Ładowanie...</p>
                <MoonLoader speedMultiplier={0.5} color="#9fc3f870"/>
        </div>
    );
};

export default SuspenseFallback;