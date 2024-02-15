import React, {ReactNode} from 'react';
import classes from './FlexContainer.module.css';

interface FlexContainer {
    children: ReactNode;
}

const FlexContainer = ({children}: FlexContainer) => {
    return (
        <div className={classes.flex_container}>
            {children}
        </div>
    );
};

export default FlexContainer;