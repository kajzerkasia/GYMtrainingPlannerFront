import React from 'react';
import './AppNotification.css';

const AppNotification = (props: any) => {
    let specialClasses = '';

    if (props.status === 'error') {
        specialClasses = "error"
    }
    if (props.status === 'success') {
        specialClasses = "success"
    }

    const cssClasses = `notification ${specialClasses}`;

    return (
        <section className={cssClasses}>
            <h2>{props.title}</h2>
            <p>{props.message}</p>
        </section>
    );
};

export default AppNotification;