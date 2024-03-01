import React from "react";
import {useAddNewEvent} from "./useAddNewEvent";
import {calendarsActions} from "../../store/features/calendar/calendar-slice";
import {useDispatch} from "react-redux";

const useAddTrainingToCalendar = () => {

    const {
        selectPlanPart,
        updateStartTime,
        updateEndTime,
    } = calendarsActions;

    const {
        selectTrainingPlan,
    } = calendarsActions;

    const dispatch = useDispatch();
    const handlePlanPartChange = (partId: string) => {
        dispatch(selectPlanPart(partId));
    };

    const handleStartTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => dispatch(updateStartTime(e.target.value));

    const handleEndTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => dispatch(updateEndTime(e.target.value));

    const {handleAddEvent} = useAddNewEvent();

    const handleTrainingPlanChange = (planId: string) => {
        dispatch(selectTrainingPlan(planId));
        dispatch(selectPlanPart(null));
    };

    return {
        handlePlanPartChange,
        handleStartTimeChange,
        handleEndTimeChange,
        handleAddEvent,
        handleTrainingPlanChange,
    }
};

export default useAddTrainingToCalendar;