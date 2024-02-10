import React, {useEffect} from 'react';
import MainNavigation from "../components/MainNavigation/MainNavigation";
import {Outlet, useLoaderData, useSubmit} from "react-router-dom";
import {useSelector} from "react-redux";
import AppNotification from "../components/UI/AppNotification";
import {RootState} from "../store";
import {getTokenDuration} from "../helpers/auth";
import classes from './RootLayout.module.css';

const RootLayout = () => {
    const notification = useSelector((state: RootState) => state.ui.notification);

    const token = useLoaderData();
    const submit = useSubmit();

    useEffect(() => {
        if (!token) {
            return;
        }

        if (token === 'EXPIRED') {
            submit(null, {action: '/logout', method: 'post'});
            return;
        }

        const tokenDuration = getTokenDuration();

        setTimeout(() => {
            submit(null, {action: '/logout', method: 'post'});
        }, tokenDuration);
    }, [token, submit]);

    return (
        <div className={classes.root_layout_container}>
            <MainNavigation/>
            <main className={classes.main}>
            <Outlet/>
            {notification && (
                <AppNotification
                    status={notification.status}
                    title={notification.title}
                    message={notification.message}
                />
            )}
            </main>
        </div>
    );
};

export default RootLayout;