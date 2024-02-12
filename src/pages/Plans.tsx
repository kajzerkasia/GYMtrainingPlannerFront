import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {fetchPlansData} from "../store/actions/plans-list/fetching-action";
import {RootState} from "../store";
import {DemoSign} from "../components/DemoSign/DemoSign";
import PlansHead from "../components/Table/PlansHead";
import {TableBody} from "../components/Table/TableBody";
import {TbCalendarPlus} from "react-icons/tb";
import UsePlansActions from "../hooks/actionHooks/usePlansActions";
import {getAuthToken} from "../helpers/auth";
import {useParams} from "react-router-dom";
import Table from "../components/Table/Table/Table";
import {PlanEntity} from "../constants/types";

const Plans = () => {
    const dispatch = useDispatch();
    const params = useParams();

    useEffect(() => {
        if (params.userId) {
            dispatch(fetchPlansData(params) as any);
        }
    }, [dispatch, params]);

    const {itemsList} = useSelector((state: RootState) => state.items);

    const token = getAuthToken();

    const PLANS_LINKS = [
        {
            icon: TbCalendarPlus,
            path: `${!token ? `/auth?mode=login` : `/calendar/${params.userId}`}`

        }
    ]

    const {handleSubmit, handleUpdate, handleDelete} = UsePlansActions();

    const availableFields = itemsList && itemsList.length > 0
        ? ['name']
        : ['name'];

    return (
        <>
            {token && (
                <>
                    <DemoSign/>
                    <Table>
                        <PlansHead/>
                        <TableBody
                            links={PLANS_LINKS}
                            onSubmit={async (values, reset) => handleSubmit((values as unknown as PlanEntity), reset)}
                            onUpdate={async (values) => handleUpdate((values as unknown as PlanEntity))}
                            onDelete={handleDelete}
                            availableFields={availableFields}
                        />
                    </Table>
                </>
            )}
        </>
    );
};

export default Plans;