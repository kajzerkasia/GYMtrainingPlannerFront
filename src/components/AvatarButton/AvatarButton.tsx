import React from 'react';
import {Form} from "react-router-dom";
import classes from './AvatarButton.module.css';

interface AvatarButtonProps {
    onClick: () => void;
    isDropdownOpen: boolean;
    isHamburgerMenuOpen: boolean;
}

const AvatarButton = ({ onClick, isDropdownOpen, isHamburgerMenuOpen }: AvatarButtonProps) => {
    return (
        <>
            <button onClick={onClick} className={classes.button_avatar}>
                <img src="/assets/images/avatar_man.png" alt="Avatar" className={classes.avatar_img} />
            </button>
            {isDropdownOpen && (
                <div className={`${classes.dropdownMenu} ${isDropdownOpen ? classes.open : ''}`}>
                    <Form action="/logout" method="post">
                        <button>
                            Wyloguj się
                        </button>
                    </Form>
                </div>
            )}
            {isHamburgerMenuOpen && (
                <Form action="/logout" method="post" className={classes.mobile_only_form}>
                    <button>
                        Wyloguj się
                    </button>
                </Form>
            )}
        </>
    );
};

export default AvatarButton;