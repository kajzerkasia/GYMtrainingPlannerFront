import {MyEvent} from "../BasicCalendar/BasicCalendar";
import React from "react";
import './Sidebar.css';

interface SidebarProps {
    id: string;
    isOpen: boolean;
    selectedEvent: MyEvent | null;
    onEditEvent: (id: string, eventToUpdate: MyEvent) => Promise<void>;
    onDeleteEvent: (id: string) => Promise<void>;
    startTime: string;
    endTime: string;
    onStartTimeChange: React.ChangeEventHandler<HTMLInputElement>;
    onEndTimeChange: React.ChangeEventHandler<HTMLInputElement>;
    isDemoMode: boolean;
    setIsDemoMode: (value: boolean) => void;
    timeError: any;
}

export const Sidebar: React.FC<SidebarProps> = ({
                                                    id,
                                                    isOpen,
                                                    selectedEvent,
                                                    onEditEvent,
                                                    onDeleteEvent,
                                                    startTime,
                                                    endTime,
                                                    onStartTimeChange,
                                                    onEndTimeChange,
                                                    isDemoMode,
                                                    setIsDemoMode,
                                                    timeError,
                                                }) => {

    if (!isOpen || !selectedEvent || id !== selectedEvent.id) {
        return null;
    }

    return (
        <div className={`sidebar-container ${isOpen ? "open" : ""}`}>
            <h1>{isDemoMode ? "Tryb demo: Edycja wydarzenia wyłączona" : "Edytuj trening"}</h1>
            {timeError && <div className="error"><p>{timeError}</p></div>}
            <label
                className="label-date"
                htmlFor="startTime"
            >Godzina rozpoczęcia
            </label>
            <input
                className="input-date"
                type="time"
                id="startTime"
                value={startTime}
                onChange={onStartTimeChange}
            />
            <label
                className="label-date"
                htmlFor="endTime"
            >Godzina zakończenia
            </label>
            <input
                className="input-date"
                type="time"
                id="endTime"
                value={endTime}
                onChange={onEndTimeChange}
            />
            <button
                className="sidebar-button"
                onClick={() => {
                    if (isDemoMode) {
                        setIsDemoMode(true);
                    } else {
                        onEditEvent(id, {
                            ...selectedEvent,
                            start: new Date(selectedEvent.start),
                            end: new Date(selectedEvent.end),
                            startTime,
                            endTime,
                        });
                    }
                }}
            >
                Zapisz zmiany
            </button>
            <button
                className="sidebar-button"
                onClick={() => {
                    if (!isDemoMode) {
                        onDeleteEvent(id);
                    }
                }}
            >
                Usuń trening
            </button>
        </div>
    );
};




