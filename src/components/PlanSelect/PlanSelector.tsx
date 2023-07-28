import React from "react";
import {PlanEntity, PartOfPlanEntity} from 'types';

interface PlanSelectorProps {
    trainingPlans: PlanEntity[];
    planParts: PartOfPlanEntity[];
    selectedTrainingPlan: string | null;
    selectedPlanPart: string | null;
    onTrainingPlanChange: (planId: string) => void;
    onPlanPartChange: (partId: string) => void;
}

export const PlanSelector = ({
                                 trainingPlans,
                                 planParts,
                                 selectedTrainingPlan,
                                 selectedPlanPart,
                                 onTrainingPlanChange,
                                 onPlanPartChange,
                             }: PlanSelectorProps) => {

    const handleTrainingPlanChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const planId = e.target.value; // Pobierz id jako string
        console.log('Selected training plan:', planId);
        onTrainingPlanChange(planId); // Przekazanie stringa jako id
    };

    const handlePlanPartChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const planPartId = e.target.value; // Pobierz id jako string
        console.log('Selected plan part:', planPartId);
        onPlanPartChange(planPartId); // Przekazanie stringa jako id
    };

    return (
        <div>
            <select
                value={selectedTrainingPlan !== null ? selectedTrainingPlan : ''}
                onChange={handleTrainingPlanChange}
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
                onChange={handlePlanPartChange}
            >
                <option value="">Wybierz część planu</option>
                {planParts.map((part) => (
                    <option key={part.id} value={part.id}>
                        {part.name}
                    </option>
                ))}
            </select>
        </div>
    );
};
