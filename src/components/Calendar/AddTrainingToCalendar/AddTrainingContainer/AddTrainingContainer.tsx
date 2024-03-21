import React from "react";
import {Header} from "../Header";
import {Selects} from "../Selects/Selects";
import {LabelInputContainers} from "../LabelsAndInputs/LabelInputContainers";
import {ActionButtons} from "../ActionButtons/ActionButtons";
import {TimeError} from "../TimeError/TimeError";
import {Container} from "../Container/Container";

export const AddTrainingContainer = () => {

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