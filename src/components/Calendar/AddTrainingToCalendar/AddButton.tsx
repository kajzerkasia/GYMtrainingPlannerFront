import React from 'react';
import Button from "../../Button/Button";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../store";
import {useNavigate, useParams} from "react-router-dom";
import {calendarsActions} from "../../../store/features/calendar/calendar-slice";
import useAddTrainingToCalendar from "../../../hooks/calendar/useAddTrainingToCalendar";

const AddButton = () => {
    const dispatch = useDispatch();
    const params = useParams();
    const navigate = useNavigate();

    const {
        startTime,
        endTime,
        isDemoMode,
    } = useSelector((state: RootState) => state.calendar);

    const {
        toggleDemoMode,
    } = calendarsActions;

    const {
        handleAddEvent,
    } = useAddTrainingToCalendar();

    return (
        <Button
            onClick={async () => {
                if (isDemoMode) {
                    dispatch(toggleDemoMode(true));
                } else {
                    try {
                        await handleAddEvent(startTime, endTime);
                        navigate(`/calendar/${params.userId}/trainings`);
                    } catch (error) {
                        console.error("Wystąpił błąd podczas dodawania wydarzenia:", error);
                    }
                }
            }}
        >
            Dodaj
        </Button>
    );
};

export {AddButton};