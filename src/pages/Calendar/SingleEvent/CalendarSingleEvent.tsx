import React from 'react';
import classes from "./CalendarSingleEvent.module.css";
import ArrowContainer from "../../../components/ArrowContainer/ArrowContainer";
import moment from "moment/moment";
import {useSelector} from "react-redux";
import {RootState} from "../../../store";
import DeleteButton from "./DeleteButton";
import EditButton from "./EditButton";

interface CalendarSingleEventProps {
    selectedDate: number | null;
}

const CalendarSingleEvent = ({selectedDate}: CalendarSingleEventProps) => {

    const {
        events,
    } = useSelector((state: RootState) => state.calendar);

    const selectedDateEvents = events.filter(event => moment(event.start).isSame(moment(selectedDate), 'day'));

    return (
        <>
            {selectedDateEvents.length > 0 ? selectedDateEvents.map((event, index) => (
                <div
                    key={event.id}
                    className={classes.container}
                >
                    <div className={classes.round}>
                        <p>
                            {index + 1}
                        </p>
                    </div>
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
        </>
    );
};

export default CalendarSingleEvent;