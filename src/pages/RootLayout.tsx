import React from 'react';
import MainNavigation from "../components/MainNavigation/MainNavigation";
import {Outlet} from "react-router-dom";
import {useSelector} from "react-redux";
import AppNotification from "../components/UI/AppNotification";
import {RootState} from "../store";

const RootLayout = () => {
    const notification = useSelector((state: RootState) => state.ui.notification);

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