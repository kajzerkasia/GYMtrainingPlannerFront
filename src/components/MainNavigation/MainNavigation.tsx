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
            dispatch(fetchUsers({ token }) as any);
        }
    }, [dispatch, token]);

    const { users } = useSelector((state: RootState) => state.items);
    const usersList = users as unknown as UserEntity;
    const slug = usersList?.slug;

    return (
        <header className="header">
            <Link to="/">
                <Logo/>
            </Link>
            <nav>
                <ul className="list">
                    <>
                        <li>
                            <NavLink to={`${!token ? `/auth?mode=login` : `/list/${slug}`}`} className={({isActive}) =>
                                isActive ? "active" : undefined
                            }>
                                Plany treningowe
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={`${!token ? `/auth?mode=login` : `/calendar`}`} className={({isActive}) =>
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