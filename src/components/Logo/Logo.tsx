import React from 'react';
import classes from './Logo.module.css';

import logoImg from '../../images/logo_img.png';

const Logo = () => {
    return (
        <div className={classes.logo}>
            <img src={logoImg} alt=""/>
            <h1>Gym Training Planner</h1>
        </div>
    );
};

export default Logo;