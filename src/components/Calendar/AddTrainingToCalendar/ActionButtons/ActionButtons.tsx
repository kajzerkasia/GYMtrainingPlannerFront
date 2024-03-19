import React from 'react';
import classes from "./ActionButtons.module.css";
import BackButton from "../../../BackButton/BackButton";
import {AddButton} from "../AddButton";

const ActionButtons = () => {
    return (
        <div className={classes.actions}>
            <BackButton/>
            <AddButton/>
        </div>
    );
};

export {ActionButtons};