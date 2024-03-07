import React from 'react';
import classes from "./CalendarEventsHeader.module.css";
import img from "../../images/resized-hantel.png";
import CalendarEventsButtons from "./CalendarEventsButtons";

interface CalendarEventsHeaderProps {
    chosenDate: string;
}

const CalendarEventsHeader = ({chosenDate}: CalendarEventsHeaderProps) => {
    return (
        <div
            className={classes.header_container}
        >
            <img
                src={img}
                alt=""
            />
            <header>
                <h1
                    className={classes.h1}
                >
                    Treningi zaplanowane na {chosenDate}
                </h1>
                <CalendarEventsButtons/>
            </header>
        </div>
    );
};

export default CalendarEventsHeader;