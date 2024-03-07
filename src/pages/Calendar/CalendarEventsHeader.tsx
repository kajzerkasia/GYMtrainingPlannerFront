import React from 'react';
import classes from "./CalendarEventsHeader.module.css";
import img from "../../images/KB-violet.png";
import CalendarEventsButtons from "./CalendarEventsButtons";

interface CalendarEventsHeaderProps {
    chosenDate: string;
}

const CalendarEventsHeader = ({chosenDate}: CalendarEventsHeaderProps) => {
    return (
        <div className={classes.main_container}>
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
            <div className={classes.underline_conatiner}>
                <div className={classes.wave}></div>
            </div>
        </div>
    );
};

export default CalendarEventsHeader;