import React, {useEffect} from 'react';
import {Table} from "./Table";
import {useParams} from "react-router-dom";
import {TbBarbell, TbDotsVertical, TbStairsUp} from "react-icons/tb";
import {useDispatch} from "react-redux";
import {fetchPartsOfPlanData} from "../store/actions/parts-of-plan/fetching/fetching-action";

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

    return (
        <Table links={PARTS_OF_PLAN_LINKS}/>
    );
};

export default PartsOfPlan;