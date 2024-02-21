import React from "react";
import './AddTrainingToCalendar.module.css';
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../store";
import {calendarsActions} from "../../../store/features/calendar/calendar-slice";
import UseAddTrainingToCalendar from "../../../hooks/calendar/useAddTrainingToCalendar";
import classes from './AddTrainingToCalendar.module.css';
import Button from "../../Button/Button";

export const AddTrainingToCalendar = () => {

    const dispatch = useDispatch();
    const {
        trainingPlans,
        planParts,
        selectedTrainingPlan,
        selectedPlanPartId,
        startTime,
        endTime,
        isAddTrainingToCalendarOpen,
        isDemoMode,
        timeError,
    } = useSelector((state: RootState) => state.calendar);

    const {
        toggleDemoMode,
    } = calendarsActions;

    const {
        handleTrainingPlanChange,
        handlePlanPartChange,
        handleStartTimeChange,
        handleEndTimeChange,
        handleAddEvent,
        handleAddTrainingToCalendarClose
    } = UseAddTrainingToCalendar();


    return (
        <div
            className={`${classes.div_add_training_container} 
            ${isAddTrainingToCalendarOpen ?
                `${classes.open}` : `${classes.closed}`}`
            }>
            <h1>{isDemoMode ? "Tryb demo: Dodawanie wydarzenia wyłączone" : "Dodaj trening"}</h1>
            <select
                value={selectedTrainingPlan !== null ? selectedTrainingPlan : ''}
                onChange={(e) => handleTrainingPlanChange(e.target.value)}
            >
                <option value="">Wybierz plan treningowy</option>
                {trainingPlans.map((plan) => (
                    <option key={plan.id} value={plan.id}>
                        {plan.name}
                    </option>
                ))}
            </select>
            <select
                value={selectedPlanPartId !== null ? selectedPlanPartId : ''}
                onChange={(e) => handlePlanPartChange(e.target.value)}
            >
                <option value="">Wybierz część planu</option>
                {planParts.map((part) => (
                    <option key={part.id} value={part.id}>
                        {part.name}
                    </option>
                ))}
            </select>
            {timeError && <div className={classes.error}><p>{timeError}</p></div>}
            <label
                className={classes.label_date}
                htmlFor="start">
                Godzina ropoczęcia
            </label>
            <input
                id="start"
                className={classes.input_date}
                type="time"
                value={startTime}
                onChange={handleStartTimeChange}
            />
            <label
                className={classes.label_date}
                htmlFor="end">
                Godzina zakończenia
            </label>
            <input
                id="end"
                className={classes.input_date}
                type="time"
                value={endTime}
                onChange={handleEndTimeChange}
            />
            <div className={classes.actions}>
            <Button
                className={classes.add_training_button}
                onClick={async () => {
                    if (isDemoMode) {
                        dispatch(toggleDemoMode(true));
                    } else {
                        try {
                            await handleAddEvent(startTime, endTime);
                        } catch (error) {
                            console.error("Wystąpił błąd podczas dodawania wydarzenia:", error);
                        }
                    }
                }}
            >
                Dodaj
            </Button>
            <Button
                className={classes.add_training_button}
                onClick={handleAddTrainingToCalendarClose}
            >
                Zamknij
            </Button>
            </div>
        </div>
    );
};