import React, {useEffect, useState} from "react";
import {Calendar} from "../Calendar/Calendar";
import moment from "moment";
import "moment/locale/pl";
import './BasicCalendar.css';
import {PlanEntity, PartOfPlanEntity, EventEntity} from 'types';
import {fetchPlanParts, fetchTrainingPlans} from "../hooks/fetchingFunctions";
import {PlanSelector} from "../PlanSelector/PlanSelector";
import {apiUrl} from "../../config/api";
import {Sidebar} from "../Sidebar/Sidebar";

moment.locale('pl', {
    week: {
        dow: 1,
        doy: 1,
    },
});

moment.updateLocale('pl', {
    weekdaysShort: ['Niedziela', 'Poniedziałek', 'Wtorek', 'Środa', 'Czwartek', 'Piątek', 'Sobota'],
});

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
    const [events, setEvents] = useState<MyEvent[]>([]);
    const [trainingPlans, setTrainingPlans] = useState<PlanEntity[]>([]);
    const [planParts, setPlanParts] = useState<PartOfPlanEntity[]>([]);
    const [selectedTrainingPlan, setSelectedTrainingPlan] = useState<string | null>(null); // Zmiana typu na string
    const [selectedPlanPartId, setSelectedPlanPartId] = useState<string | null>(null);
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
    const [selectedEvent, setSelectedEvent] = useState<MyEvent | null>(null);
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");

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
                console.error("Godzina rozpoczęcia nie może być późniejsza lub równa godzinie zakończenia.");
                return null;
            }

            const updatedEvent = {...event};
            updatedEvent.start.setHours(startHour, startMinute);
            updatedEvent.end.setHours(endHour, endMinute);
            return updatedEvent;
        }

        return null;
    };

    const handleSelect = ({start}: { start: Date; end: Date }) => {
        // Sprawdzamy, czy kliknięto w ten sam dzień, który został już wcześniej wybrany
        const isSameDate = selectedDate ? moment(selectedDate).isSame(start, 'day') : false;

        if (isSameDate) {
            // Jeśli kliknięto w ten sam dzień, odznaczamy go przez ustawienie selectedDate na null
            setSelectedDate(null);
        } else {
            // Jeśli kliknięto w inny dzień, zapisujemy go do stanu
            setSelectedDate(start);
        }
    };

    const handleTrainingPlanChange = (planId: string) => {
        setSelectedTrainingPlan(planId);
        // Zresetuj wybraną część planu, ponieważ zmienił się plan treningowy
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
            // Pobierz nazwę planu treningowego na podstawie wybranego id
            const selectedTrainingPlanName =
                trainingPlans.find((plan) => plan.id === selectedTrainingPlan)?.name || "";

            // Pobierz nazwę części planu na podstawie wybranego id
            const selectedPlanPartName =
                planParts.find((part) => part.id === selectedPlanPartId)?.name || "";

            // Tworzymy nowe wydarzenie, które będzie dodane do kalendarza
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
                    throw new Error("Nie udało się dodać wydarzenia.");
                }

                // Oczekiwanie na odpowiedź z serwera i wyciągnięcie identyfikatora (id) z odpowiedzi
                const eventData = await response.json();
                const newEventWithId: MyEvent = {
                    ...newEvent,
                    id: eventData.id,
                };

                // Dodaj nowe wydarzenie z id do stanu events
                setEvents([...events, newEventWithId]);

                // Resetujemy wybrane wartości po dodaniu wydarzenia
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
            // console.log("Odpowiedź z backendu:", response);

            if (!response.ok) {
                throw new Error("Nie udało się zaktualizować wydarzenia.");
            }

            // Aktualizuj wydarzenie w stanie events
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
            // console.log("Zaktualizowany stan events:", updatedEvents);
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
                throw new Error("Nie udało się usunąć wydarzenia.");
            }

            // Usuń wydarzenie ze stanu events
            setEvents((prevEvents) =>
                prevEvents.filter((event) => event.id !== id)
            );

            setIsSidebarOpen(false);
            // Resetuj selectedEvent po usunięciu
            setSelectedEvent(null);
        } catch (error) {
            console.error("Wystąpił błąd podczas usuwania wydarzenia:", error);
        }
    };

    const handleEventClick = (event: MyEvent) => {
        // console.log("Kliknięto wydarzenie, ID:", event.id);
        // Ustawienie wybranej godziny rozpoczęcia i zakończenia na podstawie wydarzenia, które jest edytowane
        setStartTime(event.startTime);
        setEndTime(event.endTime);

        setSelectedEvent(event);
        setIsSidebarOpen(true);
    };

    return (
        <>
            {selectedDate && (
                <div className="aside-container">
                    <PlanSelector
                        trainingPlans={trainingPlans}
                        planParts={planParts}
                        selectedTrainingPlan={selectedTrainingPlan}
                        selectedPlanPart={selectedPlanPartId}
                        onTrainingPlanChange={handleTrainingPlanChange}
                        onPlanPartChange={handlePlanPartChange}
                        isOpen={true}
                        onAddEvent={handleAddEvent}
                    />
                </div>
            )}
            <Calendar
                events={events}
                startAccessor="start"
                endAccessor="end"
                selectable={true}
                onSelectSlot={handleSelect}
                onSelectEvent={handleEventClick}
                defaultView="month"
                views={["month",]}
                formats={{dayHeaderFormat: (date) => moment(date).format('dddd MMMM Do')}}
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
                onClose={() => setIsSidebarOpen(false)}
                selectedEvent={selectedEvent}
                onEditEvent={handleEditEvent}
                onDeleteEvent={handleDeleteEvent}
                startTime={startTime}
                endTime={endTime}
                onStartTimeChange={handleStartTimeChange}
                onEndTimeChange={handleEndTimeChange}
            />
        </>
    );
};
