import React from "react";
import './AddTrainingToCalendar.css';
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store";
import {calendarsActions} from "../../store/features/calendar/calendar-slice";
import UseAddTrainingToCalendar from "../../hooks/calendar/useAddTrainingToCalendar";

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
        <div className={`div_add_training_container ${isAddTrainingToCalendarOpen ? 'open' : 'closed'}`}>
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
            {timeError && <div className="error"><p>{timeError}</p></div>}
            <label
                className="label-date"
                htmlFor="start">
                Godzina ropoczęcia
            </label>
            <input
                id="start"
                className="input-date"
                type="time"
                value={startTime}
                onChange={handleStartTimeChange}
            />
            <label
                className="label-date"
                htmlFor="end">
                Godzina zakończenia
            </label>
            <input
                id="end"
                className="input-date"
                type="time"
                value={endTime}
                onChange={handleEndTimeChange}
            />
            <button
                className="add_training_button"
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
            </button>
            <button
                className="add_training_button"
                onClick={handleAddTrainingToCalendarClose}
            >Zamknij
            </button>
        </div>
    );
};