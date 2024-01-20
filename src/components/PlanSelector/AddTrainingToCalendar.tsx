import React, {useState} from "react";
import {PlanEntity, PartOfPlanEntity} from 'types';
import './AddTrainingToCalendar.css';

interface PlanSelectorProps {
    trainingPlans: PlanEntity[];
    planParts: PartOfPlanEntity[];
    selectedTrainingPlan: string | null;
    selectedPlanPart: string | null;
    onTrainingPlanChange: (planId: string) => void;
    onPlanPartChange: (partId: string) => void;
    onAddEvent: (startTime: string, endTime: string) => void;
    isDemoMode: boolean;
    setIsDemoMode: (value: boolean) => void;
    timeError: any;
    selectedDate?: any;
    unselectDate: () => void;
}

export const AddTrainingToCalendar = ({
                                 trainingPlans,
                                 planParts,
                                 selectedTrainingPlan,
                                 selectedPlanPart,
                                 onTrainingPlanChange,
                                 onPlanPartChange,
                                 onAddEvent,
                                 isDemoMode,
                                 setIsDemoMode,
                                 timeError,
                                 unselectDate,
                             }: PlanSelectorProps) => {
    const [startTime, setStartTime] = useState<string>("");
    const [endTime, setEndTime] = useState<string>("");
    const [isOpen, setIsOpen] = useState(true);

    const handleClose = () => {
        setIsOpen(false);
        unselectDate();
    }

    return (
        <div className={`plan-selector-container ${isOpen ? 'open' : 'closed'}`}>
            <h1>{isDemoMode ? "Tryb demo: Dodawanie wydarzenia wyłączone" : "Dodaj trening"}</h1>
            <select
                value={selectedTrainingPlan !== null ? selectedTrainingPlan : ''}
                onChange={(e) => onTrainingPlanChange(e.target.value)}
            >
                <option value="">Wybierz plan treningowy</option>
                {trainingPlans.map((plan) => (
                    <option key={plan.id} value={plan.id}>
                        {plan.name}
                    </option>
                ))}
            </select>
            <select
                value={selectedPlanPart !== null ? selectedPlanPart : ''}
                onChange={(e) => onPlanPartChange(e.target.value)}
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
                onChange={(e) => setStartTime(e.target.value)}
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
                onChange={(e) => setEndTime(e.target.value)}
            />
            <button
                className="plan-selector-button"
                onClick={() => {
                    if (isDemoMode) {
                        setIsDemoMode(true);
                    } else {
                        onAddEvent(startTime, endTime);
                    }
                }}
            >
                Dodaj
            </button>
            <button
                className="plan-selector-button"
                onClick={handleClose}
            >Zamknij
            </button>
        </div>
    );
};