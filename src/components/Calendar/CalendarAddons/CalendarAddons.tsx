import React, {useState} from "react";
import {CalendarSettings} from "../CalendarSettings";
import {useSelector} from "react-redux";
import {RootState} from "../../../store";
import {UseDateSelection} from "../../../hooks/calendar/useDateSelection";
import {UseEventHandling} from "../../../hooks/calendar/useEventHandling";
import {formatDateName} from "../../../helpers/formatMonthName";
import moment from "moment";
import "moment/locale/pl";
import './CalendarAddons.css';
import {AddTrainingToCalendar} from "../AddTrainingToCalendar/AddTrainingToCalendar";
import {EditTrainingFromCalendar} from "../EditTrainingFromCalendar/EditTrainingFromCalendar";
import {UseFetchTrainingsData} from "../../../hooks/calendar/useFetchTrainingsData";

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
    params: Record<string, string | undefined>
}

export const CalendarAddons = ({params}: CalendarAddonsProps) => {

    const {handleSelect} = UseDateSelection();
    const {handleEventClick} = UseEventHandling();

    const {
        events,
        selectedDate,
        selectedTrainingPlan
    } = useSelector((state: RootState) => state.calendar);

    const { fetchPlansData, fetchTrainingsData, fetchPlanParts } = UseFetchTrainingsData();

    fetchPlansData(params);
    fetchTrainingsData(params);
    if (selectedTrainingPlan !== null) {
        fetchPlanParts(selectedTrainingPlan);
    }

    const [currentMonth, setCurrentMonth] = useState(moment().format('MMMM'));

    return (
        <>
            <CalendarSettings
                events={events}
                startAccessor="start"
                endAccessor="end"
                selectable={true}
                onSelectSlot={handleSelect}
                onSelectEvent={handleEventClick}
                defaultView="month"
                views={["month"]}
                formats={{
                    monthHeaderFormat: (date) => formatDateName(moment(date).format('MMMM YYYY')),
                    dayHeaderFormat: (date) => {
                        const formattedDate = moment(date).locale('pl').format('dddd D MMMM');
                        return formatDateName(formattedDate);
                    },
                }}
                dayPropGetter={(date) => {
                    const isSelectedDate = selectedDate ? moment(selectedDate).isSame(date, 'day') : false;
                    return isSelectedDate ? {className: 'selected-date'} : {};
                }}
                messages={{
                    next: "⮞",
                    previous: "⮜",
                    today: formatDateName(currentMonth),
                    month: "Miesiąc",
                    week: "Tydzień",
                    day: "Dzień",
                }}
                onNavigate={(newDate) => setCurrentMonth(moment(newDate).format('MMMM'))}
            />
        </>
    );
};
