import React from 'react';
import classes from './ArrowContainer.module.css';

interface ArrowContainerProps {
    text: string;
}
const ArrowContainer = ({text}: ArrowContainerProps) => {
    return (
        <div className={classes.arrow_container}>
            <div className={classes.arrow}></div>
            <p>{text}</p>
        </div>
    );
};

export default ArrowContainer;