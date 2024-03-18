import React from 'react';
import {useSelector} from "react-redux";
import {RootState} from "../../../store";

interface HeaderProps {
    headerText: string;
}

const Header = ({headerText}: HeaderProps) => {

    const {
        isDemoMode
    } = useSelector((state: RootState) => state.calendar);

    return (
        <h1>{isDemoMode ? "Tryb demo: Dodawanie wydarzenia wyłączone" : `${headerText}`}</h1>
    );
};

export {Header};