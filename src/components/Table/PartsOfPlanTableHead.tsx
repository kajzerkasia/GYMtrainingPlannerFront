import React from 'react';
import {TbDotsVertical} from "react-icons/tb";
import {useParams} from "react-router-dom";
import IconProvider from "../IconProvider/IconProvider";
import TableButtonContainer, {VariantOption} from "./TableButton/TableButtonContainer";
import TableHead from "./TableHead/TableHead";

const PartsOfPlanTableHead = () => {
    const params = useParams();

    return (
        <TableHead>
            <tr>
                <td colSpan={3}>
                    <h1>Nazwa planu</h1>
                </td>
                <TableButtonContainer
                    elementVariant={VariantOption.link}
                    to={`/details/${params.slug}`}
                >
                    <IconProvider>
                        <TbDotsVertical/>
                    </IconProvider>
                </TableButtonContainer>
            </tr>
        </TableHead>
    );
};

export default PartsOfPlanTableHead;