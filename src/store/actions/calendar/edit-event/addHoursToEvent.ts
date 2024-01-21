import {MyEvent} from "../../../../components/Calendar/CalendarAddons";
import {useDispatch} from "react-redux";

export const addHoursToEvent = (startTime: string, endTime: string, event: MyEvent) => {
    const dispatch = useDispatch();
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

        const updatedEvent = { ...event };
        updatedEvent.start.setHours(startHour, startMinute);
        updatedEvent.end.setHours(endHour, endMinute);
        return updatedEvent;
    }

    return null;
};