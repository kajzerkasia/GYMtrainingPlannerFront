import React, {useEffect, useState} from 'react';
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
    const [menuOpen, setMenuOpen] = useState(false);

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

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    }


    return (
        <header className={classes.header}>
            <Link to="/">
                <Logo/>
            </Link>
            <nav>
                <ul className={classes.navList}>
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
                        <li>
                            <button onClick={toggleMenu} className={classes.button_avatar}>
                                <img src="/assets/images/avatar_man.png" alt="" className={classes.avatar_img}/>
                            </button>
                            {menuOpen && (
                                <div className={classes.dropdownMenu}>
                                    <Form action="/logout" method="post">
                                        <button>
                                            Wyloguj się
                                        </button>
                                    </Form>
                                </div>
                            )}
                        </li>
                    )}
                </ul>
            </nav>
        </header>
    );
};

export default MainNavigation;