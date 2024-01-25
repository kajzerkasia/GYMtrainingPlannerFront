import React, {useEffect, useState} from "react";
import {CalendarSettings} from "./CalendarSettings";
import moment from "moment";
import "moment/locale/pl";
import './CalendarAddons.css';
import {AddTrainingToCalendar} from "./AddTrainingToCalendar";
import {EditTrainingFromCalendar} from "./EditTrainingFromCalendar";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../store";
import {UseDateSelection} from "../../hooks/calendar/useDateSelection";
import {UseEventHandling} from "../../hooks/calendar/useEventHandling";
import {fetchPlanParts, fetchTrainingPlans} from "../../helpers/fetchingFunctions";
import {calendarsActions} from "../../store/features/calendar/calendar-slice";
import {fetchTrainingsData} from "../../store/actions/calendar/fetchingTrainings/fetching-action";
import {formatMonthName} from "../../helpers/formatMonthName";

export interface MyEvent {
    planName: string;
    partName: string;
    id?: string;
    start: number | Date;
    end: number | Date;
    title: string;
    startTime: string;
    endTime: string;
}

interface CalendarAddonsProps {
    openModal: () => void;
}

export const CalendarAddons = ({openModal}: CalendarAddonsProps) => {

    const {handleSelect} = UseDateSelection();
    const {handleEventClick} = UseEventHandling();

    const dispatch = useDispatch();

    const {
        events,
        selectedDate,
        selectedTrainingPlan,
    } = useSelector((state: RootState) => state.calendar);

    const {
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
        const fetchData = async () => {
            try {
                (dispatch as AppDispatch)(fetchTrainingsData());
            } catch (error) {
                console.error("Wystąpił błąd podczas pobierania danych o treningach:", error);
            }
        };

        fetchData();
    }, [dispatch]);

    const [currentMonth, setCurrentMonth] = useState(moment().format('MMMM'));

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
                views={["month", "day"]}
                formats={{
                    monthHeaderFormat: (date) => formatMonthName(moment(date).format('MMMM YYYY')),
                    dayHeaderFormat: (date) => moment(date).format('dddd MMMM Do'),
                }}
                dayPropGetter={(date) => {
                    const isSelectedDate = selectedDate ? moment(selectedDate).isSame(date, 'day') : false;
                    return isSelectedDate ? {className: 'selected-date'} : {};
                }}
                messages={{
                    next: "⮞",
                    previous: "⮜",
                    today: formatMonthName(currentMonth),
                    month: "Miesiąc",
                    week: "Tydzień",
                    day: "Dzień",
                }}
                onNavigate={(newDate) => setCurrentMonth(moment(newDate).format('MMMM'))}
            />
            <EditTrainingFromCalendar
                openModal={openModal}/>
        </>
    );
};
