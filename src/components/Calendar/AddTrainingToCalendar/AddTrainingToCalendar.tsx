import React from "react";
import './AddTrainingToCalendar.module.css';
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../store";
import {calendarsActions} from "../../../store/features/calendar/calendar-slice";
import useAddTrainingToCalendar from "../../../hooks/calendar/useAddTrainingToCalendar";
import classes from './AddTrainingToCalendar.module.css';
import Button from "../../Button/Button";
import BackButton from "../../BackButton/BackButton";
import {useFetchTrainingsData} from "../../../hooks/calendar/useFetchTrainingsData";
import {useNavigate, useParams} from "react-router-dom";
import {Header} from "./Header";
import {Selects} from "./Selects";
import {LabelInputContainers} from "./LabelInputContainers";

export const AddTrainingToCalendar = () => {

    const {fetchPlansData, fetchTrainingsData, fetchPlanParts} = useFetchTrainingsData();
    const params = useParams();
    const navigate = useNavigate();

    const {
        selectedTrainingPlan,
        startTime,
        endTime,
        isDemoMode,
        timeError,
    } = useSelector((state: RootState) => state.calendar);


    fetchPlansData(params);
    fetchTrainingsData(params);
    if (selectedTrainingPlan !== null) {
        fetchPlanParts(selectedTrainingPlan);
    }

    const dispatch = useDispatch();

    const {
        toggleDemoMode,
    } = calendarsActions;

    const {
        handleAddEvent,
    } = useAddTrainingToCalendar();

    return (
        <div
            className={classes.div_add_training_container}>
            <Header
                headerText="Dodaj trening"
            />
            <Selects/>
            {timeError && <div className={classes.error}><p>{timeError}</p></div>}
            <LabelInputContainers/>
            <div className={classes.actions}>
                <BackButton/>
                <Button
                    className={classes.add_training_button}
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
            </div>
        </div>
    );
};