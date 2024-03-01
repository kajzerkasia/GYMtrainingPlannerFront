import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store";
import {MyEvent} from "../../components/Calendar/CalendarAddons/CalendarAddons";
import {calendarsActions} from "../../store/features/calendar/calendar-slice";
import {useNavigate} from "react-router-dom";
import {UserEntity} from "../../constants/types";

export const useEventHandling = () => {
    const dispatch = useDispatch();
    const {
        selectedEventId,
    } = useSelector((state: RootState) => state.calendar);

    const navigate = useNavigate();

    const { users } = useSelector((state: RootState) => state.items);
    const usersList = users as unknown as UserEntity;
    const userId = usersList?.id;

    const {
        selectEvent,
        updateStartTime,
        updateEndTime,
        selectEventId,
    } = calendarsActions;

    const handleEventClick = (event: MyEvent) => {
        if (selectedEventId === event.id) {
            dispatch(selectEventId(null));
            navigate(`/calendar/${userId}/trainings`);

        } else {
            dispatch(selectEventId(event.id || null));
            dispatch(updateStartTime(event.startTime));
            dispatch(updateEndTime(event.endTime));
            dispatch(selectEvent(event));
        }
    };

    return {
        handleEventClick,
    };
};