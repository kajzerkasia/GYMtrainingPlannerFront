import React from 'react';
import RedirectLink from "../RedirectLink";
import {TbDotsVertical} from "react-icons/tb";
import {useParams} from "react-router-dom";
import IconProvider from "../IconProvider/IconProvider";
import TableData from "./TableData/TableData";
import TableHead from "../TableHead/TableHead";

const PartsOfPlanTableHead = () => {
    const params = useParams();

    return (
        <TableHead>
        <tr>
            <td colSpan={3}>
                <h1>Nazwa planu</h1>
            </td>
            <TableData>
                <IconProvider>
                    <RedirectLink
                        icon={React.createElement(TbDotsVertical)}
                        path={`/details/${params.slug}`}
                    />
                </IconProvider>
            </TableData>
        </tr>
        </TableHead>
    );
};

export default PartsOfPlanTableHead;