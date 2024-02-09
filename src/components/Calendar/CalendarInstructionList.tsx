import React from 'react';
import {IconContext} from "react-icons";
import classes from './CalendarInstructionList.module.css';

interface CalendarInstructionListProps {
    title: string;
    children: React.ReactNode;
    array: string[],
}

const CalendarInstructionList = ({title, children, array}: CalendarInstructionListProps) => {
    return (
        <ul className={classes.list}>
            <div className={classes.div_container}>
                <IconContext.Provider value={{className: 'react-icons'}}>
                    {children}
                </IconContext.Provider>
                <h3>{title}</h3>
            </div>
            {array.map((text: string, index: number) => (
                <li key={index}>{`${index + 1}. ${text}`}</li>
            ))}
        </ul>
    );
};

export default CalendarInstructionList;