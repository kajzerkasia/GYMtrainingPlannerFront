import React from 'react';
import classes from './TableData.module.css';

interface TableDataProps {
    children: React.ReactNode;
}
const TableData = ({children}: TableDataProps) => {
    return (
        <td className={classes.td}>
            {children}
        </td>
    );
};

export default TableData;