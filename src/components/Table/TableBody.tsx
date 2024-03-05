import TableElements from "./TableElements";
import AddTableElements from "./AddTableElements";
import React from "react";
import RedirectLink from "../RedirectLink";
import {useSelector} from "react-redux";
import {RootState} from "../../store";
import classes from "./TableBody.module.css";
import ArrowContainer from "../ArrowContainer/ArrowContainer";

export interface LinkProps {
    icon: React.ComponentType<any>;
    path: string;
}

interface TableProps<T> {
    links?: LinkProps[];
    onSubmit?: (values: T, reset: () => void) => void | Promise<void>;
    onUpdate: (values: T, reset: () => void) => void | Promise<void>;
    onDelete?: () => void;
    availableFields: (keyof T)[];
}

export const TableBody = <T extends Record<string, string>>({links, onSubmit, onUpdate, onDelete, availableFields}: TableProps<T>) => {

    const {itemsList} = useSelector((state: RootState) => state.items);

    const renderLink = (link: LinkProps) => (
        link && link.icon ? (
            <RedirectLink
                icon={React.createElement(link.icon)}
                path={link.path}
            />
        ) : null
    );

    return (
        <tbody>
        {!availableFields.every(field => ['length', 'frequency', 'schedule'].includes(field as string)) && (
            <AddTableElements
                handleSubmit={(values, reset) => onSubmit && onSubmit(values as T, reset)}
                availableFields={availableFields as string[]}
                links={links}
            >
                {links && renderLink(links[0])}
            </AddTableElements>
        )}
        {itemsList.length > 0 ? (
            <TableElements
                handleUpdate={(values, reset) => onUpdate(values as T, reset)}
                handleDelete={onDelete ? onDelete : () => {
                }}
                availableFields={availableFields as string[]}
            />
        ) : (
            <tr>
                <td colSpan={availableFields.length + 3} className={classes.td_empty}>
                    <ArrowContainer
                        text="Trochę tutaj pusto... Może chcesz coś dodać?"
                    />
                </td>
            </tr>
        )}
        </tbody>
    )
}

