import classes from './FormField.module.css';
import IconProvider from "../../IconProvider/IconProvider";
import {Status} from 'types';
import {TbLink} from "react-icons/tb";

interface FormFieldProps<T> {
    field: keyof T;
    values: T;
    isEdited: boolean;
    handleChange: (field: keyof T, value: string) => void;
    urlError: string | null;
    actionType: Status;
}

export const FormField = <T extends Record<string, any>>({
                                                             field,
                                                             values,
                                                             isEdited,
                                                             handleChange,
                                                             urlError,
                                                             actionType
                                                         }: FormFieldProps<T>) => (
    <td
        key={field as string}
        className={`${classes.td}
        ${field === 'order' ? `${classes.narrower}` : ''}
        ${field === 'series' ? `${classes.narrower}` : ''}
        ${field === 'repetitions' ? `${classes.narrower}` : ''}
        ${field === 'pause' ? `${classes.narrower}` : ''}
      `}
    >
        {field === 'url' ? (
            <>
                <input
                    placeholder="Link do filmu instruktażowego"
                    className={isEdited ? `${classes.edited_input}` : `${classes.input}`}
                    type="url"
                    name={field as string}
                    required
                    value={values[field] || ''}
                    onChange={(event) => handleChange(field, event.target.value)}
                />
                <div>
                    <label htmlFor="url"></label>
                    <a href={values.url} target="_blank" rel="noopener noreferrer">
                        {actionType === Status.Add || !values.url ? '' : (
                            <IconProvider>
                                <TbLink/>
                            </IconProvider>
                        )}
                    </a>
                </div>
                {urlError && <div className={classes.error_message}>{urlError}</div>}
            </>
        ) : (
            <input
                placeholder="..."
                className={isEdited ? `${classes.edited_input}` : `${classes.input}`}
                type="text"
                name={field as string}
                required
                value={values[field] || ''}
                onChange={(event) => handleChange(field, event.target.value)}
            />
        )}
    </td>
);