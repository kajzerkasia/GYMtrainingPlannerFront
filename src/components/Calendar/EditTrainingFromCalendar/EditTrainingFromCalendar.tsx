import React from "react";
import {Header} from "../AddTrainingToCalendar/Header";
import {TimeError} from "../AddTrainingToCalendar/TimeError/TimeError";
import {LabelInputContainers} from "../AddTrainingToCalendar/LabelsAndInputs/LabelInputContainers";
import {Container} from "../AddTrainingToCalendar/Container/Container";
import EditTrainingActionButtons from "./EditTrainingActionButtons/EditTrainingActionButtons";

export const EditTrainingFromCalendar = () => {

    return (
            <Container>
                <Header headerText="Edytuj trening"/>
                <TimeError/>
                <LabelInputContainers/>
                <EditTrainingActionButtons/>
            </Container>
    );
};




