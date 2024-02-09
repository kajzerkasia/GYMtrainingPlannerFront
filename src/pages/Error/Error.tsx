import React from 'react';
import {TbMoodCry} from "react-icons/tb";
import {IconContext} from "react-icons";
import MainNavigation from "../../components/MainNavigation/MainNavigation";
import PageContent from "../../components/PageContent/PageContent";
import {Link, useRouteError} from "react-router-dom";
import classes from './Error.module.css';

interface CustomError {
    status: number;
    data: {
        status: number,
        message: string,
    };
}

export const Error = () => {
    const error = useRouteError();

    const customError: CustomError = error as CustomError;

    let title = "Wystąpił błąd!";
    let message = "Coś poszło nie tak...";

    if (customError.status === 500) {
        message = customError.data.message;
    }

    if (customError.status === 404) {
        title = "Ups... Nic tutaj nie ma.";
        message = "Nie znaleziono strony lub zasobu."
    }

    return (
        <>
            <MainNavigation/>
            <div className={classes.error_container}>
                <PageContent
                    title={title}
                >
                    <h1>{message}</h1>
                    <IconContext.Provider value={{className: `${classes.error_icon}`}}>
                        <TbMoodCry/>
                    </IconContext.Provider>
                </PageContent>
                <Link to='/'>Powrót do strony głównej</Link>
            </div>
        </>
    );
};
