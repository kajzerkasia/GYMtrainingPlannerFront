import React, {useEffect, useState} from "react";
import {fetchPlanParts, fetchTrainingPlans} from "../helpers/fetchingFunctions";
import {apiUrl} from "../config/api";
import moment from "moment/moment";
import {MyEvent} from "../components/BasicCalendar/BasicCalendar";
import {PlanEntity, PartOfPlanEntity, EventEntity} from 'types';

export const UseBasicCalendarLogic = () => {

    const [events, setEvents] = useState<MyEvent[]>([]);
    const [trainingPlans, setTrainingPlans] = useState<PlanEntity[]>([]);
    const [planParts, setPlanParts] = useState<PartOfPlanEntity[]>([]);
    const [selectedTrainingPlan, setSelectedTrainingPlan] = useState<string | null>(null);
    const [selectedPlanPartId, setSelectedPlanPartId] = useState<string | null>(null);
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
    const [selectedEvent, setSelectedEvent] = useState<MyEvent | null>(null);
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
    const [isDemoMode, setIsDemoMode] = useState(false);
    const [timeError, setTimeError] = useState<string | null>(null);

    useEffect(() => {
        fetchTrainingPlans()
            .then((plans) => {
                setTrainingPlans(plans);
            })
            .catch((error) => {
                console.error("Wystąpił błąd podczas pobierania danych eventów:", error);
            });
    }, []);

    useEffect(() => {
        if (selectedTrainingPlan !== null) {
            fetchPlanParts(selectedTrainingPlan)
                .then((parts) => {
                    setPlanParts(parts);
                })
                .catch((error) => {
                    console.error("Wystąpił błąd podczas pobierania danych eventów:", error);
                });
        }
    }, [selectedTrainingPlan]);

    useEffect(() => {
        fetch(`${apiUrl}/api/add-event/events`)
            .then((response) => response.json())
            .then((data) => {
                const formattedEvents: MyEvent[] = data.map((event: EventEntity) => {
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
                        title: `${planName} - ${event.partName} ${startTime} - ${endTime}`,
                        startTime: startTime,
                        endTime: endTime,
                    };
                });
                setEvents(formattedEvents);
            })
            .catch((error) => {
                console.error("Wystąpił błąd podczas pobierania danych eventów:", error);
            });
    }, [trainingPlans]);

    const addHoursToEvent = (startTime: string, endTime: string, event: MyEvent) => {
        if (startTime && endTime) {
            const startHour = Number(startTime.split(":")[0]);
            const startMinute = Number(startTime.split(":")[1]);
            const endHour = Number(endTime.split(":")[0]);
            const endMinute = Number(endTime.split(":")[1]);

            if (startHour > endHour || (startHour === endHour && startMinute >= endMinute)) {
                const errorMessage = "Godzina rozpoczęcia nie może być późniejsza lub równa godzinie zakończenia.";
                setTimeError(errorMessage);
                return null;
            } else {
                setTimeError(null);
            }

            const updatedEvent = {...event};
            updatedEvent.start.setHours(startHour, startMinute);
            updatedEvent.end.setHours(endHour, endMinute);
            return updatedEvent;
        }

        return null;
    };

    const handleSelect = ({start}: { start: Date; end: Date }) => {

        const isSameDate = selectedDate ? moment(selectedDate).isSame(start, 'day') : false;

        if (isSameDate) {
            setSelectedDate(null);
        } else {
            setSelectedDate(start);
        }
    };

    const handleTrainingPlanChange = (planId: string) => {
        setSelectedTrainingPlan(planId);
        setSelectedPlanPartId(null);
    };

    const handlePlanPartChange = (partId: string) => {
        setSelectedPlanPartId(partId);
    };

    const handleStartTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setStartTime(e.target.value);
    };

    const handleEndTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEndTime(e.target.value);
    };

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
                        setIsDemoMode(true);
                        return;
                    }
                    throw new Error("Nie udało się dodać wydarzenia.");
                }

                const eventData = await response.json();
                const newEventWithId: MyEvent = {
                    ...newEvent,
                    id: eventData.id,
                };

                setEvents([...events, newEventWithId]);
                setSelectedTrainingPlan(null);
                setSelectedPlanPartId(null);
                setSelectedDate(null);
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
                    setIsDemoMode(true);
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

            setEvents(updatedEvents);
            setIsSidebarOpen(false);
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
                    setIsDemoMode(true);
                    return;
                }
                throw new Error("Nie udało się usunąć wydarzenia.");
            }

            setEvents((prevEvents) =>
                prevEvents.filter((event) => event.id !== id)
            );

            setIsSidebarOpen(false);
            setSelectedEvent(null);
        } catch (error) {
            console.error("Wystąpił błąd podczas usuwania wydarzenia:", error);
        }
    };

    const handleEventClick = (event: MyEvent) => {

        if (selectedEventId === event.id) {
            setSelectedEventId(null);
            setIsSidebarOpen(false);
        } else {
            setSelectedEventId(event.id ? event.id : null);
            setStartTime(event.startTime);
            setEndTime(event.endTime);
            setSelectedEvent(event);
            setIsSidebarOpen(true);
        }
    };

    const formatFullDate = (date: Date) => {
        const monthName = date.toLocaleString('pl', {month: 'long'});
        const capitalizedMonth = monthName.charAt(0).toUpperCase() + monthName.slice(1);
        const year = date.getFullYear();
        return `${capitalizedMonth} ${year}`;
    };

    return {
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
        selectedEventId,
        isDemoMode,
        timeError,
        setIsDemoMode,
        setEvents,
        setTrainingPlans,
        setPlanParts,
        setSelectedTrainingPlan,
        setSelectedPlanPartId,
        setSelectedDate,
        setIsSidebarOpen,
        setSelectedEvent,
        setStartTime,
        setEndTime,
        setSelectedEventId,
        addHoursToEvent,
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
    };
};
