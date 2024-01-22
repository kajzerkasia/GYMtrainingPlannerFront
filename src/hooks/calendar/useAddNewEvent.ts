import {MyEvent} from "../../components/Calendar/CalendarAddons";
import {uiActions} from "../../store/features/ui/ui-slice";
import {apiUrl} from "../../config/api";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store";
import {calendarsActions} from "../../store/features/calendar/calendar-slice";
import {UseAddHoursToEvent} from "./useAddHoursToEvent";

export const UseAddNewEvent = () => {
    const dispatch = useDispatch();
    const {
        events,
        trainingPlans,
        planParts,
        selectedTrainingPlan,
        selectedPlanPartId,
        selectedDate,
    } = useSelector((state: RootState) => state.calendar);

    const {
        updateEvents,
        selectDate,
        selectTrainingPlan,
        selectPlanPart,
        updateStartTime,
        updateEndTime,
        toggleDemoMode,
        toggleAddTrainingToCalendar,
    } = calendarsActions;

    const {addHoursToEvent} = UseAddHoursToEvent();

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

            dispatch(uiActions.showNotification({
                status: 'pending',
                title: 'Dodawanie...',
                message: 'Dodawanie treningu'
            }));

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
                        dispatch(uiActions.showNotification({
                            status: 'error',
                            title: 'Błąd!',
                            message: 'Wystąpił błąd podczas dodawania treningu.'
                        }));
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
                dispatch(toggleAddTrainingToCalendar(false));
                dispatch(updateStartTime(''));
                dispatch(updateEndTime(''));

                dispatch(uiActions.showNotification({
                    status: 'success',
                    title: 'Sukces!',
                    message: 'Pomyślnie dodano nowy trening.'
                }));

            } catch (error) {
                console.error('Wystąpił błąd podczas dodawania wydarzenia:', error);
                dispatch(uiActions.showNotification({
                    status: 'error',
                    title: 'Błąd!',
                    message: 'Wystąpił błąd podczas dodawania treningu.'
                }));
            }
        }
    };

    return {
        handleAddEvent,
    }
};