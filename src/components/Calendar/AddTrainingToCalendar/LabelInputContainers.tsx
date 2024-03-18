import React from 'react';
import {LabelInputContainer} from "./LabelInputContainer";
import useAddTrainingToCalendar from "../../../hooks/calendar/useAddTrainingToCalendar";
import {useSelector} from "react-redux";
import {RootState} from "../../../store";

const LabelInputContainers = () => {

    const {
        startTime,
        endTime
    } = useSelector((state: RootState) => state.calendar);

    const {
        handleStartTimeChange,
        handleEndTimeChange,
    } = useAddTrainingToCalendar();

    return (
        <>
            <LabelInputContainer
                labelHtmlFor="start"
                inputId="start"
                inputValue={startTime}
                labelText="Godzina rozpoczęcia treningu"
                onChange={handleStartTimeChange}
            />
            <LabelInputContainer
                labelHtmlFor="end"
                inputId="end"
                inputValue={endTime}
                labelText="Godzina zakończenia treningu"
                onChange={handleEndTimeChange}
            />
        </>
    );
};

export {LabelInputContainers};