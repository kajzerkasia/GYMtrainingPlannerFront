import React, {useEffect} from 'react';
import {TableBody} from "../components/Table/TableBody";
import {useParams} from "react-router-dom";
import {TbStairsUp} from "react-icons/tb";
import {useDispatch, useSelector} from "react-redux";
import {fetchPartsOfPlanData} from "../store/actions/parts-of-plan/fetching-action";
import UsePartsOfPlanActions from "../hooks/actionHooks/usePartsOfPlanActions";
import {RootState} from "../store";
import {DemoSign} from "../components/DemoSign/DemoSign";
import BackButton from "../components/BackButton/BackButton";
import PartsOfPlanTableHead from "../components/Table/PartsOfPlanTableHead";
import Table from "../components/Table/Table/Table";
import {PartOfPlanEntity} from "../constants/types";

const PartsOfPlan = () => {

    const params = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        if (params.slug) {
            dispatch(fetchPartsOfPlanData(params) as any);
        }
    }, [dispatch, params]);

    const {itemsList} = useSelector((state: RootState) => state.items);

    const PARTS_OF_PLAN_LINKS = [
        {
            icon: TbStairsUp,
            path: `/rules/${params.slug}`,
        }
    ]

    const {handleSubmit, handleUpdate, handleDelete} = UsePartsOfPlanActions();

    const availableFields = itemsList && itemsList.length > 0
        ? ['name']
        : ['name'];

    return (
        <>
            <DemoSign/>
            <Table>
                <PartsOfPlanTableHead/>
                <TableBody
                    links={PARTS_OF_PLAN_LINKS}
                    onSubmit={async (values, reset) => handleSubmit((values as unknown as PartOfPlanEntity), reset)}
                    onUpdate={async (values, reset) => handleUpdate((values as unknown as PartOfPlanEntity), reset)}
                    onDelete={handleDelete}
                    availableFields={availableFields}
                />
            </Table>
            <BackButton/>
        </>
    );
};

export default PartsOfPlan;