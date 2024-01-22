import {MyEvent} from "../../components/Calendar/CalendarAddons";
import {apiUrl} from "../../config/api";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store";
import {calendarsActions} from "../../store/features/calendar/calendar-slice";
import {UseAddHoursToEvent} from "./useAddHoursToEvent";
import {uiActions} from "../../store/features/ui/ui-slice";

export const UseEditEvent = () => {

    const dispatch = useDispatch();
    const {
        events,
        startTime,
        endTime,
    } = useSelector((state: RootState) => state.calendar);

    const {
        updateEvents,
        toggleDemoMode,
        toggleSidebar,
    } = calendarsActions;

    const {addHoursToEvent} = UseAddHoursToEvent();

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

        dispatch(uiActions.showNotification({
            status: 'pending',
            title: 'Aktualizowanie...',
            message: 'Aktualizowanie treningu'
        }));

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
                dispatch(uiActions.showNotification({
                    status: 'error',
                    title: 'Błąd!',
                    message: 'Wystąpił błąd podczas próby zaktualizowania godzin treningu.'
                }))
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
            dispatch(uiActions.showNotification({
                status: 'success',
                title: 'Sukces!',
                message: 'Pomyślnie zaktualizowano godziny treningu.'
            }))
        } catch (error) {
            console.error("Wystąpił błąd podczas aktualizacji wydarzenia:", error);
            dispatch(uiActions.showNotification({
                status: 'error',
                title: 'Błąd!',
                message: 'Wystąpił błąd podczas próby zaktualizowania godzin treningu.'
            }))
        }
    };

    return {
        handleEditEvent,
    }
};
