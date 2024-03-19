import classes from './TimeInput.module.css';

interface InputProps {
    id: string;
    inputValue: string;
    onChange: () => void;
}

const TimeInput = ({id, inputValue, onChange}: InputProps) => {
    return (
        <input
            className={classes.input}
            id={id}
            type="time"
            value={inputValue}
            onChange={onChange}
        />
    );
};

export {TimeInput};