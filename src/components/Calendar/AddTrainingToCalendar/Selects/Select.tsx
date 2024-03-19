import React, {ChangeEvent, ReactNode} from 'react';

interface SelectProps {
    children: ReactNode;
    optionText: string;
    selectValue: string;
    onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
    className: string;
}

const Select = ({children, optionText, selectValue, onChange, className}: SelectProps) => {

    return (
        <select
            className={className}
            value={selectValue}
            onChange={onChange}
        >
            <option value="">{optionText}</option>
            {children}
        </select>
    );
};

export default Select;