import React from 'react';
import ImagesSlideshow from "../components/images/ImagesSlideshow";
import './Home.css';
import {useSelector} from "react-redux";
import {RootState} from "../store";
import {UserEntity} from 'types';
import {useRouteLoaderData} from "react-router-dom";

const Home = () => {
    const token: any = useRouteLoaderData('root');

    const { users } = useSelector((state: RootState) => state.items);
    const usersList = users as unknown as UserEntity;
    const userName = usersList?.name;

    return (
        <div>
            <div className="home-container">
                <header className="home-header">
                    <h1>Witaj{userName ? ` ${userName}!` : ' w aplikacji Gym Training Planner'}</h1>
                    {token ? (
                        <p>Już teraz zarządzaj swoimi planami treningowymi</p>
                    ) : (
                        <p>Zaloguj się lub zarejestruj aby zarządzać planami treningowymi</p>
                    )}
                </header>
                <div className="slideshow">
                    <ImagesSlideshow/>
                </div>
            </div>
        </div>
    );
};

export default Home;