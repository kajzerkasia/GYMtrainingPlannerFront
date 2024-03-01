import React from 'react';
import {calendarsActions} from "../../store/features/calendar/calendar-slice";
import {useDispatch} from "react-redux";

const UseEditTrainingFromCalendar = () => {

    const dispatch = useDispatch();

    const {
        updateStartTime,
        updateEndTime,
    } = calendarsActions;

    const handleStartTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => dispatch(updateStartTime(e.target.value));

    const handleEndTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => dispatch(updateEndTime(e.target.value));

    return {
        handleStartTimeChange,
        handleEndTimeChange
    }
};

export default UseEditTrainingFromCalendar;