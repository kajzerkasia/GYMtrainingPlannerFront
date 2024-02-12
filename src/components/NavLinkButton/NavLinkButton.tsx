import React from 'react';
import { NavLink } from 'react-router-dom';
import classes from './NavLinkButton.module.css';

const NavLinkButton = ({ to, onClick, children }: any) => {
    return (
        <NavLink to={to} className={({isActive}) =>
            isActive ? `${classes.active} ${classes.buttonWithAnimation}` : classes.buttonWithAnimation
        }>
            <button onClick={onClick}>
                {children}
            </button>
        </NavLink>
    );
};

export default NavLinkButton;