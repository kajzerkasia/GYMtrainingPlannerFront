import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import moment from "moment/moment";
import {POLISH_MONTH_NAMES} from "../../constants/polishMonthNames";
import {useFetchTrainingsData} from "./useFetchTrainingsData";

export const useCalendarEvents = () => {
    const params = useParams();

    const [formattedDate, setFormattedDate] = useState('');

    const storedSelectedDate = localStorage.getItem('selectedDate');
    const selectedDate = storedSelectedDate ? parseInt(storedSelectedDate, 10) : null;

    useEffect(() => {
        const selectedMonth = moment(selectedDate).month();
        const selectedYear = moment(selectedDate).year();

        const formattedDate = `${moment(selectedDate).format('D')} ${POLISH_MONTH_NAMES[selectedMonth]} ${selectedYear}`;

        setFormattedDate(formattedDate);
    }, [selectedDate]);


    const {fetchTrainingsData} = useFetchTrainingsData();

    fetchTrainingsData(params);
    return {
        formattedDate,
        selectedDate,
    }
};