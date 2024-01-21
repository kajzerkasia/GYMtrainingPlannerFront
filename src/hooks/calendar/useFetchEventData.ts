import {calendarsActions} from "../../store/features/calendar/calendar-slice";
import {apiUrl} from "../../config/api";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store";
import {useEffect} from "react";
import moment from "moment";
import {MyEvent} from "../../components/Calendar/CalendarAddons";
import {PlanEntity} from 'types';

export const UseFetchEventData = () => {
    const dispatch = useDispatch();
    const { trainingPlans } = useSelector((state: RootState) => state.calendar);

    useEffect(() => {
        // Placeholder, zastąp odpowiednim zapytaniem do API
        const mockTrainingPlans: PlanEntity[] = [];
        dispatch(calendarsActions.updateTrainingPlans(mockTrainingPlans));

        // Pobierz dane zdarzeń
        fetch(`${apiUrl}/api/add-event/events`)
            .then((response) => response.json())
            .then((data) => {
                const formattedEvents: MyEvent[] = data.map((event: any) => {
                    // Placeholder, dostosuj do struktury danych z API
                    const startTime = moment(event.startDate).format('HH:mm');
                    const endTime = moment(event.endDate).format('HH:mm');

                    const selectedTrainingPlan = trainingPlans.find((plan) => plan.id === event.planName);
                    const planName = selectedTrainingPlan ? selectedTrainingPlan.name : event.planName;

                    return {
                        id: event.id,
                        planName: event.planName,
                        partName: event.partName,
                        start: new Date(event.startDate),
                        end: new Date(event.endDate),
                        title: `${planName} ${event.partName} ${startTime} - ${endTime}`,
                        startTime: startTime,
                        endTime: endTime,
                    };
                });
                dispatch(calendarsActions.updateEvents(() => formattedEvents));
            })
            .catch((error) => {
                console.error("Wystąpił błąd podczas pobierania danych eventów:", error);
            });
    }, [trainingPlans, dispatch]);
};