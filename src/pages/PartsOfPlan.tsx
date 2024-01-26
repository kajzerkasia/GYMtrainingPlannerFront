import React, {useEffect} from 'react';
import {Table} from "./Table";
import {useParams} from "react-router-dom";
import {TbBarbell, TbDotsVertical, TbStairsUp} from "react-icons/tb";
import {useDispatch} from "react-redux";
import {fetchPartsOfPlanData} from "../store/actions/parts-of-plan/fetching/fetching-action";
import UsePartsOfPlanActions from "../hooks/usePartsOfPlanActions";

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
        {
            icon: TbBarbell,
            path: `/exercises/`,
        },
    ]

    const {handleSubmit, handleUpdate, handleDelete} = UsePartsOfPlanActions();

    return (
        <Table
            links={PARTS_OF_PLAN_LINKS}
            onSubmit={async (values, reset) => handleSubmit(values, reset)}
            onUpdate={async (values, reset) => handleUpdate(values, reset)}
            onDelete={handleDelete}
        />
    );
};

export default PartsOfPlan;