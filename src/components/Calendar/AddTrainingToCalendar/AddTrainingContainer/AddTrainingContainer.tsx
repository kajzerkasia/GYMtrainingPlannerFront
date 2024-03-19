import React from "react";
import './AddTrainingContainer.module.css';
import {useSelector} from "react-redux";
import {RootState} from "../../../../store";
import classes from './AddTrainingContainer.module.css';
import BackButton from "../../../BackButton/BackButton";
import {useFetchTrainingsData} from "../../../../hooks/calendar/useFetchTrainingsData";
import {useParams} from "react-router-dom";
import {Header} from "../Header";
import {Selects} from "../Selects/Selects";
import {LabelInputContainers} from "../LabelsAndInputs/LabelInputContainers";
import {AddButton} from "../AddButton";

export const AddTrainingContainer = () => {

    const {fetchPlansData, fetchTrainingsData, fetchPlanParts} = useFetchTrainingsData();
    const params = useParams();

    const {
        selectedTrainingPlan,
        timeError,
    } = useSelector((state: RootState) => state.calendar);


    fetchPlansData(params);
    fetchTrainingsData(params);
    if (selectedTrainingPlan !== null) {
        fetchPlanParts(selectedTrainingPlan);
    }

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
                <AddButton/>
            </div>
        </div>
    );
};