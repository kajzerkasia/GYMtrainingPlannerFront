import React from 'react';
import {Form, Link, NavLink, useRouteLoaderData} from "react-router-dom";
import './MainNavigation.css';
import Logo from "../Logo/Logo";

const MainNavigation = () => {
    const token = useRouteLoaderData('root');

    return (
        <header className="header">
            <Link to="/">
                <Logo/>
            </Link>
            <nav>
                <ul className="list">
                    <>
                        <li>
                            <NavLink to="/list" className={({isActive}) =>
                                isActive ? "active" : undefined
                            }>
                                Plany treningowe
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/calendar" className={({isActive}) =>
                                isActive ? "active" : undefined
                            }>
                                Kalendarz
                            </NavLink>
                        </li>
                        {!token && (
                            <li>
                                <NavLink
                                    to="/auth?mode=login"
                                    className={({isActive}) =>
                                        isActive ? "active" : undefined
                                    }
                                >
                                    Logowanie
                                </NavLink>
                            </li>
                        )}
                        {token && (
                            <li>
                                <Form action="/logout" method="post">
                                    <button>Wyloguj się</button>
                                </Form>
                            </li>
                        )}
                    </>
                </ul>
            </nav>
        </header>
    );
};

export default MainNavigation;