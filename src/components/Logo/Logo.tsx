import React from "react";
import './Logo.css';
import {Link} from "react-router-dom";

interface Props {
    text: string;
    to?: string;
}

export const Logo = (props: Props) => (

    props.to
        ? <Link className="logo" to={props.to}>{props.text}</Link>
        : <h1>{props.text}</h1>
);