import React, {useEffect, useState} from 'react';
import {Table} from "./Table";
import {useParams} from "react-router-dom";
import {TbDotsVertical, TbStairsUp} from "react-icons/tb";
import {useDispatch, useSelector} from "react-redux";
import {fetchPartsOfPlanData} from "../store/actions/parts-of-plan/fetching/fetching-action";
import UsePartsOfPlanActions from "../hooks/usePartsOfPlanActions";
import {PartOfPlanEntity} from 'types';
import {IconContext} from "react-icons";
import RedirectLink from "../components/RedirectLink";
import {RootState} from "../store";

const PartsOfPlan = () => {

    const params = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        if (params.slug) {
            dispatch(fetchPartsOfPlanData(params) as any);
        }
    }, [dispatch, params]);

    const PARTS_OF_PLAN_LINKS = [
        {
            icon: TbDotsVertical,
            path: `/details/${params.slug}`,
        },
        {
            icon: TbStairsUp,
            path: `/rules/${params.slug}`,
        },
    ]

    const firstLinkPart = 'exercises';

    const {handleSubmit, handleUpdate, handleDelete} = UsePartsOfPlanActions();

    const tableHeader = (
        <tr className="tr-add">
            <td colSpan={3} className="training-plan">
                <h1 className="h1-plan">Nazwa planu/części planu-TODO</h1>
            </td>
            <td className="dots" colSpan={1}>
                <IconContext.Provider value={{className: 'react-icons-dots'}}>
                    <RedirectLink
                        icon={React.createElement(TbDotsVertical)}
                        path={`/rules/${params.slug}`}
                    />
                </IconContext.Provider>
            </td>
        </tr>
    )

    const initialValues = {
        name: ''
    }
    const [values, setValues] = useState<PartOfPlanEntity>(() => initialValues);

    const handleChange: (field: keyof PartOfPlanEntity, value: string) => void = (field, value) => {
        setValues(localValues => ({
            ...localValues,
            [field]: value
        }));
    };

    const {isEdited} = useSelector((state: RootState) => state.items);

    const inputs = (
        <td className="input-part-add">
            <input
                placeholder="Podaj nazwę części planu, którą chcesz dodać"
                className={isEdited ? 'edited-input' : 'input-part'}
                type="text"
                name="name"
                required
                value={values.name}
                onChange={(event) => handleChange('name', event.target.value)}
            />
        </td>
    )

    return (
        <Table
            links={PARTS_OF_PLAN_LINKS}
            onSubmit={async (values, reset) => handleSubmit((values as PartOfPlanEntity), reset)}
            onUpdate={async (values, reset) => handleUpdate((values as PartOfPlanEntity), reset)}
            onDelete={handleDelete}
            firstLinkPath={firstLinkPart}
            tableHeader={tableHeader}
            initialValues={initialValues}
            inputs={inputs}
            values={values}
        />
    );
};

export default PartsOfPlan;