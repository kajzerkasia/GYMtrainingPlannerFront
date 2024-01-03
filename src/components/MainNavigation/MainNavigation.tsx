import React from 'react';
import {Link} from "react-router-dom";
import './MainNavigation.css';
import Logo from "../Logo/Logo";

const MainNavigation = () => {
    return (
        <header className="header">
            <Logo/>
            <nav>
                <ul className="list">
                    <li><Link to="/list">Plany treningowe</Link></li>
                    <li><Link to="/">Kalendarz</Link></li>
                </ul>
            </nav>
        </header>
    );
};

export default MainNavigation;