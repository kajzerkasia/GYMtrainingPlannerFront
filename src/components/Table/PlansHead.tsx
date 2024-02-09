import React from 'react';
import {Link} from "react-router-dom";
import {TbUserCircle} from "react-icons/tb";
import IconProvider from "../IconProvider/IconProvider";
import TableData from "./TableData/TableData";

const PlansHead = () => {
    return (
        <thead>
        <tr>
            <td align="center" colSpan={3}>
                <h1>Plany treningowe</h1>
            </td>
            <TableData>
                <IconProvider>
                    <Link to="/auth"><TbUserCircle/></Link>
                </IconProvider>
            </TableData>
        </tr>
        </thead>
    );
};

export default PlansHead;