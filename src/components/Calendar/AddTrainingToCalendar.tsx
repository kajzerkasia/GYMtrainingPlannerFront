import React from "react";
import './AddTrainingToCalendar.css';
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store";
import {calendarsActions} from "../../store/features/calendar/calendar-slice";
import {UseAddNewEvent} from "../../hooks/calendar/useAddNewEvent";

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
        selectDate,
        selectTrainingPlan,
        selectPlanPart,
        updateStartTime,
        updateEndTime,
        toggleDemoMode,
        toggleAddTrainingToCalendar,
    } = calendarsActions;

    const handleTrainingPlanChange = (planId: string) => {
        dispatch(selectTrainingPlan(planId));
        dispatch(selectPlanPart(null));
    };

    const handlePlanPartChange = (partId: string) => {
        dispatch(selectPlanPart(partId));
    };

    const handleStartTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => dispatch(updateStartTime(e.target.value));

    const handleEndTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => dispatch(updateEndTime(e.target.value));

    const {handleAddEvent} = UseAddNewEvent();

    const unselectDate = () => {
        dispatch(selectDate(null));
    };

    const handleAddTrainingToCalendarClose = () => {
        unselectDate();
        dispatch(toggleAddTrainingToCalendar(false));
    };

    return (
        <div className={`plan-selector-container ${isAddTrainingToCalendarOpen ? 'open' : 'closed'}`}>
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
                className="plan-selector-button"
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
                className="plan-selector-button"
                onClick={handleAddTrainingToCalendarClose}
            >Zamknij
            </button>
        </div>
    );
};