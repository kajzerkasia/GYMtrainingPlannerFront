import React, { useEffect, useState } from "react";
import { Calendar } from "../Calendar/Calendar";
import moment from "moment";
import "moment/locale/pl";
import './BasicCalendar.css';
import { PlanEntity, PartOfPlanEntity, EventEntity } from 'types';
import { fetchPlanParts, fetchTrainingPlans } from "../hooks/fetchingFunctions";
import { PlanSelector } from "../PlanSelector/PlanSelector";
import {apiUrl} from "../../config/api";

moment.locale('pl', {
    week: {
        dow: 1,
        doy: 1,
    },
});

moment.updateLocale('pl', {
    weekdaysShort: ['Niedziela', 'Poniedziałek', 'Wtorek', 'Środa', 'Czwartek', 'Piątek', 'Sobota'],
});

interface MyEvent {
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

    useEffect(() => {
        fetchTrainingPlans()
            .then((plans) => {
                setTrainingPlans(plans);
            })
            .catch((error) => {
                console.error('An error occurred when fetching training plans data:', error);
            });
    }, []);

    useEffect(() => {
        if (selectedTrainingPlan !== null) {
            fetchPlanParts(selectedTrainingPlan)
                .then((parts) => {
                    setPlanParts(parts);
                })
                .catch((error) => {
                    console.error('An error occurred when fetching plan parts data:', error);
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

                    return {
                        start: new Date(event.startDate),
                        end: new Date(event.endDate),
                        title: `${event.planName} - ${event.partName} ${startTime} - ${endTime}`,
                        startTime: startTime,
                        endTime: endTime,
                    };
                });
                setEvents(formattedEvents);
            })
            .catch((error) => {
                console.error("Wystąpił błąd podczas pobierania danych eventów:", error);
            });
    }, []);

    const handleSelect = ({ start }: { start: Date; end: Date }) => {
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
                start: new Date(selectedDate),
                end: new Date(selectedDate),
                title: `${selectedTrainingPlanName} - ${selectedPlanPartName} ${startTime} - ${endTime}`,
                startTime: startTime,
                endTime: endTime,
            };

            // Dodajemy godziny rozpoczęcia i zakończenia do nowego wydarzenia
            if (startTime && endTime) {
                newEvent.start.setHours(Number(startTime.split(":")[0]), Number(startTime.split(":")[1]));
                newEvent.end.setHours(Number(endTime.split(":")[0]), Number(endTime.split(":")[1]));
            }

            // Wysyłamy żądanie do backendu, aby dodać event do bazy danych
            try {
                const response = await fetch(`${apiUrl}/api/add-event/events`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        planName: selectedTrainingPlanName,
                        partName: selectedPlanPartName,
                        startDate: newEvent.start,
                        endDate: newEvent.end,
                    }),
                });

                if (!response.ok) {
                    throw new Error("Nie udało się dodać wydarzenia.");
                }

                // Dodajemy nowe wydarzenie do stanu events
                setEvents([...events, newEvent]);
                console.log(events);

                // Resetujemy wybrane wartości po dodaniu wydarzenia
                setSelectedTrainingPlan(null);
                setSelectedPlanPartId(null);
                setSelectedDate(null);
            } catch (error) {
                console.error('Wystąpił błąd podczas dodawania wydarzenia:', error);
            }
        }
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
                defaultView="month"
                views={["month",]}
                formats={{ dayHeaderFormat: (date) => moment(date).format('dddd MMMM Do') }}
                dayPropGetter={(date) => {
                    const isSelectedDate = selectedDate ? moment(selectedDate).isSame(date, 'day') : false;
                    return isSelectedDate ? { className: 'selected-date' } : {};
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
        </>
    );
};

// @TODO: Wyświetlanie godzin eventów, zmienić wygląd eventów!