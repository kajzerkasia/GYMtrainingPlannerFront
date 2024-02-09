import React from 'react';
import {Link} from "react-router-dom";
import {TbUserCircle} from "react-icons/tb";
import IconProvider from "../IconProvider/IconProvider";

const PlansHead = () => {
    return (
        <thead>
        <tr>
            <td align="center" colSpan={3}>
                <h1>Plany treningowe</h1>
            </td>
            <td>
                <IconProvider>
                    <Link to="/auth"><TbUserCircle/></Link>
                </IconProvider>
            </td>
        </tr>
        </thead>
    );
};

export default PlansHead;