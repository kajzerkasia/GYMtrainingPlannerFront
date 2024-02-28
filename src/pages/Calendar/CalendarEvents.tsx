import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../store";
import {fetchTrainingsData} from "../../store/actions/calendar/fetching-action";
import {useParams} from "react-router-dom";
import classes from './CalendarEvents.module.css';
import BackButton from "../../components/BackButton/BackButton";
import {AddTrainingToCalendar} from "../../components/Calendar/AddTrainingToCalendar/AddTrainingToCalendar";
import {EditTrainingFromCalendar} from "../../components/Calendar/EditTrainingFromCalendar/EditTrainingFromCalendar";
import {UseDateSelection} from "../../hooks/calendar/useDateSelection";
import moment from "moment";

const CalendarEvents = () => {
    const params = useParams();
    const dispatch = useDispatch();
    const { selectedDate } = UseDateSelection();
    const [formattedDate, setFormattedDate] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                (dispatch as AppDispatch)(fetchTrainingsData(params));
            } catch (error) {
                console.error("Wystąpił błąd podczas pobierania danych o treningach:", error);
            }
        };

        fetchData();

        setFormattedDate(moment(selectedDate).format('D MMMM YYYY'));
    }, [dispatch]);

    const {
        events,
    } = useSelector((state: RootState) => state.calendar);

    return (
        <>
            <AddTrainingToCalendar/>
            <h1 className={classes.h1}>Treningi zaplanowane na {formattedDate}</h1>
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
                <BackButton/>
            </div>
            <EditTrainingFromCalendar
                // openModal={openModal}
            />
        </>
    );
};

export default CalendarEvents;