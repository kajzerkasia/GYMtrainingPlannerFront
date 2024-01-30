import React from 'react';

const BackButton = () => {
    return (
        <button className="btn-back" onClick={() => window.history.back()}>
            Powrót
        </button>
    );
};

export default BackButton;