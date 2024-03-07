import React from 'react';
import classes from "./CalendarEventsButtons.module.css";
import Button from "../../components/Button/Button";
import {Link, useParams} from "react-router-dom";

const CalendarEventsButtons = () => {

    const params = useParams();

    return (
        <div className={classes.actions}>
            <Button>
                <Link to={`/calendar/${params.userId}/trainings/add-training`}>
                    Dodaj nowy trening
                </Link>
            </Button>
            <Button>
                <Link to={`/calendar/${params.userId}`}>
                    Powrót do kalendarza
                </Link>
            </Button>
        </div>
    );
};

export default CalendarEventsButtons;