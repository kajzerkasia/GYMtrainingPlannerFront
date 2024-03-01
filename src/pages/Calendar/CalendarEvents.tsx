import React, {useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import {RootState} from "../../store";
import {Link, useParams} from "react-router-dom";
import classes from './CalendarEvents.module.css';
import moment from "moment";
import IconProvider from "../../components/IconProvider/IconProvider";
import {TbX, TbEdit} from "react-icons/tb";
import Button from "../../components/Button/Button";
import FlexContainer from "../../components/FlexContainer/FlexContainer";
import {useFetchTrainingsData} from "../../hooks/calendar/useFetchTrainingsData";
import {POLISH_MONTH_NAMES} from "../../constants/polishMonthNames";

const CalendarEvents = () => {
    const params = useParams();

    const {
        events,
    } = useSelector((state: RootState) => state.calendar);

    const [formattedDate, setFormattedDate] = useState('');

    const storedSelectedDate = localStorage.getItem('selectedDate');
    const selectedDate = storedSelectedDate ? parseInt(storedSelectedDate, 10) : null;

    useEffect(() => {
        const selectedMonth = moment(selectedDate).month();
        const selectedYear = moment(selectedDate).year();

        const formattedDate = `${moment(selectedDate).format('D')} ${POLISH_MONTH_NAMES[selectedMonth]} ${selectedYear}`;

        setFormattedDate(formattedDate);
    }, [selectedDate]);


    const {fetchTrainingsData} = useFetchTrainingsData();

    fetchTrainingsData(params);

    const selectedDateEvents = events.filter(event => moment(event.start).isSame(moment(selectedDate), 'day'));

    return (
        <FlexContainer>
            <div className={classes.calendar_events_container}>
                <h1 className={classes.h1}>Treningi zaplanowane na {formattedDate}</h1>
                <Button className={classes.btn_add}>
                    <Link to={`/calendar/${params.userId}/trainings/add-training`}>
                        Dodaj nowy trening
                    </Link>
                </Button>
                {selectedDateEvents.length > 0 ? selectedDateEvents.map((event, index) => (
                    <div
                        className={classes.container}
                        key={event.id}
                    >
                        <div className={classes.round}>
                            <p>
                                {index + 1}
                            </p>
                        </div>
                        <div
                            className={classes.events_container}>
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
                    <p>Brak zaplanowanych treningów</p>
                )}
                {/*<EditTrainingFromCalendar/>*/}
            </div>
            <Button>
                <Link to={`/calendar/${params.userId}`}>
                    Powrót
                </Link>
            </Button>
        </FlexContainer>
    );
};

export default CalendarEvents;