import React from "react";
import { PlanEntity, PartOfPlanEntity } from 'types';
import './PlanSelector.css';

interface PlanSelectorProps {
    trainingPlans: PlanEntity[];
    planParts: PartOfPlanEntity[];
    selectedTrainingPlan: string | null;
    selectedPlanPart: string | null;
    onTrainingPlanChange: (planId: string) => void;
    onPlanPartChange: (partId: string) => void;
    isOpen: boolean;
    onAddEvent: () => void;
}

export const PlanSelector: React.FC<PlanSelectorProps> = ({
                                                              trainingPlans,
                                                              planParts,
                                                              selectedTrainingPlan,
                                                              selectedPlanPart,
                                                              onTrainingPlanChange,
                                                              onPlanPartChange,
                                                              isOpen,
                                                              onAddEvent // Dodanie propa isOpen
                                                          }) => {
    return (
        <div className={`plan-selector-container ${isOpen ? "open" : ""}`}>
            {/* Wyświetl rozwijalny select dla planów treningowych */}
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
            {/* Wyświetl rozwijalny select dla części planów */}
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
            <button className="add-event-button" onClick={onAddEvent}>Dodaj</button>
        </div>
    );
};