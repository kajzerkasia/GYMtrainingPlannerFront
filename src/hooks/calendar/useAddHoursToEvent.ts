import {MyEvent} from "../../components/Calendar/CalendarAddons/CalendarAddons";
import {useDispatch} from "react-redux";
import {calendarsActions} from "../../store/features/calendar/calendar-slice";

export const UseAddHoursToEvent = () => {

    const dispatch = useDispatch();

    const {
        updateTimeError,
    } = calendarsActions;

    const addHoursToEvent = (startTime: string, endTime: string, event: MyEvent) => {
        if (startTime && endTime) {
            const startHour = Number(startTime.split(":")[0]);
            const startMinute = Number(startTime.split(":")[1]);
            const endHour = Number(endTime.split(":")[0]);
            const endMinute = Number(endTime.split(":")[1]);

            if (startHour > endHour || (startHour === endHour && startMinute >= endMinute)) {
                dispatch(updateTimeError("Godzina rozpoczęcia nie może być późniejsza lub równa godzinie zakończenia."));
                return null;
            } else {
                dispatch(updateTimeError(null));
            }

            const updatedEvent = {...event};
            const newStart = new Date(updatedEvent.start);
            newStart.setHours(startHour, startMinute);
            updatedEvent.start = newStart;

            const newEnd = new Date(updatedEvent.end);
            newEnd.setHours(endHour, endMinute);
            updatedEvent.end = newEnd;

            return updatedEvent;
        }
        return null;
    };
    return {
        addHoursToEvent,
    };
};

