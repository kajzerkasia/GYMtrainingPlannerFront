import React from 'react';
import ImagesSlideshow from "../../components/ImagesSlideshow/ImagesSlideshow";
import {useSelector} from "react-redux";
import {RootState} from "../../store";
import {useRouteLoaderData} from "react-router-dom";
import classes from './Home.module.css';
import {UserEntity} from "../../constants/types";

const Home = () => {
    const token: any = useRouteLoaderData('root');

    const { users } = useSelector((state: RootState) => state.items);
    const usersList = users as unknown as UserEntity;
    const userName = usersList?.name;

    return (
            <div className={classes.div_home_container}>
                <header className={classes.home_header}>
                    <h1 className={classes.home_h1}>Witaj{(token && userName) ? ` ${userName}!` : ' w aplikacji Gym Training Planner'}</h1>
                    {token ? (
                        <p>Już teraz zarządzaj swoimi planami treningowymi</p>
                    ) : (
                        <p>Zaloguj się lub zarejestruj aby zarządzać planami treningowymi</p>
                    )}
                </header>
                <div className={classes.slideshow}>
                    <ImagesSlideshow/>
                </div>
            </div>
    );
};

export default Home;