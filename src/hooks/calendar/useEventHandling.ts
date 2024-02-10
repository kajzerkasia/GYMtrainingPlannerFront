import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store";
import {MyEvent} from "../../components/Calendar/CalendarAddons/CalendarAddons";
import {calendarsActions} from "../../store/features/calendar/calendar-slice";
import {UseDateSelection} from "./useDateSelection";

export const UseEventHandling = () => {
    const dispatch = useDispatch();
    const {
        selectedEventId,
    } = useSelector((state: RootState) => state.calendar);

    const {
        selectEvent,
        updateStartTime,
        updateEndTime,
        selectEventId,
        toggleSidebar,
    } = calendarsActions;

    const {unselectDate} = UseDateSelection();

    const handleEventClick = (event: MyEvent) => {
        if (selectedEventId === event.id) {
            dispatch(selectEventId(null));
            dispatch(toggleSidebar(false));
            unselectDate();
        } else {
            dispatch(selectEventId(event.id || null));
            dispatch(updateStartTime(event.startTime));
            dispatch(updateEndTime(event.endTime));
            dispatch(selectEvent(event));
            dispatch(toggleSidebar(true));
        }
    };

    return {
        handleEventClick,
    };
};