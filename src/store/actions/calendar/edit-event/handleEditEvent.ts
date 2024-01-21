import {MyEvent} from "../../../../components/Calendar/CalendarAddons";
import {apiUrl} from "../../../../config/api";

const handleEditEvent = async (id: string, eventToUpdate: MyEvent) => {
    const updatedEventToUpdate = addHoursToEvent(startTime, endTime, eventToUpdate);

    if (!updatedEventToUpdate) {
        return;
    }

    try {
        const response = await fetch(`${apiUrl}/api/add-event/events/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                planName: eventToUpdate.planName,
                partName: eventToUpdate.partName,
                startDate: eventToUpdate.start,
                endDate: eventToUpdate.end,
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
                    start: eventToUpdate.start,
                    end: eventToUpdate.end,
                    title: `${eventToUpdate.planName} - ${eventToUpdate.partName} ${eventToUpdate.startTime} - ${eventToUpdate.endTime}`,
                    startTime: eventToUpdate.startTime,
                    endTime: eventToUpdate.endTime,
                }
                : event
        );

        dispatch(updateEvents(() => updatedEvents));
        dispatch(toggleSidebar(false));
    } catch (error) {
        console.error("Wystąpił błąd podczas aktualizacji wydarzenia:", error);
    }
};