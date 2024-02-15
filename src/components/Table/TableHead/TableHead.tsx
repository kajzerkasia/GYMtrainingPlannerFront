import React, {ReactNode} from 'react';
import classes from './TableHead.module.css';

interface TableHeadProps {
    children: ReactNode;
}

const TableHead = ({children}: TableHeadProps) => {
    return (
        <thead className={classes.table_head}>
        {children}
        </thead>
    );
};

export default TableHead;