import React from 'react';
import classes from "./CalendarSingleEvent.module.css";
import Button from "../../components/Button/Button";
import IconProvider from "../../components/IconProvider/IconProvider";
import {TbEdit, TbX} from "react-icons/tb";
import ArrowContainer from "../../components/ArrowContainer/ArrowContainer";
import moment from "moment/moment";
import {useSelector} from "react-redux";
import {RootState} from "../../store";

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
                        <Button className={classes.icon_button}>
                            <IconProvider>
                                <TbX/>
                            </IconProvider>
                        </Button>
                        <div className={classes.single_event} key={event.id}>
                            <p>{event.planName}</p>
                            <p>{event.partName}</p>
                            <p>{event.startTime} - {event.endTime}</p>
                        </div>
                        <Button className={classes.icon_button}>
                            <IconProvider>
                                <TbEdit/>
                            </IconProvider>
                        </Button>
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