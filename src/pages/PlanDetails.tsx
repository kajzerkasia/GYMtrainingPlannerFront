import React, {useEffect} from 'react';
import {fetchPlanDetails} from "../store/actions/plan-details/fetching-action";
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {DemoSign} from "../components/DemoSign/DemoSign";
import {TableBody} from "../components/Table/TableBody";
import BackButton from "../components/BackButton/BackButton";
import UsePlanDetailsActions from "../hooks/actionHooks/usePlanDetailsActions";
import {RootState} from "../store";
import {DetailEntity} from 'types';
import PlanDetailsTableHead from "../components/Table/PlanDetailsTableHead";

const PlanDetails = () => {

    const params = useParams();
    const dispatch = useDispatch();

    const {itemsList} = useSelector((state: RootState) => state.items);

    useEffect(() => {
        dispatch(fetchPlanDetails(params.slug) as any);
    }, [dispatch, params.slug]);

    const {handleUpdate} = UsePlanDetailsActions();

    const availableFields = itemsList && itemsList.length > 0
        ? ['length', 'frequency', 'schedule']
        : ['length', 'frequency', 'schedule'];

    return (
        <div className="parts-wrapper">
            <div className="main-plan">
                <DemoSign/>
                <table className="main-table">
                    <PlanDetailsTableHead/>
                    <TableBody
                        onUpdate={async (values, reset) => handleUpdate((values as unknown as DetailEntity), reset)}
                        availableFields={availableFields}
                    />
                </table>
                <BackButton/>
            </div>
        </div>
    )
};

export default PlanDetails;