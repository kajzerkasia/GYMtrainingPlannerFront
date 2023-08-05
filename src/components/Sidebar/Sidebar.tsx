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
        <div className={`sidebar-content ${isOpen ? "open" : ""}`}>
            <h2>Edytuj wydarzenie</h2>
            <div>
                <label htmlFor="startTime">Godzina rozpoczęcia:</label>
                <input
                    type="time"
                    id="startTime"
                    value={startTime}
                    onChange={onStartTimeChange}
                />
            </div>
            <div>
                <label htmlFor="endTime">Godzina zakończenia:</label>
                <input
                    type="time"
                    id="endTime"
                    value={endTime}
                    onChange={onEndTimeChange}
                />
            </div>
            <button onClick={() => onEditEvent(id, {...selectedEvent, start: new Date(selectedEvent.start), end: new Date(selectedEvent.end), startTime, endTime})}>
                Zapisz zmiany
            </button>
            <button onClick={() => onDeleteEvent(id)}>Usuń wydarzenie</button>
            <button onClick={onClose}>Zamknij</button>
        </div>
    );
};




