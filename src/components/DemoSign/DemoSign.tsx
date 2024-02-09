import React, { useState } from 'react';
import { isDemoEnabled } from '../../helpers/env';
import { IconContext } from 'react-icons';
import { TbAlertTriangle } from 'react-icons/tb';
import classes from './DemoSign.module.css';

export const DemoSign = () => {
    const [showDemoText, setShowDemoText] = useState(true);

    const handleDemoButtonClick = () => {
        setShowDemoText(!showDemoText);
    };

    return (
        <>
            {isDemoEnabled() && (
                <div className={classes.div_demo}>
                    <IconContext.Provider value={{ className: `${classes.react_warning_icon}` }}>
                        <button
                            className={classes.demo_button}
                            onClick={handleDemoButtonClick}
                        >
                            <TbAlertTriangle/>
                            Wersja demo
                        </button>
                    </IconContext.Provider>
                    <div className={`${classes.demo_text} ${showDemoText ? `${classes.show}` : ''}`}>
                        - brak możliwości dodawania, edytowania oraz usuwania wybranych elementów
                    </div>
                </div>
            )}
        </>
    );
};