import React, { useEffect, useState } from "react";
import { Calendar } from "../Calendar/Calendar";
import moment from "moment";
import "moment/locale/pl";
import './BasicCalendar.css';
import { PlanEntity, PartOfPlanEntity } from 'types';
import { fetchPlanParts, fetchTrainingPlans } from "../hooks/fetchingFunctions";
import { PlanSelector } from "../PlanSelector/PlanSelector";

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
}

export const BasicCalendar = () => {
    const [events, setEvents] = useState<MyEvent[]>([]);
    const [trainingPlans, setTrainingPlans] = useState<PlanEntity[]>([]);
    const [planParts, setPlanParts] = useState<PartOfPlanEntity[]>([]);
    const [selectedTrainingPlan, setSelectedTrainingPlan] = useState<string | null>(null); // Zmiana typu na string
    const [selectedPlanPartId, setSelectedPlanPartId] = useState<string | null>(null);
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);

    const currentDate = new Date();

    useEffect(() => {
        // Pobieramy listę planów treningowych z bazy danych
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
            // Pobieramy listę części planów dla wybranego planu treningowego
            fetchPlanParts(selectedTrainingPlan)
                .then((parts) => {
                    setPlanParts(parts);
                })
                .catch((error) => {
                    console.error('An error occurred when fetching plan parts data:', error);
                });
        }
    }, [selectedTrainingPlan]);

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

    const handleAddEvent = (startTime: string, endTime: string) => {
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
                title: `Plan: ${selectedTrainingPlanName}, Trening: ${selectedPlanPartName}`,
            };

            // Dodajemy godziny rozpoczęcia i zakończenia do nowego wydarzenia
            if (startTime && endTime) {
                newEvent.start.setHours(Number(startTime.split(":")[0]), Number(startTime.split(":")[1]));
                newEvent.end.setHours(Number(endTime.split(":")[0]), Number(endTime.split(":")[1]));
            }

            // Dodajemy nowe wydarzenie do stanu events
            setEvents([...events, newEvent]);

            // Resetujemy wybrane wartości po dodaniu wydarzenia
            setSelectedTrainingPlan(null);
            setSelectedPlanPartId(null);
            setSelectedDate(null);
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
                views={["month", "week", "day"]}
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

// @TODO: Baza danych dla eventów, określanie godzin eventów, zmienić wygląd eventów!