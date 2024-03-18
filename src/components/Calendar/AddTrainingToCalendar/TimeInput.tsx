import React from 'react';
import classes from "./AddTrainingToCalendar.module.css";

interface InputProps {
    id: string;
    inputValue: string;
    onChange: () => void;
}

const TimeInput = ({id, inputValue, onChange}: InputProps) => {
    return (
        <input
            id={id}
            className={classes.input_date}
            type="time"
            value={inputValue}
            onChange={onChange}
        />
    );
};

export {TimeInput};