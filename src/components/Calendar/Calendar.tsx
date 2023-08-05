import {
    Calendar as BigCalendar,
    CalendarProps,
    momentLocalizer,
} from 'react-big-calendar';
import moment from 'moment';
import {MyEvent} from "../BasicCalendar/BasicCalendar";
import React from "react";

export interface CalendarPropsWithMyEvents extends Omit<CalendarProps<MyEvent>, 'localizer'> {}

const localizer = momentLocalizer(moment)

export const Calendar: React.FC<CalendarPropsWithMyEvents> = (props) => {
    return <BigCalendar {...props} localizer={localizer} />;
}
