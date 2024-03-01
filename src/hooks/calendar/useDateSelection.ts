import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store";
import {calendarsActions} from "../../store/features/calendar/calendar-slice";
import {useNavigate} from "react-router-dom";
import {UserEntity} from "../../constants/types";
import {useState} from "react";

export const useDateSelection = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {users} = useSelector((state: RootState) => state.items);
    const usersList = users as unknown as UserEntity;
    const userId = usersList?.id;

    const initialSelectedDate = localStorage.getItem('selectedDate');
    const [selectedDate, setSelectedDate] = useState<number | null>(initialSelectedDate ? parseInt(initialSelectedDate, 10) : null);

    const handleSelect = ({start}: { start: Date }) => {

        const startTimestamp = start.getTime();
        console.log(startTimestamp)

        dispatch(calendarsActions.selectDate(startTimestamp));
        setSelectedDate(startTimestamp);
        localStorage.setItem('selectedDate', startTimestamp.toString());

        navigate(`/calendar/${userId}/trainings`);
    };

    return {handleSelect, selectedDate};
};