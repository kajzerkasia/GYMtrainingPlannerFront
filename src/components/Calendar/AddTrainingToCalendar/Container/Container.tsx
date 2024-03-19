import React, {ReactNode} from 'react';
import classes from './Container.module.css';

interface Container {
    children: ReactNode;
}

const Container = ({children}: Container) => {
    return (
        <div className={classes.div_container}>
            {children}
        </div>
    );
};

export {Container};