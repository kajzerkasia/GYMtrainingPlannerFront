import React, {useState} from "react";
import './Calendar.css'
import {CalendarAddons} from "./CalendarAddons";
import {Accordion} from "../Accordion/Accordion";
import {DemoSign} from "../DemoSign/DemoSign";
import CalendarInstruction from "./CalendarInstruction";

export const Calendar = () => {

    const [showInstructions, setShowInstructions] = useState(false);

    const toggleInstructions = () => {
        setShowInstructions(prevShowInstructions => !prevShowInstructions);
    };

    return (
        <>
            <div className="div-calendar-info">
                <Accordion
                    title="Kalendarz"
                    isOpen={showInstructions}
                    toggleAccordion={toggleInstructions}
                >
                    <DemoSign/>
                    <CalendarInstruction
                        toggleAccordion={toggleInstructions}
                    />
                </Accordion>
                <div style={{height: "730px"}} className="div-calendar">
                    <CalendarAddons/>
                </div>
            </div>
        </>
    );
};
