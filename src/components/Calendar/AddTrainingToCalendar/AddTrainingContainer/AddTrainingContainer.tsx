import React from "react";
import {useSelector} from "react-redux";
import {RootState} from "../../../../store";
import {useFetchTrainingsData} from "../../../../hooks/calendar/useFetchTrainingsData";
import {useParams} from "react-router-dom";
import {Header} from "../Header";
import {Selects} from "../Selects/Selects";
import {LabelInputContainers} from "../LabelsAndInputs/LabelInputContainers";
import {ActionButtons} from "../ActionButtons/ActionButtons";
import {TimeError} from "../TimeError/TimeError";
import {Container} from "../Container/Container";

export const AddTrainingContainer = () => {

    const {fetchPlansData, fetchTrainingsData, fetchPlanParts} = useFetchTrainingsData();
    const params = useParams();

    const {
        selectedTrainingPlan,
    } = useSelector((state: RootState) => state.calendar);

    fetchPlansData(params);
    fetchTrainingsData(params);
    if (selectedTrainingPlan !== null) {
        fetchPlanParts(selectedTrainingPlan);
    }

    return (
        <Container>
            <Header headerText="Dodaj trening"/>
            <Selects/>
            <TimeError/>
            <LabelInputContainers/>
            <ActionButtons/>
        </Container>
    );
};