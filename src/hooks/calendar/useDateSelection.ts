import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store";
import {calendarsActions} from "../../store/features/calendar/calendar-slice";
import moment from "moment";
import {useNavigate} from "react-router-dom";
import {UserEntity} from "../../constants/types";

export const UseDateSelection = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {selectedDate} = useSelector((state: RootState) => state.calendar);

    const { users } = useSelector((state: RootState) => state.items);
    const usersList = users as unknown as UserEntity;
    const userId = usersList?.id;

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

        navigate(`/calendar/${userId}/trainings`);
    };

    return {unselectDate, handleSelect};
};