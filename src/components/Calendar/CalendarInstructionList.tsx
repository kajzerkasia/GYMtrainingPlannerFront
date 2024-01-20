import React from 'react';
import {IconContext} from "react-icons";
import './CalendarInstructionList.css';

interface CalendarInstructionListProps {
    title: string;
    children: React.ReactNode;
    array: string[],
}

const CalendarInstructionList = ({title, children, array}: CalendarInstructionListProps) => {
    return (
        <ul className="calendar-list">
            <div className="list-container">
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