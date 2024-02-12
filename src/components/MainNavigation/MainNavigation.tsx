import React, {useEffect, useState} from 'react';
import {Form, Link, NavLink, useRouteLoaderData} from "react-router-dom";
import Logo from "../Logo/Logo";
import {useDispatch, useSelector} from "react-redux";
import {fetchUsers} from "../../store/actions/users/fetching-action";
import {RootState} from "../../store";
import classes from './MainNavigation.module.css';
import {UserEntity} from "../../constants/types";
import {Action, ThunkDispatch} from "@reduxjs/toolkit";

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
            dispatch(fetchUsers({token}));
        }
    }, [dispatch, token]);

    const {users} = useSelector((state: RootState) => state.items);
    const usersList = users as unknown as UserEntity;
    const userId = usersList?.id;

    const checkIfAuth = () => {
        if (!token) {
            window.location.href = "/auth?mode=login";
        }
    }

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    }

    const toggleHamburger = () => {
        setIsHamburgerMenuOpen(!isHamburgerMenuOpen);
    }


    return (
        <header className={classes.header}>
            <div className={classes.logo_and_hamburger_container}>
                <Link to="/">
                    <Logo/>
                </Link>
                <div className={`${classes.hamburgerIcon} ${isHamburgerMenuOpen ? classes.hamburgerOpen : ''}`} onClick={toggleHamburger}></div>
            </div>
            <nav className={`${isHamburgerMenuOpen ? classes.navOpen : ''}`}>
                <ul>
                    <li>
                        <NavLink to='/' className={({isActive}) =>
                            isActive ? `${classes.active} ${classes.buttonWithAnimation}` : classes.buttonWithAnimation
                        }>
                            <button>
                                Strona główna
                            </button>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to={`/list/${userId}`} className={({isActive}) =>
                            isActive ? `${classes.active} ${classes.buttonWithAnimation}` : classes.buttonWithAnimation
                        }>
                            <button onClick={checkIfAuth}>
                                Plany treningowe
                            </button>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to={`/calendar/${userId}`} className={({isActive}) =>
                            isActive ? `${classes.active} ${classes.buttonWithAnimation}` : classes.buttonWithAnimation
                        }>
                            <button onClick={checkIfAuth}>
                                Kalendarz
                            </button>
                        </NavLink>
                    </li>
                    {!token && (
                        <li>
                            <NavLink
                                to="/auth?mode=login"
                                className={({isActive}) =>
                                    isActive ? `${classes.active} ${classes.buttonWithAnimation}` : classes.buttonWithAnimation
                                }>
                                <button>
                                    Logowanie
                                </button>
                            </NavLink>
                        </li>
                    )}
                    {token && (
                        <li className={isHamburgerMenuOpen ? classes.hamburgerOpen : classes.hamburgerClose}>
                            <button onClick={toggleDropdown} className={classes.button_avatar}>
                                <img src="/assets/images/avatar_man.png" alt="" className={classes.avatar_img}/>
                            </button>
                            {isDropdownOpen && (
                                <div className={`${classes.dropdownMenu} ${isDropdownOpen ? classes.open : ''}`}>
                                    <Form action="/logout" method="post">
                                        <button>
                                            Wyloguj się
                                        </button>
                                    </Form>
                                </div>
                            )}
                            {isHamburgerMenuOpen && (
                                <Form action="/logout" method="post">
                                    <button className={classes.logout_button}>
                                        Wyloguj się
                                    </button>
                                </Form>
                            )}
                        </li>
                    )}
                </ul>
            </nav>
        </header>
    );
};

export default MainNavigation;