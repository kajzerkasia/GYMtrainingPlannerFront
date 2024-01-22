import {apiUrl} from "../../config/api";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store";
import {calendarsActions} from "../../store/features/calendar/calendar-slice";

export const UseDeleteEvent = () => {

    const dispatch = useDispatch();
    const {
        events,
    } = useSelector((state: RootState) => state.calendar);

    const {
        updateEvents,
        selectEvent,
        toggleDemoMode,
        toggleSidebar,
    } = calendarsActions;

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

    return {
        handleDeleteEvent,
    }
};

