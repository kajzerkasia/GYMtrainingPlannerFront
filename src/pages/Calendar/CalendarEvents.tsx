import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../store";
import {fetchTrainingsData} from "../../store/actions/calendar/fetching-action";
import {useParams} from "react-router-dom";
import classes from './CalendarEvents.module.css';

const CalendarEvents = () => {
    const params = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchData = async () => {
            try {
                (dispatch as AppDispatch)(fetchTrainingsData(params));
            } catch (error) {
                console.error("Wystąpił błąd podczas pobierania danych o treningach:", error);
            }
        };

        fetchData();
    }, [dispatch]);

    const {
        events,
    } = useSelector((state: RootState) => state.calendar);


    return (
        <div className={classes.events_container}>
        <div className={classes.single_event}>
            {events.map((event) => (
                <div key={event.id}>
                    <p>{event.planName}</p>
                    <p>{event.partName}</p>
                    <p>{event.startTime} - {event.endTime}</p>
                </div>
            ))}
        </div>
        </div>
    );
};

export default CalendarEvents;