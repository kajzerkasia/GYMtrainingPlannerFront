import React from 'react';
import {Form} from "react-router-dom";
import classes from './AvatarButton.module.css';
import {useSelector} from "react-redux";
import {RootState} from "../../store";
import {UserEntity} from "../../constants/types";

interface AvatarButtonProps {
    onClick: () => void;
    isDropdownOpen: boolean;
    isHamburgerMenuOpen: boolean;
}


const AvatarButton = ({ onClick, isDropdownOpen, isHamburgerMenuOpen }: AvatarButtonProps) => {
    const { users } = useSelector((state: RootState) => state.items);
    const usersList = users as unknown as UserEntity;
    const userImage = usersList?.image;

    return (
        <>
            <button onClick={onClick} className={classes.button_avatar}>
                <img src={`/assets/images/${userImage}`} alt="Avatar" className={classes.avatar_img} />
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