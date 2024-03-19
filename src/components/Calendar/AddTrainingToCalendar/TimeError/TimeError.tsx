import React from 'react';
import classes from "./TimeError.module.css";
import {useSelector} from "react-redux";
import {RootState} from "../../../../store";

const TimeError = () => {
    const {
        timeError,
    } = useSelector((state: RootState) => state.calendar);

    return (
        <>
            {timeError && <div className={classes.error}><p>{timeError}</p></div>}
        </>
    );
};

export {TimeError};