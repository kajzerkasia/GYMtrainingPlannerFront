import React from 'react';
import classes from './BackButton.module.css';

const BackButton = () => {
    return (
        <button className={classes.btn_back} onClick={() => window.history.back()}>
            Powrót
        </button>
    );
};

export default BackButton;