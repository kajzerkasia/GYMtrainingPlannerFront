import React from 'react';
import classes from "./TableButton.module.css";

interface TableButtonProps {
    onClick?: () => void;
    children: React.ReactNode;
}

const TableButton = ({onClick, children}: TableButtonProps) => {
    return (
        <button
            className={classes.table_button}
            onClick={onClick}
        >
            {children}
        </button>
    );
};

export default TableButton;