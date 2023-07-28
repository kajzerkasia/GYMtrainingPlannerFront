import React, { useEffect, useState } from "react";
import { Calendar } from "../Calendar/Calendar";
import moment from "moment";
import './BasicCalendar.css';
import { PlanEntity, PartOfPlanEntity } from 'types';
import { fetchPlanParts, fetchTrainingPlans } from "../hooks/fetchingFunctions";
import { PlanSelector } from "../PlanSelect/PlanSelector";

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
    const [selectedPlanPart, setSelectedPlanPart] = useState<string | null>(null); // Zmiana typu na string

    const currentDate = new Date();
    const startDate = moment(currentDate).hour(6).minute(0).toDate();
    const endDate = moment(currentDate).hour(23).minute(0).toDate();

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

    const handleSelect = ({ start, end }: { start: Date; end: Date }) => {
        // Obsługa kliknięcia na dzień w kalendarzu
        // logika do wyświetlenia rozwijalnego selecta i dodania wydarzenia do kalendarza
    };

    const handleTrainingPlanChange = (planId: string) => {
        setSelectedTrainingPlan(planId);
    };

    const handlePlanPartChange = (partId: string) => {
        setSelectedPlanPart(partId);
    };

    return (
        <>
            <PlanSelector
                trainingPlans={trainingPlans}
                planParts={planParts}
                selectedTrainingPlan={selectedTrainingPlan}
                selectedPlanPart={selectedPlanPart}
                onTrainingPlanChange={handleTrainingPlanChange}
                onPlanPartChange={handlePlanPartChange}
            />

            <Calendar
                events={events}
                startAccessor="start"
                endAccessor="end"
                selectable={true}
                onSelectSlot={handleSelect}
                defaultView="month"
                views={["month", "week", "day"]}
                min={startDate}
                max={endDate}
                formats={{ dayHeaderFormat: (date) => moment(date).format('dddd MMMM Do') }}
            />
        </>
    );
};