import React, {useEffect} from 'react';
import MainNavigation from "../components/MainNavigation/MainNavigation";
import {Outlet, useLoaderData, useSubmit} from "react-router-dom";
import {useSelector} from "react-redux";
import AppNotification from "../components/UI/AppNotification";
import {RootState} from "../store";
import {getTokenDuration} from "../helpers/auth";

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
        console.log(tokenDuration);

        setTimeout(() => {
            submit(null, {action: '/logout', method: 'post'});
        }, tokenDuration);
    }, [token, submit]);

    return (
        <>
            <MainNavigation/>
            {notification && (
                <AppNotification
                    status={notification.status}
                    title={notification.title}
                    message={notification.message}
                />
            )}
            <Outlet/>
        </>
    );
};

export default RootLayout;