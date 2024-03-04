import React from 'react';
import classes from './TableButtonContainer.module.css';
import {Link} from "react-router-dom";
import TableButton from "./TableButton";

export enum VariantOption {
    button = 'BUTTON',
    link = 'LINK',
}

type Variant = VariantOption.button | VariantOption.link;

interface TableDataProps {
    children: React.ReactNode;
    elementVariant: Variant
    onClick?: () => void;
    to?: string;
}

const TableButtonContainer = ({children, onClick, to, elementVariant}: TableDataProps) => {
    return (
        <td className={classes.table_data}>
            {elementVariant === 'BUTTON' && onClick && (
                <TableButton
                    onClick={onClick}
                >
                    {children}
                </TableButton>
            )}
            {elementVariant === 'LINK' && to && (
                <Link
                    to={to}
                >
                    <TableButton>
                        {children}
                    </TableButton>
                </Link>
            )}
        </td>
    );
};

export default TableButtonContainer;