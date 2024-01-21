import React, {useEffect} from "react";
import {CalendarSettings} from "./CalendarSettings";
import moment from "moment";
import "moment/locale/pl";
import './CalendarAddons.css';
import {AddTrainingToCalendar} from "./AddTrainingToCalendar";
import {EditTrainingFromCalendar} from "./EditTrainingFromCalendar";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store";
import {UseDateSelection} from "../../hooks/calendar/useDateSelection";
import {UseEventHandling} from "../../hooks/calendar/useEventHandling";
import {fetchPlanParts, fetchTrainingPlans} from "../../helpers/fetchingFunctions";
import {apiUrl} from "../../config/api";
import {calendarsActions} from "../../store/features/calendar/calendar-slice";
import {formatFullDate} from "../../helpers/formatFullDate";

export interface MyEvent {
    planName: string;
    partName: string;
    id?: string;
    start: Date;
    end: Date;
    title: string;
    startTime: string;
    endTime: string;
}

export const CalendarAddons = () => {

    const {handleSelect} = UseDateSelection();
    const {handleEventClick} = UseEventHandling();

    const dispatch = useDispatch();

    const {
        events,
        selectedDate,
        trainingPlans,
        selectedTrainingPlan,
    } = useSelector((state: RootState) => state.calendar);

    const {
        updateEvents,
        updateTrainingPlans,
        updatePlanParts,
    } = calendarsActions;

    useEffect(() => {
        const fetchTrainingPlansFromAPI = async () => {
            try {
                const plans = await fetchTrainingPlans();

                dispatch(updateTrainingPlans(plans));
            } catch (error) {
                console.error("Wystąpił błąd podczas pobierania danych treningowych:", error);
            }
        };

        fetchTrainingPlansFromAPI();
    }, [dispatch, updateTrainingPlans]);

    useEffect(() => {
        if (selectedTrainingPlan !== null) {
            const fetchPlanPartsFromAPI = async () => {
                try {
                    const planParts = await fetchPlanParts(selectedTrainingPlan);

                    dispatch(updatePlanParts(planParts));
                } catch (error) {
                    console.error("Wystąpił błąd podczas pobierania danych części planu:", error);
                }
            };
            fetchPlanPartsFromAPI();
        }
    }, [selectedTrainingPlan, dispatch, updatePlanParts]);

    useEffect(() => {

        fetch(`${apiUrl}/api/add-event/events`)
            .then((response) => response.json())
            .then((data) => {
                const formattedEvents: MyEvent[] = data.map((event: any) => {

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
                dispatch(updateEvents(() => formattedEvents));
            })
            .catch((error) => {
                console.error("Wystąpił błąd podczas pobierania danych eventów:", error);
            });
    }, [trainingPlans, dispatch, updateEvents]);

    return (
        <>
            <AddTrainingToCalendar/>
            <CalendarSettings
                events={events}
                startAccessor="start"
                endAccessor="end"
                selectable={true}
                onSelectSlot={handleSelect}
                onSelectEvent={handleEventClick}
                defaultView="month"
                views={["month",]}
                formats={{
                    monthHeaderFormat: (date) => formatFullDate(date),
                    dayHeaderFormat: (date) => moment(date).format('dddd MMMM Do'),
                }}
                dayPropGetter={(date) => {
                    const isSelectedDate = selectedDate ? moment(selectedDate).isSame(date, 'day') : false;
                    return isSelectedDate ? {className: 'selected-date'} : {};
                }}
                messages={{
                    next: "Następny",
                    previous: "Poprzedni",
                    today: "Obecny",
                    month: "Miesiąc",
                    week: "Tydzień",
                    day: "Dzień",
                }}
            />
            <EditTrainingFromCalendar/>
        </>
    );
};
