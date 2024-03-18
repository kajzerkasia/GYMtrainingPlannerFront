import classes from "./AddTrainingToCalendar.module.css";

interface LabelProps {
    labelHtmlFor: string;
    children: string;
}

const Label = ({labelHtmlFor, children}: LabelProps) => {
    return (
        <label
            className={classes.label_date}
            htmlFor={labelHtmlFor}>
            {children}
        </label>
    );
};

export default Label;