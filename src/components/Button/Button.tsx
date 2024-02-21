import React, {ReactNode} from 'react';
import classes from './Button.module.css';

interface ButtonProps {
    onClick: () => void;
    className: string;
    children: ReactNode;
}

const Button = ({onClick, className, children, ...props}:ButtonProps) => {
    return (
        <button onClick={onClick} className={className} {...props}>
            {children}
        </button>
    );
};

export default Button;