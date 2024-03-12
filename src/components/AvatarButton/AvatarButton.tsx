import React from 'react';
import classes from './AvatarButton.module.css';
import {useSelector} from "react-redux";
import {RootState} from "../../store";
import {UserEntity} from "../../constants/types";
import {TbPlayerPlay} from "react-icons/tb";
import IconProvider from "../IconProvider/IconProvider";
import LogoutButton from "../LogoutButton/LogoutButton";

interface AvatarButtonProps {
    onClick: () => void;
    isDropdownOpen: boolean;
}


const AvatarButton = ({onClick, isDropdownOpen}: AvatarButtonProps) => {
    const {users} = useSelector((state: RootState) => state.items);
    const usersList = users as unknown as UserEntity;
    const userImage = usersList?.image;

    return (
        <>
            <div className={classes.avatar_container}>
                <button onClick={onClick} className={classes.button_avatar}>
                    <img src={`http://localhost:3001/public/${userImage}`} alt="Avatar" className={classes.avatar_img}/>
                </button>
                <button onClick={onClick} className={classes.button_dots}>
                    <IconProvider>
                        <TbPlayerPlay/>
                    </IconProvider>
                </button>
            </div>
            <LogoutButton
                isDropdownOpen={isDropdownOpen}
            />
        </>
    );
};

export default AvatarButton;