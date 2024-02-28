import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../store";
import {fetchTrainingsData} from "../../store/actions/calendar/fetching-action";
import {Link, useParams} from "react-router-dom";
import classes from './CalendarEvents.module.css';
import BackButton from "../../components/BackButton/BackButton";
import {EditTrainingFromCalendar} from "../../components/Calendar/EditTrainingFromCalendar/EditTrainingFromCalendar";
import {UseDateSelection} from "../../hooks/calendar/useDateSelection";
import moment from "moment";
import IconProvider from "../../components/IconProvider/IconProvider";
import {TbX, TbEdit} from "react-icons/tb";
import Button from "../../components/Button/Button";
import FlexContainer from "../../components/FlexContainer/FlexContainer";

const CalendarEvents = () => {
    const params = useParams();
    const dispatch = useDispatch();
    const {selectedDate} = UseDateSelection();
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
        <FlexContainer>
            <div className={classes.calendar_events_container}>
                <h1 className={classes.h1}>Treningi zaplanowane na {formattedDate}</h1>
                <Button className={classes.btn_add}>
                    <Link to={`/calendar/${params.userId}/trainings/add-training`}>
                        Dodaj nowy trening
                    </Link>
                </Button>

                {events.map((event) => (
                    <div className={classes.events_container}>
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
                ))}
                <EditTrainingFromCalendar/>
            </div>
            <BackButton/>
        </FlexContainer>
    );
};

export default CalendarEvents;