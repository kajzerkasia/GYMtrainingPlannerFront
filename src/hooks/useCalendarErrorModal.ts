import {useState} from 'react';

export const useCalendarErrorModal = () => {
    const [calendarErrorModalIsOpen, setCalendarErrorModalIsOpen] = useState<boolean>(false);

       const closeCalendarErrorModal = () => {
           setCalendarErrorModalIsOpen(false);
       };

       const openCalendarErrorModal = () => {
           setCalendarErrorModalIsOpen(true);
       }

    return {
        calendarErrorModalIsOpen,
        setCalendarErrorModalIsOpen,
        closeCalendarErrorModal,
        openCalendarErrorModal
    };
};