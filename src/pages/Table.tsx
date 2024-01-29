import './Table.css';
import {DemoSign} from "../components/DemoSign/DemoSign";
import TableElements from "../components/Table/TableElements";
import AddTableElements from "../components/Table/AddTableElements";
import TableHeader from "../components/Table/TableHeader";
import React from "react";
import RedirectLink from "../components/RedirectLink";

export interface LinkProps {
    icon: React.ComponentType<any>;
    path: string;
}

interface TableProps<T> {
    links?: LinkProps[];
    onSubmit: (values: T, reset: () => void) => void | Promise<void>;
    onUpdate: (values: T, reset: () => void) => void | Promise<void>;
    onDelete: () => void;
    firstLinkPath?: string;
    tableHeader?: React.ReactNode;
    availableFields: (keyof T)[];
}

export const Table = <T extends Record<string, string>>({ links, onSubmit, onUpdate, onDelete, firstLinkPath, tableHeader, availableFields}: TableProps<T>) => {

    const renderLink = (link: LinkProps) => (
        <RedirectLink
            icon={React.createElement(link.icon)}
            path={link.path}
        />
    );

    return (
        <div className="parts-wrapper">
            <div className="main-plan">
                <DemoSign/>
                <table className="main-table">
                    <thead>
                    <TableHeader>
                        {tableHeader}
                    </TableHeader>
                    </thead>
                    <tbody>
                    <AddTableElements
                        handleSubmit={(values, reset) => onSubmit(values as T, reset)}
                        availableFields={availableFields as string[]}
                    >
                        {links && renderLink(links[1])}
                    </AddTableElements>
                    <TableElements
                        handleUpdate={(values, reset) => onUpdate(values as T, reset)}
                        handleDelete={onDelete}
                        firstLinkPath={firstLinkPath}
                        availableFields={availableFields as string[]}
                    >
                    </TableElements>
                    </tbody>
                </table>
                <button className="btn-back-exercises" onClick={() => window.history.back()}>
                    Powrót
                </button>
            </div>
        </div>
    )
}

