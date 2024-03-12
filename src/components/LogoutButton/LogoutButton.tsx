import React from 'react';
import classes from "./LogoutButton.module.css";
import {Form} from "react-router-dom";
import Button from "../Button/Button";

interface LogoutButtonProps {
    isDropdownOpen: boolean;
}

const LogoutButton = ({isDropdownOpen}: LogoutButtonProps) => {
    return (
        <>
            {isDropdownOpen ? (
                <div className={`${classes.dropdownMenu} ${classes.open}`}>
                    <Form action="/logout" method="post">
                        <Button>
                            Wyloguj się
                        </Button>
                    </Form>
                </div>
            ) : (
                <Form action="/logout" method="post" className={classes.mobile_only_form}>
                    <button>
                        Wyloguj się
                    </button>
                </Form>
            )}
        </>
    );
};

export default LogoutButton;