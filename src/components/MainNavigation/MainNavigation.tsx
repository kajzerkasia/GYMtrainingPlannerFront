import React, {useEffect, useState} from 'react';
import {Link, useRouteLoaderData} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {fetchUsers} from "../../store/actions/users/fetching-action";
import {RootState} from "../../store";
import classes from './MainNavigation.module.css';
import {UserEntity} from "../../constants/types";
import {Action, ThunkDispatch} from "@reduxjs/toolkit";
import AvatarButton from "../AvatarButton/AvatarButton";
import NavLinkButton from "../NavLinkButton/NavLinkButton";
import Logo from "../Logo/Logo";

interface RouteLoaderData {
    token: string;
    email: string;
}

const MainNavigation = () => {
    const token = useRouteLoaderData('root') as RouteLoaderData;
    const dispatch: ThunkDispatch<RootState, undefined, Action<any>> = useDispatch();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isHamburgerMenuOpen, setIsHamburgerMenuOpen] = useState(false);

    useEffect(() => {
        if (token) {
            dispatch(fetchUsers({ token }));
        }
    }, [dispatch, token]);

    const { users } = useSelector((state: RootState) => state.items);
    const usersList = users as unknown as UserEntity;
    const userId = usersList?.id;

    const toggleHamburger = () => {
        setIsHamburgerMenuOpen(prevState => !prevState);
    }

    const checkIfAuth = () => {
        if (!token) {
            window.location.href = "/auth?mode=login";
        }
        toggleHamburger();
    }

    const toggleDropdown = () => {
        setIsDropdownOpen(prevState => !prevState);
    }

    const toggleDropdownAndHamburger = () => {
        toggleHamburger();
        toggleDropdown();
    }

    let loginButton;

    loginButton = (
        <NavLinkButton to="/auth?mode=login" onClick={toggleDropdownAndHamburger}>
            Logowanie
        </NavLinkButton>
    )

    if (token) loginButton = (
        <AvatarButton
            onClick={toggleDropdown}
            isDropdownOpen={isDropdownOpen}
            isHamburgerMenuOpen={isHamburgerMenuOpen}
        />
    )

    return (
        <header className={classes.header}>
            <div className={classes.logo_and_hamburger_container}>
                <Link to="/">
                    <Logo />
                </Link>
                <div className={`${classes.hamburgerIcon} ${isHamburgerMenuOpen ? classes.hamburgerOpen : ''}`} onClick={toggleHamburger}></div>
            </div>
            <nav className={`${isHamburgerMenuOpen ? classes.navOpen : ''}`}>
                <ul>
                    <NavLinkButton to="/" onClick={toggleHamburger}>
                        Strona główna
                    </NavLinkButton>
                    <NavLinkButton to={`/list/${userId}`} onClick={checkIfAuth}>
                        Plany treningowe
                    </NavLinkButton>
                    <NavLinkButton to={`/calendar/${userId}`} onClick={checkIfAuth}>
                        Kalendarz
                    </NavLinkButton>
                    {loginButton}
                </ul>
            </nav>
        </header>
    );
};
export default MainNavigation;