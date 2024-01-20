import React, {useState} from "react";
import './Calendar.css'
import {BasicCalendar} from "../BasicCalendar/BasicCalendar";
import {Accordion} from "../Accordion/Accordion";
import {DemoSign} from "../DemoSign/DemoSign";
import {TbPlus, TbX, TbPencil} from "react-icons/tb";
import {ADD_TRAINING_INSTRUCTION, DELETE_TRAINING_INSTRUCTION, EDIT_TRAINING_INSTRUCTION} from "../../constants/calendarInstruction";
import CalendarInstructionList from "./CalendarInstructionList";

export const Calendar = () => {

    const [showInstructions, setShowInstructions] = useState(true);

    const toggleInstructions = () => {
        setShowInstructions(!showInstructions);
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
                    <div className="calendar-div">
                        <CalendarInstructionList
                            array={ADD_TRAINING_INSTRUCTION}
                            title="Jak dodać trening do kalendarza?"
                        >
                            <TbPlus/>
                        </CalendarInstructionList>
                        <CalendarInstructionList
                            array={EDIT_TRAINING_INSTRUCTION}
                            title="Jak edytować dodany trening w kalendarzu?"
                        >
                            <TbPencil/>
                        </CalendarInstructionList>
                        <CalendarInstructionList
                            array={DELETE_TRAINING_INSTRUCTION}
                            title="Jak usunąć dany trening z kalendarza?"
                        >
                            <TbX/>
                        </CalendarInstructionList>
                    </div>
                </Accordion>
                <div style={{height: "730px"}} className="div-calendar">
                    <BasicCalendar/>
                </div>
            </div>
        </>
    );
};
