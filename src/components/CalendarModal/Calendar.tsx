import React, {useState} from "react";
import './Calendar.css'
import {BasicCalendar} from "../BasicCalendar/BasicCalendar";
import {Accordion} from "../Accordion/Accordion";
import {DemoSign} from "../DemoSign/DemoSign";

export const Calendar = () => {

    const [showInstructions, setShowInstructions] = useState(true);

    const toggleInstructions = () => {
        setShowInstructions(!showInstructions);
    };

    return (
        <>
            <div className="div-calendar-info">
                <Accordion
                    title="Jak to działa?"
                    isOpen={showInstructions}
                    toggleAccordion={toggleInstructions}
                >
                    <DemoSign/>
                    <p>Kliknij w dany dzień, a następnie wybierz plan treningowy, część planu oraz planowaną godzinę ropoczęcia i zakończenia treningu. Zawsze możesz edytować dany trening klikając w niego i zmieniając jego godziny. Klikając ponownie w dany dzień bez treningu lub w istniejący trening zamykasz okno dodawnia/edytowania treningu.</p>
                </Accordion>
            </div>
            <div style={{height: "730px"}} className="div-calendar">
                <BasicCalendar/>
            </div>
            <div className="div-btn-back-container">
                <button className="btn-back">Powrót</button>
            </div>
        </>
    );
};
