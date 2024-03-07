import React from 'react';
import classes from "./CalendarSingleEvent.module.css";
import ArrowContainer from "../../../components/ArrowContainer/ArrowContainer";
import moment from "moment/moment";
import {useSelector} from "react-redux";
import {RootState} from "../../../store";
import DeleteButton from "./DeleteButton";
import EditButton from "./EditButton";
import EventOrderMarker from "./EventOrderMarker";

interface CalendarSingleEventProps {
    selectedDate: number | null;
}

const CalendarSingleEvent = ({selectedDate}: CalendarSingleEventProps) => {

    const {
        events,
    } = useSelector((state: RootState) => state.calendar);

    const selectedDateEvents = events.filter(event => moment(event.start).isSame(moment(selectedDate), 'day'));

    return (
        <div className={classes.events}>
            {selectedDateEvents.length > 0 ? selectedDateEvents.map((event, index) => (
                <div
                    key={event.id}
                    className={classes.container}
                >
                    <EventOrderMarker>
                        {index + 1}
                    </EventOrderMarker>
                    <div
                        className={classes.events_container}
                    >
                        <DeleteButton/>
                        <div className={classes.single_event} key={event.id}>
                            <p>{event.planName}</p>
                            <p>{event.partName}</p>
                            <p>{event.startTime} - {event.endTime}</p>
                        </div>
                        <EditButton/>
                    </div>
                </div>
            )) : (
                <ArrowContainer
                    text="Brak zaplanowanych treningów"
                />
            )}
        </div>
    );
};

export default CalendarSingleEvent;