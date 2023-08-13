import React, { useState } from 'react';
import { isDemoEnabled } from '../../helpers/env';
import './DemoSign.css';
import { IconContext } from 'react-icons';
import { TbAlertTriangle } from 'react-icons/tb';

export const DemoSign = () => {
    const [showDemoText, setShowDemoText] = useState(false);

    const handleDemoButtonClick = () => {
        setShowDemoText(!showDemoText);
    };

    return (
        <>
            {isDemoEnabled() && (
                <div className="div-demo">
                    <IconContext.Provider value={{ className: 'react-triangle-icon' }}>
                        <button className="demo-button" onClick={handleDemoButtonClick}>
                            <TbAlertTriangle/>
                            Wersja demo
                        </button>
                    </IconContext.Provider>
                    <div className={`demo-text ${showDemoText ? 'show' : ''}`}>
                        - brak możliwości dodawania, edytowania oraz usuwania wybranych elementów
                    </div>
                </div>
            )}
        </>
    );
};