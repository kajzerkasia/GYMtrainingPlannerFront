import React from "react";
import "./Accordion.css";

type AccordionProps = {
    title: string;
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
                <div className="accordion-header" onClick={toggleAccordion}>
                    <span className="accordion-title">{title}</span>
                    <span className="accordion-icon">
                        {isOpen ? "▲" : "▼"}
                    </span>
                </div>
                {isOpen && (
                    <div className="accordion-content">
                        {children}
                    </div>
                )}
            </div>
        </div>
    );
};