import React from 'react';
import classes from './CalendarEvents.module.css';
import FlexContainer from "../../components/FlexContainer/FlexContainer";
import CalendarEventsHeader from "./CalendarEventsHeader";
import CalendarSingleEvent from "./CalendarSingleEvent";
import {useCalendarEvents} from "../../hooks/calendar/useCalendarEvents";

const CalendarEvents = () => {

    const {formattedDate, selectedDate} = useCalendarEvents();

    return (
        <FlexContainer>
            <div
                className={classes.calendar_events_container}
            >
                <CalendarEventsHeader
                    chosenDate={formattedDate}
                />
                <CalendarSingleEvent
                    selectedDate={selectedDate}
                />
            </div>
        </FlexContainer>
    );
};

export default CalendarEvents;