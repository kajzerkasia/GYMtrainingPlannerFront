import React from 'react';
import classes from './BackButton.module.css';
import Button from "../Button/Button";

const BackButton = () => {
    return (
        <Button className={classes.btn_back} onClick={() => window.history.back()}>
            Powrót
        </Button>
    );
};

export default BackButton;