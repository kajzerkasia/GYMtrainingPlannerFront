import {MyEvent} from "../../components/Calendar/CalendarAddons";
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

            const updatedEvent: MyEvent = {
                ...event,
                start: event.start instanceof Date
                    ? new Date(event.start.getTime() + (startHour * 60 + startMinute) * 60 * 1000)
                    : event.start + (startHour * 60 + startMinute) * 60 * 1000,
                end: event.end instanceof Date
                    ? new Date(event.end.getTime() + (endHour * 60 + endMinute) * 60 * 1000)
                    : event.end + (endHour * 60 + endMinute) * 60 * 1000,
            };

            return updatedEvent;
        }
        return null;
    };
    return {
        addHoursToEvent,
    };
};

