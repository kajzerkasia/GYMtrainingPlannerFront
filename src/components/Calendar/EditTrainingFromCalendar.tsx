import React from "react";
import './EditTrainingFromCalendar.css';
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store";
import {calendarsActions} from "../../store/features/calendar/calendar-slice";
import {UseEditEvent} from "../../hooks/calendar/useEditEvent";
import {UseDeleteEvent} from "../../hooks/calendar/useDeleteEvent";

export const EditTrainingFromCalendar = () => {

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
        toggleSidebar,
        updateStartTime,
        updateEndTime,
    } = calendarsActions;

    const closeSidebar = () => {
        dispatch(toggleDemoMode(false));
        dispatch(toggleSidebar(false));
    };

    const handleStartTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => dispatch(updateStartTime(e.target.value));

    const handleEndTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => dispatch(updateEndTime(e.target.value));

    const {handleDeleteEvent} = UseDeleteEvent();
    const {handleEditEvent} = UseEditEvent();

    return (
        <div className={`sidebar-container ${isSidebarOpen ? "open" : "closed"}`}>
            <h1>{isDemoMode ? "Tryb demo: Edycja wydarzenia wyłączona" : "Edytuj trening"}</h1>
            {timeError && <div className="error"><p>{timeError}</p></div>}
            <label
                className="label-date"
                htmlFor="startTime"
            >Godzina rozpoczęcia
            </label>
            <input
                className="input-date"
                type="time"
                id="startTime"
                value={startTime}
                onChange={handleStartTimeChange}
            />
            <label
                className="label-date"
                htmlFor="endTime"
            >Godzina zakończenia
            </label>
            <input
                className="input-date"
                type="time"
                id="endTime"
                value={endTime}
                onChange={handleEndTimeChange}
            />
            <button
                className="sidebar-button"
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
                className="sidebar-button"
                onClick={async () => {
                    if (!isDemoMode) {
                        try {
                            if (selectedEventId)
                                await handleDeleteEvent(selectedEventId);
                        } catch (error) {
                            console.error("Wystąpił błąd podczas usuwania wydarzenia:", error);
                        }
                    }
                }}
            >
                Usuń trening
            </button>
            <button
                className="sidebar-button"
                onClick={closeSidebar}
            >
                Zamknij
            </button>
        </div>
    );
};




