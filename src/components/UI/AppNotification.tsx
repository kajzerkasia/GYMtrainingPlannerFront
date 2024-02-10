import React, {useEffect} from 'react';
import {uiActions} from "../../store/features/ui/ui-slice";
import {useDispatch} from "react-redux";
import classes from './AppNotification.module.css';

const AppNotification = (props: any) => {

    const dispatch = useDispatch();

    let specialClasses = '';

    if (props.status === 'error') {
        specialClasses = `${classes.error}`
    }
    if (props.status === 'success') {
        specialClasses = `${classes.success}`
    }

    const cssClasses = `${classes.notification} ${specialClasses}`;

    useEffect(() => {
        const timeout = setTimeout(() => {
            dispatch(uiActions.hideNotification());
        }, 3000);

        return () => clearTimeout(timeout);
    }, [dispatch]);

    return (
        <section className={cssClasses}>
            <h2>{props.title}</h2>
            <p>{props.message}</p>
        </section>
    );
};

export default AppNotification;