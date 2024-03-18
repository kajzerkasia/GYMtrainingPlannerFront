import React from 'react';
import classes from "./LogoutButton.module.css";
import LogoutForm from "../LogoutForm/LogoutForm";

interface LogoutButtonProps {
    isDropdownOpen: boolean;
    onClick: () => void;
}

const LogoutButton = ({isDropdownOpen, onClick}: LogoutButtonProps) => {

    return (
        <>
            <div className={`${classes.dropdownMenu} ${isDropdownOpen ? classes.open : classes.close}`}>
                <LogoutForm
                    onClick={onClick}
                />
            </div>
            <LogoutForm
                onClick={onClick}
                className={classes.mobile_only_form}
            />
        </>
    );
};

export default LogoutButton;