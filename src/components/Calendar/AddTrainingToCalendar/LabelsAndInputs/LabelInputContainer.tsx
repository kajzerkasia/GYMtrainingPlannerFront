import React from 'react';
import Label from "../Label/Label";
import {TimeInput} from "../TimeInput/TimeInput";
import classes from './LabelInputContainer.module.css';

interface LabelInputContainerProps {
    labelHtmlFor: string;
    labelText: string;
    inputValue: string;
    onChange: any;
    inputId: string;
}

const LabelInputContainer = ({labelHtmlFor, labelText, inputValue, onChange, inputId}: LabelInputContainerProps) => {
    return (
        <div className={classes.label_and_input_container}>
            <Label
                labelHtmlFor={labelHtmlFor}
            >
                {labelText}
            </Label>
            <TimeInput
                id={inputId}
                inputValue={inputValue}
                onChange={onChange}
            />
        </div>
    );
};

export {LabelInputContainer};