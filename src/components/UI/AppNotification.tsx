import React, {useEffect} from 'react';
import './AppNotification.css';
import {uiActions} from "../../store/features/ui/ui-slice";
import {useDispatch} from "react-redux";

const AppNotification = (props: any) => {

    const dispatch = useDispatch();

    let specialClasses = '';

    if (props.status === 'error') {
        specialClasses = "error"
    }
    if (props.status === 'success') {
        specialClasses = "success"
    }

    const cssClasses = `notification ${specialClasses}`;

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