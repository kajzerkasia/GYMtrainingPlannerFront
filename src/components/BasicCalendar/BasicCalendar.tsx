import moment from "moment";
import {Calendar} from "../Calendar/Calendar";
import './BasicCalendar.css';

moment.locale("fr");

export const BasicCalendar = () => {
    const currentDate = new Date();
    const startDate = moment(currentDate).hour(6).minute(0).toDate();
    const endDate = moment(currentDate).hour(23).minute(0).toDate();

    return (
        <Calendar
            defaultView={"month"}
            views={["month", "week", "day"]}
            min={startDate}
            max={endDate}
            formats={{ dayHeaderFormat: (date) => moment(date).format('dddd MMMM Do') }}
        />
    );
}