import React from "react";
import classes from './EditTrainingFromCalendar.module.css';
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store";
import {calendarsActions} from "../../store/features/calendar/calendar-slice";
import {UseEditEvent} from "../../hooks/calendar/useEditEvent";
import UseEditTrainingFromCalendar from "../../hooks/calendar/useEditTrainingFromCalendar";

interface EditTrainingFromCalendarProps {
    openModal: () => void;
}

export const EditTrainingFromCalendar = ({openModal}: EditTrainingFromCalendarProps) => {

    const dispatch = useDispatch();
    const {
        startTime,
        endTime,
        selectedEvent,
        isSidebarOpen,
        isDemoMode,
        timeError,
        selectedEventId,
    } = useSelector((state: RootState) => state.calendar);

    const {
        toggleDemoMode,
    } = calendarsActions;

    const {handleEditEvent} = UseEditEvent();

    const {handleStartTimeChange, handleEndTimeChange, closeSidebar} = UseEditTrainingFromCalendar();


    return (
        <div className={`${classes.div_edit_training_container} ${isSidebarOpen ? `${classes.open}` : `${classes.closed}`}`}>
            <h1>{isDemoMode ? "Tryb demo: Edycja wydarzenia wyłączona" : "Edytuj trening"}</h1>
            {timeError && (
                <div className={classes.error}>
                    <p>{timeError}</p>
                </div>
            )}
            <label
                className={classes.label_date}
                htmlFor="startTime"
            >
                Godzina rozpoczęcia
            </label>
            <input
                className={classes.input_date}
                type="time"
                id="startTime"
                value={startTime}
                onChange={handleStartTimeChange}
            />
            <label
                className={classes.label_date}
                htmlFor="endTime"
            >
                Godzina zakończenia
            </label>
            <input
                className={classes.input_date}
                type="time"
                id="endTime"
                value={endTime}
                onChange={handleEndTimeChange}
            />
            <button
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
            </button>
            <button
                className={classes.edit_training_button}
                onClick={async () => {
                    if (!isDemoMode) {
                        openModal();
                    }
                }}
            >
                Usuń trening
            </button>
            <button
                className={classes.edit_training_button}
                onClick={closeSidebar}
            >
                Zamknij
            </button>
        </div>
    );
};




