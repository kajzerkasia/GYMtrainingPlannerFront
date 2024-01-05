import React from 'react';
import {GoBack} from "../../components/GoBack/GoBack";
import {TbMoodCry} from "react-icons/tb";
import {IconContext} from "react-icons";
import MainNavigation from "../../components/MainNavigation/MainNavigation";
import PageContent from "../../components/PageContent/PageContent";
import {useRouteError} from "react-router-dom";
import './Error.css';

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
        title = "Nie znaleziono strony lub zasobu.";
        message = "Ups... Nic tutaj nie ma."
    }

    return (
        <>
            <MainNavigation/>
            <div className="error-container">
                <PageContent
                    title={title}
                >
                    <h1>{message}</h1>
                    <IconContext.Provider value={{className: 'react-icons-cry'}}>
                        <TbMoodCry/>
                    </IconContext.Provider>
                </PageContent>
                <GoBack to='list' text="Powrót do strony głównej"/>
            </div>
        </>
    );
};
