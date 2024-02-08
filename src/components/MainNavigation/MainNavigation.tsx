import React, {useEffect} from 'react';
import {Form, Link, NavLink, useRouteLoaderData} from "react-router-dom";
import './MainNavigation.css';
import Logo from "../Logo/Logo";
import {useDispatch, useSelector} from "react-redux";
import {fetchUsers} from "../../store/actions/users/fetching-action";
import {RootState} from "../../store";
import {UserEntity} from 'types';

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
        <header className="header">
            <Link to="/">
                <Logo/>
            </Link>
            <nav>
                <ul className="list">
                    <>
                        <li>
                            <NavLink to='/' className={({isActive}) =>
                                isActive ? "active" : undefined
                            }>
                                <button>
                                    Strona główna
                                </button>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={`/list/${userId}`} className={({isActive}) =>
                                isActive ? "active plans" : undefined
                            }>
                                <button onClick={checkIfAuth}>
                                    Plany treningowe
                                </button>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={`/calendar/${userId}`} className={({isActive}) =>
                                isActive ? "active" : undefined
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
                                        isActive ? "active" : undefined
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
                    </>
                </ul>
            </nav>
        </header>
    );
};

export default MainNavigation;