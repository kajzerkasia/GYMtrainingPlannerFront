import React from 'react';
import {calendarsActions} from "../../store/features/calendar/calendar-slice";
import {useDispatch} from "react-redux";

const UseEditTrainingFromCalendar = () => {

    const dispatch = useDispatch();

    const {
        toggleDemoMode,
        toggleSidebar,
        updateStartTime,
        updateEndTime,
    } = calendarsActions;

    const closeSidebar = () => {
        dispatch(toggleDemoMode(false));
        dispatch(toggleSidebar(false));
    };

    const handleStartTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => dispatch(updateStartTime(e.target.value));

    const handleEndTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => dispatch(updateEndTime(e.target.value));

    return {
        closeSidebar,
        handleStartTimeChange,
        handleEndTimeChange
    }
};

export default UseEditTrainingFromCalendar;