import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store";
import {MyEvent} from "../../components/Calendar/CalendarAddons";
import {apiUrl} from "../../config/api";
import {calendarsActions} from "../../store/features/calendar/calendar-slice";
import {UseDateSelection} from "./useDateSelection";

export const UseEventHandling = () => {
    const dispatch = useDispatch();
    const {
        events,
        trainingPlans,
        planParts,
        selectedTrainingPlan,
        selectedPlanPartId,
        selectedDate,
        startTime,
        endTime,
        selectedEventId,
    } = useSelector((state: RootState) => state.calendar);

    const {
        updateEvents,
        selectDate,
        selectTrainingPlan,
        selectPlanPart,
        selectEvent,
        updateStartTime,
        updateEndTime,
        selectEventId,
        toggleDemoMode,
        updateTimeError,
        toggleSidebar,
    } = calendarsActions;

    const {unselectDate} = UseDateSelection();

    const addHoursToEvent = (startTime: string, endTime: string, event: MyEvent) => {
        if (startTime && endTime) {
            const startHour = Number(startTime.split(":")[0]);
            const startMinute = Number(startTime.split(":")[1]);
            const endHour = Number(endTime.split(":")[0]);
            const endMinute = Number(endTime.split(":")[1]);

            if (startHour > endHour || (startHour === endHour && startMinute >= endMinute)) {
                dispatch(updateTimeError("Godzina rozpoczęcia nie może być późniejsza lub równa godzinie zakończenia."));
                return null;
            } else {
                dispatch(updateTimeError(null));
            }

            const updatedEvent: MyEvent = {
                ...event,
                start: event.start instanceof Date
                    ? new Date(event.start.getTime() + (startHour * 60 + startMinute) * 60 * 1000)
                    : event.start + (startHour * 60 + startMinute) * 60 * 1000,
                end: event.end instanceof Date
                    ? new Date(event.end.getTime() + (endHour * 60 + endMinute) * 60 * 1000)
                    : event.end + (endHour * 60 + endMinute) * 60 * 1000,
            };

            return updatedEvent;
        }

        return null;
    };

    const handleAddEvent = async (startTime: string, endTime: string) => {
        if (selectedTrainingPlan && selectedPlanPartId && selectedDate) {
            const selectedTrainingPlanName =
                trainingPlans.find((plan) => plan.id === selectedTrainingPlan)?.name || "";

            const selectedPlanPartName =
                planParts.find((part) => part.id === selectedPlanPartId)?.name || "";

            const newEvent: MyEvent = {
                planName: selectedTrainingPlanName,
                partName: selectedPlanPartName,
                start: new Date(selectedDate).getTime(),
                end: new Date(selectedDate).getTime(),
                title: `${selectedTrainingPlanName} - ${selectedPlanPartName} ${startTime} - ${endTime}`,
                startTime: startTime,
                endTime: endTime,
            };

            const updatedNewEvent = addHoursToEvent(startTime, endTime, newEvent);

            if (!updatedNewEvent) {
                return;
            }

            const startDate = updatedNewEvent.start instanceof Date
                ? updatedNewEvent.start.getTime()
                : updatedNewEvent.start;

            const endDate = updatedNewEvent.end instanceof Date
                ? updatedNewEvent.end.getTime()
                : updatedNewEvent.end;

            try {
                const response = await fetch(`${apiUrl}/api/add-event/events`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        planName: newEvent.planName,
                        partName: newEvent.partName,
                        startDate: startDate,
                        endDate: endDate,
                    }),
                });

                if (!response.ok) {
                    if (response.status === 403) {
                        dispatch(toggleDemoMode(true));
                        return;
                    }
                    throw new Error("Nie udało się dodać wydarzenia.");
                }

                const eventData = await response.json();
                const newEventWithId: MyEvent = {
                    ...newEvent,
                    id: eventData.id,
                };

                dispatch(updateEvents([...events, newEventWithId]));
                dispatch(selectTrainingPlan(null));
                dispatch(selectPlanPart(null));
                dispatch(selectDate(null));
            } catch (error) {
                console.error('Wystąpił błąd podczas dodawania wydarzenia:', error);
            }
        }
    };

    const handleEditEvent = async (id: string, eventToUpdate: MyEvent) => {
        const updatedEventToUpdate = addHoursToEvent(startTime, endTime, eventToUpdate);

        if (!updatedEventToUpdate) {
            return;
        }

        const startDate = updatedEventToUpdate.start instanceof Date
            ? updatedEventToUpdate.start.getTime()
            : updatedEventToUpdate.start;

        const endDate = updatedEventToUpdate.end instanceof Date
            ? updatedEventToUpdate.end.getTime()
            : updatedEventToUpdate.end;

        try {
            const response = await fetch(`${apiUrl}/api/add-event/events/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    planName: eventToUpdate.planName,
                    partName: eventToUpdate.partName,
                    startDate: startDate,
                    endDate: endDate,
                }),
            });

            if (!response.ok) {
                if (response.status === 403) {
                    dispatch(toggleDemoMode(true));
                    return;
                }
                throw new Error("Nie udało się edytować wydarzenia.");
            }

            const updatedEvents = events.map((event) =>
                event.id === id
                    ? {
                        ...event,
                        planName: eventToUpdate.planName,
                        partName: eventToUpdate.partName,
                        start: eventToUpdate.start instanceof Date ? eventToUpdate.start.getTime() : eventToUpdate.start,
                        end: eventToUpdate.end instanceof Date ? eventToUpdate.end.getTime() : eventToUpdate.end,
                        title: `${eventToUpdate.planName} - ${eventToUpdate.partName} ${eventToUpdate.startTime} - ${eventToUpdate.endTime}`,
                        startTime: eventToUpdate.startTime,
                        endTime: eventToUpdate.endTime,
                    }
                    : event
            );

            dispatch(updateEvents(updatedEvents));
            dispatch(toggleSidebar(false));
        } catch (error) {
            console.error("Wystąpił błąd podczas aktualizacji wydarzenia:", error);
        }
    };

    const handleDeleteEvent = async (id: string) => {
        try {
            const response = await fetch(`${apiUrl}/api/add-event/events/${id}`, {
                method: "DELETE",
            });

            if (!response.ok) {
                if (response.status === 403) {
                    dispatch(toggleDemoMode(true));
                    return;
                }
                throw new Error("Nie udało się usunąć wydarzenia.");
            }

            dispatch(updateEvents((events.filter(event => event.id !== id))));
            dispatch(toggleSidebar(false));
            dispatch(selectEvent(null));
        } catch (error) {
            console.error("Wystąpił błąd podczas usuwania wydarzenia:", error);
        }
    };

    const handleEventClick = (event: MyEvent) => {
        if (selectedEventId === event.id) {
            dispatch(selectEventId(null));
            dispatch(toggleSidebar(false));
            unselectDate();
        } else {
            dispatch(selectEventId(event.id || null));
            dispatch(updateStartTime(event.startTime));
            dispatch(updateEndTime(event.endTime));
            dispatch(selectEvent(event));
            dispatch(toggleSidebar(true));
        }
    };

    return {
        addHoursToEvent,
        handleAddEvent,
        handleEditEvent,
        handleDeleteEvent,
        handleEventClick,
    };
};