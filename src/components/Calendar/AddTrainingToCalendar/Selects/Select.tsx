import React, {ChangeEvent, ReactNode} from 'react';

interface SelectProps {
    children: ReactNode;
    optionText: string;
    selectValue: string;
    onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
}

const Select = ({children, optionText, selectValue, onChange}: SelectProps) => {

    return (
        <select
            value={selectValue}
            onChange={onChange}
        >
            <option value="">{optionText}</option>
            {children}
        </select>
    );
};

export default Select;