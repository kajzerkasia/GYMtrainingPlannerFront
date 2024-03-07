import React from 'react';
import classes from "./DeleteButton.module.css";
import IconProvider from "../../../components/IconProvider/IconProvider";
import {TbX} from "react-icons/tb";
import Button from "../../../components/Button/Button";

const DeleteButton = () => {
    return (
        <Button className={classes.icon_button}>
            <IconProvider>
                <TbX/>
            </IconProvider>
        </Button>
    );
};

export default DeleteButton;