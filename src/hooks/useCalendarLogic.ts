import React, {useEffect, useState} from "react";
import {fetchPlanParts, fetchTrainingPlans} from "../helpers/fetchingFunctions";
import {apiUrl} from "../config/api";
import moment from "moment/moment";
import {MyEvent} from "../components/Calendar/CalendarAddons";
import {PlanEntity, PartOfPlanEntity, EventEntity} from 'types';
import {calendarsActions} from "../store/features/calendar/calendar-slice";
import {RootState} from "../store";
import {useDispatch, useSelector} from "react-redux";

export const UseCalendarLogic = () => {
    const dispatch = useDispatch();
    const {
        events,
        trainingPlans,
        planParts,
        selectedTrainingPlan,
        selectedPlanPartId,
        selectedDate,
        startTime,
        endTime,
        selectedEventId,
    } = useSelector((state: RootState) => state.calendar);

    const {
        updateEvents,
        selectDate,
        updateTrainingPlans,
        updatePlanParts,
        selectTrainingPlan,
        selectPlanPart,
        selectEvent,
        updateStartTime,
        updateEndTime,
        selectEventId,
        toggleDemoMode,
        updateTimeError,
        toggleAddTrainingToCalendar,
        toggleSidebar,
    } = calendarsActions;

    useEffect(() => {
        // Placeholder, zastąp odpowiednim zapytaniem do API
        const mockTrainingPlans: PlanEntity[] = [];
        dispatch(updateTrainingPlans(mockTrainingPlans));
    }, [dispatch]);

    useEffect(() => {
        if (selectedTrainingPlan !== null) {
            // Placeholder, zastąp odpowiednim zapytaniem do API
            const mockPlanParts: PartOfPlanEntity[] = [];
            dispatch(updatePlanParts(mockPlanParts));
        }
    }, [selectedTrainingPlan, dispatch]);

    useEffect(() => {
        // Placeholder, zastąp odpowiednim zapytaniem do API
        fetch(`${apiUrl}/api/add-event/events`)
            .then((response) => response.json())
            .then((data) => {
                const formattedEvents: MyEvent[] = data.map((event: EventEntity) => {
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
                dispatch(updateEvents(() => formattedEvents));
            })
            .catch((error) => {
                console.error("Wystąpił błąd podczas pobierania danych eventów:", error);
            });
    }, [trainingPlans, dispatch]);

    const addHoursToEvent = (startTime: string, endTime: string, event: MyEvent) => {
        if (startTime && endTime) {
            const startHour = Number(startTime.split(":")[0]);
            const startMinute = Number(startTime.split(":")[1]);
            const endHour = Number(endTime.split(":")[0]);
            const endMinute = Number(endTime.split(":")[1]);

            if (startHour > endHour || (startHour === endHour && startMinute >= endMinute)) {
                dispatch(updateTimeError("Godzina rozpoczęcia nie może być późniejsza lub równa godzinie zakończenia."));
                return null;
            } else {
                dispatch(updateTimeError(null));
            }

            const updatedEvent = { ...event };
            updatedEvent.start.setHours(startHour, startMinute);
            updatedEvent.end.setHours(endHour, endMinute);
            return updatedEvent;
        }

        return null;
    };

    const handleSelect = ({ start }: { start: Date; end: Date }) => {
        const isSameDate = selectedDate ? moment(selectedDate).isSame(start, 'day') : false;

        if (isSameDate) {
            dispatch(selectDate(null));
            dispatch(toggleAddTrainingToCalendar(false));
        } else {
            dispatch(selectDate(start));
            dispatch(toggleAddTrainingToCalendar(true));
        }
    };

    const handleTrainingPlanChange = (planId: string) => {
        dispatch(selectTrainingPlan(planId));
        dispatch(selectPlanPart(null));
    };

    const handlePlanPartChange = (partId: string) => {
        dispatch(selectPlanPart(partId));
    };

    const handleStartTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => dispatch(updateStartTime(e.target.value));

    const handleEndTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => dispatch(updateEndTime(e.target.value));

    const handleAddEvent = async (startTime: string, endTime: string) => {
        if (selectedTrainingPlan && selectedPlanPartId && selectedDate) {
            const selectedTrainingPlanName =
                trainingPlans.find((plan) => plan.id === selectedTrainingPlan)?.name || "";

            const selectedPlanPartName =
                planParts.find((part) => part.id === selectedPlanPartId)?.name || "";

            const newEvent: MyEvent = {
                planName: selectedTrainingPlanName,
                partName: selectedPlanPartName,
                start: new Date(selectedDate),
                end: new Date(selectedDate),
                title: `${selectedTrainingPlanName} - ${selectedPlanPartName} ${startTime} - ${endTime}`,
                startTime: startTime,
                endTime: endTime,
            };

            const updatedNewEvent = addHoursToEvent(startTime, endTime, newEvent);

            if (!updatedNewEvent) {
                return;
            }

            try {
                const response = await fetch(`${apiUrl}/api/add-event/events`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        planName: newEvent.planName,
                        partName: newEvent.partName,
                        startDate: newEvent.start,
                        endDate: newEvent.end,
                    }),
                });

                if (!response.ok) {
                    if (response.status === 403) {
                        dispatch(toggleDemoMode(true));
                        return;
                    }
                    throw new Error("Nie udało się dodać wydarzenia.");
                }

                const eventData = await response.json();
                const newEventWithId: MyEvent = {
                    ...newEvent,
                    id: eventData.id,
                };

                dispatch(updateEvents((prevEvents) => [...prevEvents, newEventWithId]));
                dispatch(selectTrainingPlan(null));
                dispatch(selectPlanPart(null));
                dispatch(selectDate(null));
            } catch (error) {
                console.error('Wystąpił błąd podczas dodawania wydarzenia:', error);
            }
        }
    };

    const handleEditEvent = async (id: string, eventToUpdate: MyEvent) => {
        const updatedEventToUpdate = addHoursToEvent(startTime, endTime, eventToUpdate);

        if (!updatedEventToUpdate) {
            return;
        }

        try {
            const response = await fetch(`${apiUrl}/api/add-event/events/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    planName: eventToUpdate.planName,
                    partName: eventToUpdate.partName,
                    startDate: eventToUpdate.start,
                    endDate: eventToUpdate.end,
                }),
            });

            if (!response.ok) {
                if (response.status === 403) {
                    dispatch(toggleDemoMode(true));
                    return;
                }
                throw new Error("Nie udało się edytować wydarzenia.");
            }

            const updatedEvents = events.map((event) =>
                event.id === id
                    ? {
                        ...event,
                        planName: eventToUpdate.planName,
                        partName: eventToUpdate.partName,
                        start: eventToUpdate.start,
                        end: eventToUpdate.end,
                        title: `${eventToUpdate.planName} - ${eventToUpdate.partName} ${eventToUpdate.startTime} - ${eventToUpdate.endTime}`,
                        startTime: eventToUpdate.startTime,
                        endTime: eventToUpdate.endTime,
                    }
                    : event
            );

            dispatch(updateEvents(() => updatedEvents));
            dispatch(toggleSidebar(false));
        } catch (error) {
            console.error("Wystąpił błąd podczas aktualizacji wydarzenia:", error);
        }
    };

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

            dispatch(updateEvents((prevEvents: MyEvent[]) => prevEvents.filter((event) => event.id !== id)));
            dispatch(toggleSidebar(false));
            dispatch(selectEvent(null));
        } catch (error) {
            console.error("Wystąpił błąd podczas usuwania wydarzenia:", error);
        }
    };

    const handleEventClick = (event: MyEvent) => {
        if (selectedEventId === event.id) {
            dispatch(selectEventId(null));
            dispatch(toggleSidebar(false));
            unselectDate();
        } else {
            dispatch(selectEventId(event.id || null));
            dispatch(updateStartTime(event.startTime));
            dispatch(updateEndTime(event.endTime));
            dispatch(selectEvent(event));
            dispatch(toggleSidebar(true));
        }
    };

    const formatFullDate = (date: Date) => {
        const monthName = date.toLocaleString('pl', { month: 'long' });
        const capitalizedMonth = monthName.charAt(0).toUpperCase() + monthName.slice(1);
        const year = date.getFullYear();
        return `${capitalizedMonth} ${year}`;
    };
};


// Dodać nazwę edytowanego treningu w EditTrainingFromCalendar, wyświetlać wybrany dzień w addTraining, naprawić chowający się addTraining po wejściu w kalendarz,

// Trzeba zrobić widok dnia z treningami

// Naprawić zamykanie sidebara i ponowne klikanie w ten sam dzień po zamknięciu przyciskiem

// Uzyć tutaj redux-toolkit