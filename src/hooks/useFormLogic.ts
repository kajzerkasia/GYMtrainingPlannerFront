import { useState } from 'react';
import { Status } from 'types';

type useFormLogicProps<T> = {
    initialValues: T;
    onSubmit: (values: T, reset: () => void) => void | Promise<void>;
    actionType?: Status;
};

export const useFormLogic = <T>({
                                    initialValues,
                                    onSubmit,
                                }: useFormLogicProps<T>) => {
    const [values, setValues] = useState<T>(initialValues);

    const reset: () => void = () => {
        setValues(initialValues);
    };

    const handleChange: (field: keyof T, value: string) => void = (field, value) => {
        setValues((localValues) => ({
            ...localValues,
            [field]: value,
        }));
    };

    const handleSubmit = () => {
        onSubmit(values, reset);
    };

    return { values, handleChange, handleSubmit, reset };
};

// Rozważyć uzycie tego hooka.