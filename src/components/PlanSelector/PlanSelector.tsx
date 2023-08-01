import React, {useState} from "react";
import {PlanEntity, PartOfPlanEntity} from 'types';
import './PlanSelector.css';

interface PlanSelectorProps {
    trainingPlans: PlanEntity[];
    planParts: PartOfPlanEntity[];
    selectedTrainingPlan: string | null;
    selectedPlanPart: string | null;
    onTrainingPlanChange: (planId: string) => void;
    onPlanPartChange: (partId: string) => void;
    isOpen: boolean;
    onAddEvent: (startTime: string, endTime: string) => void;
}

export const PlanSelector = ({
                                 trainingPlans,
                                 planParts,
                                 selectedTrainingPlan,
                                 selectedPlanPart,
                                 onTrainingPlanChange,
                                 onPlanPartChange,
                                 isOpen,
                                 onAddEvent
                             }: PlanSelectorProps) => {
    const [startTime, setStartTime] = useState<string>("");
    const [endTime, setEndTime] = useState<string>("");

    return (
        <div className={`plan-selector-container ${isOpen ? "open" : ""}`}>
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
                className="add-event-button"
                onClick={() => onAddEvent(startTime, endTime)}
            >Dodaj</button>
        </div>
    );
};