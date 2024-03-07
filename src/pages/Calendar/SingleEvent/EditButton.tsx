import React from 'react';
import classes from "./EditButton.module.css";
import IconProvider from "../../../components/IconProvider/IconProvider";
import {TbEdit} from "react-icons/tb";
import Button from "../../../components/Button/Button";
import {Link, useParams} from "react-router-dom";

const EditButton = () => {
    const params = useParams();

    return (
        <Button className={classes.icon_button}>
            <Link to={`/calendar/${params.userId}/trainings/edit-training`}>
            <IconProvider>
                <TbEdit/>
            </IconProvider>
            </Link>
        </Button>
    );
};

export default EditButton;