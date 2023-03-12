import * as React from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import './Callendar.css'

export const Calendar = () => {
    return (
        <div className="calendar">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateCalendar/>
        </LocalizationProvider>
        </div>
    );
}
