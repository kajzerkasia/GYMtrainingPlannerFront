import React from 'react';
import classes from "./EditTrainingActionButtons.module.css";
import BackButton from "../../../BackButton/BackButton";
import Button from "../../../Button/Button";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../../store";
import {calendarsActions} from "../../../../store/features/calendar/calendar-slice";
import {useEditEvent} from "../../../../hooks/calendar/useEditEvent";

const EditTrainingActionButtons = () => {

    const dispatch = useDispatch();
    const {
        startTime,
        endTime,
        selectedEvent,
        isDemoMode,
        selectedEventId,
    } = useSelector((state: RootState) => state.calendar);

    const {
        toggleDemoMode,
    } = calendarsActions;

    const {handleEditEvent} = useEditEvent();

    return (
        <div className={classes.actions}>
            <Button
                className={classes.edit_training_button}
                onClick={async () => {
                    if (isDemoMode) {
                        dispatch(toggleDemoMode(true));
                    } else {
                        if (selectedEvent) {
                            try {
                                if (selectedEventId)
                                    await handleEditEvent(selectedEventId, {
                                        ...selectedEvent,
                                        start: new Date(selectedEvent.start),
                                        end: new Date(selectedEvent.end),
                                        planName: selectedEvent.planName || "",
                                        partName: selectedEvent.partName || "",
                                    }, startTime, endTime);
                            } catch (error) {
                                console.error("Wystąpił błąd podczas edytowania wydarzenia:", error);
                            }
                        }
                    }
                }}
            >
                Zapisz zmiany
            </Button>
            <Button
                className={classes.edit_training_button}
            >
                Usuń trening
            </Button>
            <BackButton/>
        </div>
    );
};

export default EditTrainingActionButtons;