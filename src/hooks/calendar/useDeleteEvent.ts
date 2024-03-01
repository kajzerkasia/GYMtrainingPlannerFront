import {apiUrl} from "../../config/api";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store";
import {calendarsActions} from "../../store/features/calendar/calendar-slice";
import {uiActions} from "../../store/features/ui/ui-slice";

export const UseDeleteEvent = () => {

    const dispatch = useDispatch();
    const {
        events,
    } = useSelector((state: RootState) => state.calendar);

    const {
        updateEvents,
        selectEvent,
        toggleDemoMode,
    } = calendarsActions;

    const handleDeleteEvent = async (id: string) => {

        dispatch(uiActions.showNotification({
            status: 'pending',
            title: 'Usuwanie...',
            message: 'Usuwanie treningu'
        }));

        try {
            const response = await fetch(`${apiUrl}/api/add-event/events/${id}`, {
                method: "DELETE",
            });

            if (!response.ok) {
                if (response.status === 403) {
                    dispatch(toggleDemoMode(true));
                    return;
                }
                dispatch(uiActions.showNotification({
                    status: 'error',
                    title: 'Błąd!',
                    message: 'Wystąpił błąd podczas usuwania treningu.'
                }))
                throw new Error("Nie udało się usunąć treningu.");
            }

            dispatch(updateEvents((events.filter(event => event.id !== id))));
            dispatch(selectEvent(null));
            dispatch(uiActions.showNotification({
                status: 'success',
                title: 'Sukces!',
                message: 'Pomyślnie usunięto trening.'
            }))
        } catch (error) {
            dispatch(uiActions.showNotification({
                status: 'error',
                title: 'Błąd!',
                message: 'Wystąpił błąd podczas usuwania treningu.'
            }))
            console.error("Wystąpił błąd podczas usuwania wydarzenia:", error);
        }
    };

    return {
        handleDeleteEvent,
    }
};

