import {MyEvent} from "../BasicCalendar/BasicCalendar";
import React from "react";
import './Sidebar.css';

interface SidebarProps {
    id: string;
    isOpen: boolean;
    onClose: () => void;
    selectedEvent: MyEvent | null;
    onEditEvent: (id: string, eventToUpdate: MyEvent) => Promise<void>;
    onDeleteEvent: (id: string) => Promise<void>;
    startTime: string;
    endTime: string;
    onStartTimeChange: React.ChangeEventHandler<HTMLInputElement>;
    onEndTimeChange: React.ChangeEventHandler<HTMLInputElement>;
}

export const Sidebar: React.FC<SidebarProps> = ({
                                                    id,
                                                    isOpen,
                                                    onClose,
                                                    selectedEvent,
                                                    onEditEvent,
                                                    onDeleteEvent,
                                                    startTime,
                                                    endTime,
                                                    onStartTimeChange,
                                                    onEndTimeChange,
                                                }) => {
    if (!isOpen || !selectedEvent) {
        return null;
    }

    return (
        <div className={`sidebar-container ${isOpen ? "open" : ""}`}>
            <h1>Edytuj trening</h1>
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
                onClick={() => onEditEvent(id, {...selectedEvent, start: new Date(selectedEvent.start), end: new Date(selectedEvent.end), startTime, endTime})}>
                Zapisz zmiany
            </button>
            <button
                className="sidebar-button"
                onClick={() => onDeleteEvent(id)}>Usuń wydarzenie
            </button>
            <button
                className="sidebar-button"
                onClick={onClose}>Zamknij</button>
        </div>
    );
};




