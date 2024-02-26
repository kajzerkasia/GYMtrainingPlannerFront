import {AppThunk} from "../../index";
import {calendarsActions} from "../../features/calendar/calendar-slice";
import {apiUrl} from "../../../config/api";
import {MyEvent} from "../../../components/Calendar/CalendarAddons/CalendarAddons";
import moment from "moment";
import {uiActions} from "../../features/ui/ui-slice";

export const fetchTrainingsData = (params: Record<string, string | undefined>): AppThunk<void> => async (dispatch, getState) => {
    try {
        dispatch(calendarsActions.setIsLoading(true));

        const trainingPlans = getState().calendar.trainingPlans;
        const response = await fetch(`${apiUrl}/api/add-event/events?userId=${params.userId}`);
        const data = await response.json();

        const formattedEvents: MyEvent[] = data.map((event: any) => {
            const startTime = moment(event.startDate).format('HH:mm');
            const endTime = moment(event.endDate).format('HH:mm');

            const selectedTrainingPlan = trainingPlans.find((plan) => plan.id === event.planName);
            const planName = selectedTrainingPlan ? selectedTrainingPlan.name : event.planName;

            return {
                id: event.id,
                planName: event.planName,
                partName: event.partName,
                start: new Date(event.startDate).getTime(),
                end: new Date(event.endDate).getTime(),
                title: `${planName} ${event.partName} ${startTime} - ${endTime}`,
                startTime: startTime,
                endTime: endTime,
            };
        });

        dispatch(calendarsActions.updateEvents(formattedEvents));
        dispatch(calendarsActions.setIsLoading(false));

    } catch (error) {
        console.error("Wystąpił błąd podczas pobierania danych o zaplanowanych treningach:", error);
        dispatch(calendarsActions.setIsLoading(false));

        dispatch(uiActions.showNotification({
            status: 'error',
            title: 'Błąd!',
            message: 'Wystąpił błąd podczas pobierania danych o zaplanowanych treningach.',
        }));
    }
};