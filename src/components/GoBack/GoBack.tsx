import React from "react";
import './GoBack.css';
import {Link} from "react-router-dom";

interface Props {
    text: string;
    to?: string;
}

export const GoBack = (props: Props) => (

    props.to
        ? <Link className="go-back" to={props.to}>{props.text}</Link>
        : <h1>{props.text}</h1>
);