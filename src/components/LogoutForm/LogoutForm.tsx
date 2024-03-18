import React from 'react';
import {Form} from "react-router-dom";
import Button from "../Button/Button";

interface LogoutFormProps {
    onClick: () => void;
    className?: string;
}

const LogoutForm = ({onClick, className}: LogoutFormProps) => {

    const handleClick = () => {
        onClick();
    };

    return (
        <Form
            action="/logout"
            method="post"
            onSubmit={handleClick}
            className={className}
        >
            <Button>
                Wyloguj się
            </Button>
        </Form>
    );
};

export default LogoutForm;