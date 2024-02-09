import React from "react";
import classes from './Accordion.module.css';
import {IconContext} from "react-icons";
import {TbQuestionMark} from "react-icons/tb";

type AccordionProps = {
    title?: string;
    isOpen: boolean;
    toggleAccordion: () => void;
    children: React.ReactNode;
};

export const Accordion = ({title, isOpen, toggleAccordion, children}: AccordionProps) => {
    return (
        <div className={classes.accordion_container}>
            <div className={classes.accordion}>
                <span className={classes.accordion_title}>{title}</span>
                <span className={classes.accordion_icon}>
                         <IconContext.Provider value={{className: 'react-icons'}}>
                             <button
                                 onClick={toggleAccordion}
                                 className={classes.accordion_button}>
                                 <TbQuestionMark/>
                             </button>
                         </IconContext.Provider>
                </span>
            </div>
            <div
                className={`${classes.accordion_content} 
                    ${isOpen ? `${classes.open}` : `${classes.closed}`}
                    `}
            >
                {children}
            </div>
        </div>
    );
};