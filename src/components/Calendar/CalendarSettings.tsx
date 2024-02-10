import {
    Calendar as BigCalendar,
    CalendarProps,
    momentLocalizer,
} from 'react-big-calendar';
import moment from 'moment';
import {MyEvent} from "./CalendarAddons/CalendarAddons";
import React from "react";

moment.locale('pl', {
    week: {
        dow: 1,
        doy: 1,
    },
});

moment.updateLocale('pl', {
    weekdaysShort: ['Niedziela', 'Poniedziałek', 'Wtorek', 'Środa', 'Czwartek', 'Piątek', 'Sobota'],
});

export interface CalendarPropsWithMyEvents extends Omit<CalendarProps<MyEvent>, 'localizer'> {}

const localizer = momentLocalizer(moment)

export const CalendarSettings: React.FC<CalendarPropsWithMyEvents> = (props) => {

    return <BigCalendar {...props} localizer={localizer} />;
}
