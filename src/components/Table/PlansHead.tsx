import React from 'react';
import {Link} from "react-router-dom";
import {TbUserCircle} from "react-icons/tb";
import IconProvider from "../IconProvider/IconProvider";
import TableData from "./TableData/TableData";
import TableHead from "../TableHead/TableHead";

const PlansHead = () => {
    return (
        <TableHead>
            <tr>
                <td align="center" colSpan={3}>
                    <h1>Plany treningowe</h1>
                </td>
                <TableData>
                    <Link to="/auth">
                        <IconProvider>
                            <TbUserCircle/>
                        </IconProvider>
                    </Link>
                </TableData>
            </tr>
        </TableHead>
    );
};

export default PlansHead;