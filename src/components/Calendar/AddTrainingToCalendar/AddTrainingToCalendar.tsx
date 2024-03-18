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
import Select from "./Select";
import {Header} from "./Header";

export const AddTrainingToCalendar = () => {

    const {fetchPlansData, fetchTrainingsData, fetchPlanParts} = useFetchTrainingsData();
    const params = useParams();
    const navigate = useNavigate();

    const {
        trainingPlans,
        planParts,
        selectedTrainingPlan,
        selectedPlanPartId,
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
        handleTrainingPlanChange,
        handlePlanPartChange,
        handleStartTimeChange,
        handleEndTimeChange,
        handleAddEvent,
    } = useAddTrainingToCalendar();

    return (
        <div
            className={classes.div_add_training_container}>
            <Header
                headerText="Dodaj trening"
            />
            <Select
                optionText="Wybierz plan treningowy"
                selectValue={selectedTrainingPlan !== null ? selectedTrainingPlan : ''}
                onChange={(e) => handleTrainingPlanChange(e.target.value)}
            >
                {trainingPlans.map((plan) => (
                    <option key={plan.id} value={plan.id}>
                        {plan.name}
                    </option>
                ))}
            </Select>
            <Select
                optionText="Wybierz część planu"
                selectValue={selectedPlanPartId !== null ? selectedPlanPartId : ''}
                onChange={(e) => handlePlanPartChange(e.target.value)}
            >
                {planParts.map((part) => (
                    <option key={part.id} value={part.id}>
                        {part.name}
                    </option>
                ))}
            </Select>
            {timeError && <div className={classes.error}><p>{timeError}</p></div>}
            <div className={classes.label_and_input_container}>
                <label
                    className={classes.label_date}
                    htmlFor="start">
                    Godzina ropoczęcia treningu
                </label>
                <input
                    id="start"
                    className={classes.input_date}
                    type="time"
                    value={startTime}
                    onChange={handleStartTimeChange}
                />
            </div>
            <div className={classes.label_and_input_container}>
                <label
                    className={classes.label_date}
                    htmlFor="end">
                    Godzina zakończenia treningu
                </label>
                <input
                    id="end"
                    className={classes.input_date}
                    type="time"
                    value={endTime}
                    onChange={handleEndTimeChange}
                />
            </div>
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