import React, {ReactNode} from 'react';
import classes from "./EventOrderMarker.module.css";

interface EventOrderMarkerProps {
    children: ReactNode;
}

const EventOrderMarker = ({children}: EventOrderMarkerProps) => {
    return (
        <div className={classes.round}>
            <p>
                {children}
            </p>
        </div>
    );
};

export default EventOrderMarker;