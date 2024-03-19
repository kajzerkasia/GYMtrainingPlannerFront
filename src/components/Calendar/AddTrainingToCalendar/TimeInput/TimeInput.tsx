import React from 'react';

interface InputProps {
    id: string;
    inputValue: string;
    onChange: () => void;
}

const TimeInput = ({id, inputValue, onChange}: InputProps) => {
    return (
        <input
            id={id}
            type="time"
            value={inputValue}
            onChange={onChange}
        />
    );
};

export {TimeInput};