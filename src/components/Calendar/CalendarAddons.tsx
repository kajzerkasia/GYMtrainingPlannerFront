import React from "react";
import {CalendarSettings} from "./CalendarSettings";
import moment from "moment";
import "moment/locale/pl";
import './CalendarAddons.css';
import {AddTrainingToCalendar} from "./AddTrainingToCalendar";
import {EditTrainingFromCalendar} from "./EditTrainingFromCalendar";
import {UseCalendarLogic} from "../../hooks/useCalendarLogic";

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

    const {
        events,
        trainingPlans,
        planParts,
        selectedTrainingPlan,
        selectedPlanPartId,
        selectedDate,
        isSidebarOpen,
        selectedEvent,
        startTime,
        endTime,
        isDemoMode,
        timeError,
        isAddTrainingToCalendarOpen,
        handleAddTrainingToCalendarClose,
        closeSidebar,
        setIsDemoMode,
        handleSelect,
        handleTrainingPlanChange,
        handlePlanPartChange,
        handleStartTimeChange,
        handleEndTimeChange,
        handleAddEvent,
        handleEditEvent,
        handleDeleteEvent,
        handleEventClick,
        formatFullDate,
    } = UseCalendarLogic();

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
