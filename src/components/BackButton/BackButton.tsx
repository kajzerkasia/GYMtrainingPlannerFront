import React from 'react';
import './BackButton.css';

const BackButton = () => {
    return (
        <button className="btn-back" onClick={() => window.history.back()}>
            Powrót
        </button>
    );
};

export default BackButton;