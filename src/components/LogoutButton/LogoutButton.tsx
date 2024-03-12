import React from 'react';
import classes from "./LogoutButton.module.css";
import {Form} from "react-router-dom";
import Button from "../Button/Button";

interface LogoutButtonProps {
    isDropdownOpen: boolean;
    onClick: () => void;
}

const LogoutButton = ({isDropdownOpen, onClick}: LogoutButtonProps) => {

    const handleClick = () => {
        onClick();
    };

    return (
        <>
            {isDropdownOpen ? (
                <div className={`${classes.dropdownMenu} ${classes.open}`}>
                    <Form
                        action="/logout"
                        method="post"
                        onSubmit={handleClick}
                    >
                        <Button>
                            Wyloguj się
                        </Button>
                    </Form>
                </div>
            ) : (
                <Form
                    action="/logout"
                    method="post"
                    className={classes.mobile_only_form}
                    onSubmit={handleClick}
                >
                    <button>
                        Wyloguj się
                    </button>
                </Form>
            )}
        </>
    );
};

export default LogoutButton;