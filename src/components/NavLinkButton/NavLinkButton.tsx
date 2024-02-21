import React, {ReactNode} from 'react';
import { NavLink } from 'react-router-dom';
import classes from './NavLinkButton.module.css';

interface NavLinkButtonProps {
    to: string;
    onClick: () => void;
    children: ReactNode;
}

const NavLinkButton = ({ to, onClick, children }: NavLinkButtonProps) => {
    return (
        <NavLink to={to} className={({isActive}) =>
            isActive ? `${classes.active} ${classes.buttonWithAnimation}` : classes.buttonWithAnimation
        }>
            <button onClick={onClick} className={classes.button}>
                {children}
            </button>
        </NavLink>
    );
};

export default NavLinkButton;