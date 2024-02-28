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
import {UseFetchTrainingsData} from "../../hooks/calendar/useFetchTrainingsData";

const CalendarEvents = () => {
    const params = useParams();
    const {selectedDate} = UseDateSelection();
    const [formattedDate, setFormattedDate] = useState('');

    useEffect(() => {
        setFormattedDate(moment(selectedDate).format('D MMMM YYYY'));
    }, []);

    const { fetchPlansData, fetchTrainingsData, fetchPlanParts } = UseFetchTrainingsData();

    const {
        events,
        selectedTrainingPlan
    } = useSelector((state: RootState) => state.calendar);


    fetchPlansData(params);
    fetchTrainingsData(params);
    if (selectedTrainingPlan !== null) {
        fetchPlanParts(selectedTrainingPlan);
    }


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

                {selectedDateEvents.length > 0 ? selectedDateEvents.map((event) => (
                    <div key={event.id}
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
                )) : (
                    <p>Brak zaplanowanych treningów</p>
                )}
                <EditTrainingFromCalendar/>
            </div>
            <BackButton/>
        </FlexContainer>
    );
};

export default CalendarEvents;