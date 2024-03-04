import React from 'react';
import {TbUserCircle} from "react-icons/tb";
import IconProvider from "../IconProvider/IconProvider";
import TableButtonContainer, {VariantOption} from "./TableButton/TableButtonContainer";
import TableHead from "./TableHead/TableHead";

const PlansHead = () => {
    return (
        <TableHead>
            <tr>
                <td align="center" colSpan={3}>
                    <h1>Plany treningowe</h1>
                </td>
                <TableButtonContainer
                    elementVariant={VariantOption.link}
                    to="/auth"
                >
                    <IconProvider>
                        <TbUserCircle/>
                    </IconProvider>
                </TableButtonContainer>
            </tr>
        </TableHead>
    );
};

export default PlansHead;