import React from 'react';
import Select from "./Select";
import {useSelector} from "react-redux";
import {RootState} from "../../../../store";
import useAddTrainingToCalendar from "../../../../hooks/calendar/useAddTrainingToCalendar";
import classes from "./Selects.module.css";

const Selects = () => {

    const {
        trainingPlans,
        planParts,
        selectedTrainingPlan,
        selectedPlanPartId,
    } = useSelector((state: RootState) => state.calendar);

    const {
        handleTrainingPlanChange,
        handlePlanPartChange,
    } = useAddTrainingToCalendar();

    return (
        <>
            <Select
                className={classes.select}
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
                className={classes.select}
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
        </>
    );
};

export {Selects};