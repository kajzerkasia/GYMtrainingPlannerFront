import React from "react";
import "./Accordion.css";
import {IconContext} from "react-icons";
import {TbQuestionMark} from "react-icons/tb";

type AccordionProps = {
    title?: string;
    isOpen: boolean;
    toggleAccordion: () => void;
    children: React.ReactNode;
};

export const Accordion = ({
                              title,
                              isOpen,
                              toggleAccordion,
                              children,
                          }: AccordionProps) => {
    return (
        <div className="accordion-container">
            <div className="accordion">
                <span className="accordion-title">{title}</span>
                <span className="accordion-icon">
                         <IconContext.Provider value={{className: 'react-icons'}}>
                             <button onClick={toggleAccordion}><TbQuestionMark/></button>
                         </IconContext.Provider>
                </span>
            </div>
            {isOpen && (
                <div className="accordion-content">
                    {children}
                </div>
            )}
        </div>
    );
};