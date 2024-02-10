import React, {useEffect} from 'react';
import {Form, Link, NavLink, useRouteLoaderData} from "react-router-dom";
import Logo from "../Logo/Logo";
import {useDispatch, useSelector} from "react-redux";
import {fetchUsers} from "../../store/actions/users/fetching-action";
import {RootState} from "../../store";
import classes from './MainNavigation.module.css';
import {UserEntity} from "../../constants/types";

const MainNavigation = () => {
    const token: any = useRouteLoaderData('root');
    const dispatch = useDispatch();

    useEffect(() => {
        if (token) {
            dispatch(fetchUsers({token}) as any);
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

    return (
        <header className={classes.header}>
            <Link to="/">
                <Logo/>
            </Link>
            <nav>
                <ul>
                    <li>
                        <NavLink to='/' className={({isActive}) =>
                            isActive ? `${classes.active}` : undefined
                        }>
                            <button>
                                Strona główna
                            </button>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to={`/list/${userId}`} className={({isActive}) =>
                            isActive ? `${classes.active}` : undefined
                        }>
                            <button onClick={checkIfAuth}>
                                Plany treningowe
                            </button>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to={`/calendar/${userId}`} className={({isActive}) =>
                            isActive ? `${classes.active}` : undefined
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
                                    isActive ? `${classes.active}` : undefined
                                }
                            >
                                <button>
                                    Logowanie
                                </button>
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
                </ul>
            </nav>
        </header>
    );
};

export default MainNavigation;