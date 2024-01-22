import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store";
import {calendarsActions} from "../../store/features/calendar/calendar-slice";
import moment from "moment";

export const UseDateSelection = () => {
    const dispatch = useDispatch();
    const {selectedDate} = useSelector((state: RootState) => state.calendar);

    const unselectDate = () => {
        dispatch(calendarsActions.selectDate(null));
    };

    const handleSelect = ({start}: { start: Date }) => {

        const startTimestamp = start.getTime();

        const isSameDate = selectedDate ? moment(selectedDate).isSame(start, 'day') : false;

        if (isSameDate) {
            dispatch(calendarsActions.selectDate(null));
            dispatch(calendarsActions.toggleAddTrainingToCalendar(false));
        } else {
            dispatch(calendarsActions.selectDate(startTimestamp));
            dispatch(calendarsActions.toggleAddTrainingToCalendar(true));
        }
    };

    return {unselectDate, handleSelect};
};