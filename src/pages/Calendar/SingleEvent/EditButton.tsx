import React from 'react';
import classes from "./EditButton.module.css";
import IconProvider from "../../../components/IconProvider/IconProvider";
import {TbEdit} from "react-icons/tb";
import Button from "../../../components/Button/Button";

const EditButton = () => {
    return (
        <Button className={classes.icon_button}>
            <IconProvider>
                <TbEdit/>
            </IconProvider>
        </Button>
    );
};

export default EditButton;