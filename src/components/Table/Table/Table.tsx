import React from 'react';
import classes from './Table.module.css';

interface TableProps {
    children: React.ReactNode;
}

const Table = ({children}: TableProps) => {
    return (
        <table className={classes.table}>
            {children}
        </table>
    );
};

export default Table;