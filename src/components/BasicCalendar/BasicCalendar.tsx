import React from "react";
import {CalendarSettings} from "../CalendarSettings/CalendarSettings";
import moment from "moment";
import "moment/locale/pl";
import './BasicCalendar.css';
import {AddTrainingToCalendar} from "../PlanSelector/AddTrainingToCalendar";
import {Sidebar} from "../Sidebar/Sidebar";
import {UseBasicCalendarLogic} from "../../hooks/useBasicCalendarLogic";

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

export const BasicCalendar = () => {

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
    } = UseBasicCalendarLogic();

    return (
        <>
                <div className="aside-container">
                    <AddTrainingToCalendar
                        trainingPlans={trainingPlans}
                        planParts={planParts}
                        selectedTrainingPlan={selectedTrainingPlan}
                        selectedPlanPart={selectedPlanPartId}
                        onTrainingPlanChange={handleTrainingPlanChange}
                        onPlanPartChange={handlePlanPartChange}
                        onAddEvent={handleAddEvent}
                        isDemoMode={isDemoMode}
                        setIsDemoMode={setIsDemoMode}
                        timeError={timeError}
                        isOpen={isAddTrainingToCalendarOpen}
                        onClose={handleAddTrainingToCalendarClose}
                    />
                </div>
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
            <Sidebar
                id={selectedEvent?.id || ""}
                isOpen={isSidebarOpen}
                selectedEvent={selectedEvent}
                onEditEvent={handleEditEvent}
                onDeleteEvent={handleDeleteEvent}
                startTime={startTime}
                endTime={endTime}
                onStartTimeChange={handleStartTimeChange}
                onEndTimeChange={handleEndTimeChange}
                isDemoMode={isDemoMode}
                setIsDemoMode={setIsDemoMode}
                timeError={timeError}
                onClose={closeSidebar}
            />
        </>
    );
};
