import React from 'react';
import {Link} from "react-router-dom";
interface LinkProps {
    icon: any;
    path: string;
}

const RedirectLink = ({icon, path}: LinkProps) => {
    return (
        <Link to={path}>{icon}</Link>
    );
};

export default RedirectLink;