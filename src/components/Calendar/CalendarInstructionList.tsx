import React from 'react';
import {IconContext} from "react-icons";

interface CalendarInstructionListProps {
    title: string;
    children: any;
    array: string[],
}

const CalendarInstructionList = ({title, children, array}: CalendarInstructionListProps) => {
    return (
        <ul className="calendar-list">
            <div className="x-container">
                <IconContext.Provider value={{className: 'react-icons'}}>
                    {children}
                </IconContext.Provider>
                <h3 className="calendar-h3">{title}</h3>
            </div>
            {array.map((text: string, index: number) => (
                <li key={index}>{`${index + 1}. ${text}`}</li>
            ))}
        </ul>
    );
};

export default CalendarInstructionList;